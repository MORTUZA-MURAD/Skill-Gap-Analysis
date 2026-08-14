import ChatWidget from '@/components/ChatWidget';

export const metadata = {
  title: 'Skill Gap Analysis Chat',
  description: 'Chat with our assistant to analyze your skill gaps and get a personalized learning roadmap.',
};

export default function ChatPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-slate-50 py-10 px-4">
      <div className="w-full max-w-2xl">
        <ChatWidget autoOpen />
      </div>
    </div>
  );
}
