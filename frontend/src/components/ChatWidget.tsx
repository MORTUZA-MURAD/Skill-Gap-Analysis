'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWidgetProps {
  autoOpen?: boolean;
}

const SUBJECTS = [
  'Software Engineering (SWE)',
  'Computer Science & Engineering (CSE)',
  'Electrical & Electronic Engineering (EEE)',
  'Food Engineering (NFE)',
  'Civil Engineering',
  'English',
];

export const ChatWidget: React.FC<ChatWidgetProps> = ({ autoOpen }) => {
  const [isOpen, setIsOpen] = useState(autoOpen || false);
  const [messages, setMessages] = useState<Message[]>(() =>
    autoOpen
      ? [
          {
            role: 'assistant',
            content: 'Welcome to the Skill Gap Analysis! 🎓\nCheck your current skills and discover where you can improve.\n\nFirst, choose your subject:',
          },
        ]
      : [
          {
            role: 'assistant',
            content: 'Hello! Welcome to Skill Gap Analysis. How can I help you today? I can answer questions about our courses, syllabus, demo classes, admissions, fees, and batch timings.',
          },
        ]
  );
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [flow, setFlow] = useState<'normal' | 'select-subject' | 'assess-ready'>(
    autoOpen ? 'select-subject' : 'normal'
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToAPI = async (userMessage: string, historyMessages: Message[]) => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        history: historyMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        subject: selectedSubject || undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to get response.');
    }

    setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
  };

  const sendMessage = async () => {
    const userMessage = input.trim();
    if (!userMessage || loading) return;

    setInput('');
    const updatedMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(updatedMessages);
    setFlow('normal');
    setLoading(true);

    try {
      await sendMessageToAPI(userMessage, updatedMessages);
    } catch (err: any) {
      console.error('Chat error:', err);
      const isAssessment = /^\d+\s*-\s*[A-Za-z]/.test(userMessage) || /assessment/i.test(userMessage);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: isAssessment
            ? "I'm sorry, I'm having trouble generating your assessment right now. Please try again in a moment. Your answers have been received, so you can retry without starting over."
            : "I'm sorry, I'm having a little trouble responding right now. Please try again in a moment. I'll be happy to help you with courses, fees, syllabi, or demo classes.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setFlow('assess-ready');
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: `Great choice! You selected ${subject}.\n\nNow let's assess your current skills and identify your skill gaps.\n\nAre you ready to begin?`,
      },
    ]);
  };

  const startAssessment = async () => {
    if (loading) return;
    setFlow('normal');
    const assessmentMessage = 'Start Skill Assessment';
    const updatedMessages: Message[] = [...messages, { role: 'user', content: assessmentMessage }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      await sendMessageToAPI(assessmentMessage, updatedMessages);
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm sorry, I'm having trouble generating your assessment right now. Please try again in a moment. Your answers have been received, so you can retry without starting over.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!autoOpen && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {(isOpen || autoOpen) && (
        <div className={`${autoOpen ? 'relative' : 'fixed bottom-6 right-6'} z-50 w-full max-w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden`}>
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm">Skill Gap Analysis Assistant</h3>
              <p className="text-[11px] text-slate-400">Ask about courses, syllabus, demo classes, fees...</p>
            </div>
            {!autoOpen && (
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                aria-label="Minimize chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-md'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md shadow-xs'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-slate prose-sm max-w-none chat-prose">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-3.5 py-2.5 rounded-2xl rounded-bl-md shadow-xs">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {flow === 'select-subject' && (
            <div className="px-4 pb-2 space-y-2 bg-slate-50">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Choose your subject</p>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSubjectSelect(s)}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {flow === 'assess-ready' && (
            <div className="px-4 pb-2 bg-slate-50">
              <button
                onClick={startAssessment}
                disabled={loading}
                className="w-full px-3 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-slate-900 text-xs font-bold rounded-xl transition-colors"
              >
                Start Skill Assessment
              </button>
            </div>
          )}

          <div className="p-3 border-t border-slate-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl flex items-center justify-center transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
