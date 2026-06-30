import type { Metadata } from "next";
import { Messenger } from "@/components/Messenger";

export const metadata: Metadata = {
  title: "Private Messages",
  description: "Careful, parent-to-parent private messaging with safety reminders built in.",
};

export default function MessagesPage() {
  return (
    <div className="section py-8 lg:py-12">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-harbor-900">Private Messages</h1>
        <p className="mt-2 max-w-2xl text-mist-700">
          One-to-one conversations between registered parents. Go gently — block,
          mute, and report are always one tap away.
        </p>
      </header>
      <Messenger />
    </div>
  );
}
