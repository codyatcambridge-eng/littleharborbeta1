import type { Metadata } from "next";
import { ForumView } from "@/components/ForumView";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Parent Forum",
  description: "Honest, supportive conversations among parents — filter by topic and by state.",
};

export default function CommunityPage() {
  return (
    <div className="section py-8 lg:py-12">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-harbor-900">The Parent Forum</h1>
        <p className="mt-2 max-w-2xl text-mist-700">
          Conversations among parents who understand. Search, sort, and filter by
          topic or state — or just read for a while. Little Harbor exists to
          connect parents with similar peers, provide support, and build toward
          safe ways for children to have friends who understand their journey.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <ForumView />
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
