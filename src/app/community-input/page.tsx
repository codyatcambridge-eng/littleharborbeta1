import type { Metadata } from "next";
import { CommunityInputForm } from "@/components/CommunityInputForm";
import { Icon } from "@/components/Icon";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Share Community Input",
  description:
    "Tell Little Harbor what this parent support community should include as it grows.",
};

export default function CommunityInputPage() {
  return (
    <div className="section py-10 lg:py-14">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="pill">
            <Icon name="mail" size={14} /> Parent input
          </span>
          <h1 className="mt-4 text-3xl font-bold text-harbor-900 sm:text-4xl">
            Help shape what Little Harbor becomes.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-mist-700">
            Little Harbor&apos;s goal is to connect parents with similar peers
            undergoing the same journey, provide support, and offer safe,
            parent-guided ways for children to live a normal life and have
            friends they can connect with safely.
          </p>
          <p className="mt-4 leading-relaxed text-mist-700">
            Use this form to share what you believe this community should have:
            support groups, safety features, resources, local connection ideas,
            accessibility needs, or anything else that would help families feel
            less alone.
          </p>
        </div>

        <ImagePlaceholder
          src="/images/community-feedback.png"
          tone="sky"
          alt="A parent writing ideas in a notebook beside a laptop at a calm kitchen table."
        />
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <CommunityInputForm />
      </div>
    </div>
  );
}
