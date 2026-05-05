import { ChatInterface } from "@/components/chat-interface";
import { T } from "@/components/language-provider";
import { PageHeader } from "@/components/ui";

export default function ChatPage() {
  return (
    <div>
      <PageHeader
        eyebrow={<T k="chat.eyebrow" />}
        title={<T k="chat.title" />}
        description={<T k="chat.description" />}
      />
      <section className="app-container py-10">
        <ChatInterface />
      </section>
    </div>
  );
}
