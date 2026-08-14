import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { courses } from '@/data/courses';

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1200;

function isRetryableGeminiError(err: any): boolean {
  const status = err?.status || err?.code;
  const message = String(err?.message || '').toLowerCase();
  return status === 429 || status === 503 || status === 500 || message.includes('unavailable') || message.includes('rate limit') || message.includes('resource exhausted');
}

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  let lastError: any;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      if (attempt < MAX_RETRIES && isRetryableGeminiError(err)) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
  throw lastError!;
}

function buildAssessmentReport(message: string, subject?: string | null): string {
  const trimmed = message.trim();
  const looksAssessment = /^\d+\s*-\s*[A-Za-z]/.test(trimmed) || /assessment/i.test(trimmed);
  if (!looksAssessment) return '';

  const coursesInfo = courses
    .map(
      (c) =>
        `- ${c.name} (${c.category}, ${c.duration}, ৳${c.fees.toLocaleString('en-BD')}):\n  Description: ${c.description}\n  Highlight: ${c.highlight}\n  Batch Timings: ${c.batchTimings.join(', ')}\n  Syllabus:\n${c.syllabus?.map((s) => `    • ${s}`).join('\n') || '    Not specified'}`
    )
    .join('\n\n');

  return `You are a career advisor and assessment analyst for Skill Gap Analysis, a premier coaching institute at Daffodil Smart City (DSC), Birulia, Savar, Dhaka-1216.

A student has submitted their skill assessment answers${subject ? ` for ${subject}` : ''}:
${message}

Generate a complete Skill Gap Assessment Report with exactly these sections in Markdown:
# Skill Gap Assessment Report

## Overall Skill Summary
Brief summary of their current readiness and profile.

## Web Development Assessment
Assess based on the provided answers and mention practical strengths or gaps.

## Cybersecurity Assessment
Assess based on the provided answers and mention practical strengths or gaps.

## DSA Assessment
Assess based on the provided answers and mention practical strengths or gaps.

## Strengths
Bullet list of clear strengths.

## Skill Gaps
Bullet list of gaps that need improvement.

## Recommended Learning Areas
Bullet list of prioritized learning areas with reasons.

## Practical Learning Roadmap
A short numbered roadmap with realistic next steps and milestones.

Be specific, encouraging, and practical. Use **bold** labels and bullet lists. Keep it scannable.`;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history, subject } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const coursesInfo = courses
      .map(
        (c) =>
          `- ${c.name} (${c.category}, ${c.duration}, ৳${c.fees.toLocaleString('en-BD')}):\n  Description: ${c.description}\n  Highlight: ${c.highlight}\n  Batch Timings: ${c.batchTimings.join(', ')}\n  Syllabus:\n${c.syllabus?.map((s) => `    • ${s}`).join('\n') || '    Not specified'}`
      )
      .join('\n\n');

    const isAssessmentStart = /start\s+assessment|generate\s+questions/i.test(message);
    const looksAssessmentAnswers = /^\d+\s*-\s*[A-Za-z]/.test(message.trim());

    const systemPrompt = isAssessmentStart
      ? `You are a career advisor and assessment analyst for Skill Gap Analysis, a premier coaching institute at Daffodil Smart City (DSC), Birulia, Savar, Dhaka-1216.

A student has selected the subject: ${subject || 'General'}

Generate 5-6 practical skill assessment questions for this subject. Number them clearly (1, 2, 3, 4, 5, 6) and provide multiple-choice options labeled A, B, C, D for each question.

Format the output in Markdown. Keep questions practical and relevant to real-world skills in this subject. Do not include the answer key or explanations yet.`
      : looksAssessmentAnswers
        ? buildAssessmentReport(message, subject)
        : `You are a helpful assistant for Skill Gap Analysis, a premier coaching institute at Daffodil Smart City (DSC), Birulia, Savar, Dhaka-1216. You help students with questions about courses, demo classes, admissions, fees, batch timings, and general inquiries.

Here is the complete syllabus information for every course. When a student asks about syllabus, provide the full syllabus for that specific course:

${coursesInfo}

IMPORTANT FORMATTING RULES:
- Use Markdown formatting in all your responses.
- For course-related questions, structure your response like this:

# Course Name

Short introduction.

## Course Information

* **Duration:** ...
* **Fee:** ...
* **Batch Timing:** ...

## Highlights

* ...
* ...

## Syllabus

### Topic 1

* ...
* ...

### Topic 2

* ...
* ...

- Use **bold** for labels and important terms.
- Use bullet lists (- item) for lists.
- Use numbered lists (1. item) when order matters.
- Use headings (#, ##, ###) to organize sections.
- Keep paragraphs short and scannable.
- For simple questions, keep the response natural and concise without forcing a structure.

Be friendly, concise, and professional. If you don't know something specific, suggest contacting the institute directly at their office or via the contact form.`;

    let replyText: string = '';

    const generate = async () => {
      if (history && Array.isArray(history) && history.length > 0) {
        const chat = ai.chats.create({
          model: 'gemini-3.6-flash',
          history: [
            {
              role: 'user',
              parts: [{ text: systemPrompt }],
            },
            {
              role: 'model',
              parts: [{ text: 'I understand. I will act as a helpful assistant for Skill Gap Analysis coaching institute.' }],
            },
            ...history.map((h: any) => ({
              role: h.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: h.content }],
            })),
          ],
        });

        const result = await chat.sendMessage({ message: [{ text: message }] });
        replyText = result.text || 'Sorry, I could not generate a response.';
      } else {
        const result = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: `${systemPrompt}\n\nStudent: ${message}`,
        });
        replyText = result.text || 'Sorry, I could not generate a response.';
      }
    };

    await withRetry(generate);

    return NextResponse.json({ reply: replyText });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    return NextResponse.json({ error: 'Failed to process chat message.' }, { status: 500 });
  }
}
