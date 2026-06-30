import Link from "next/link";
import { Post } from "@/lib/types";
import { profileById } from "@/data/profiles";
import { categoryById } from "@/data/categories";
import { stateByCode } from "@/data/states";
import { timeAgo } from "@/lib/format";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";

/** A single forum post card — the core repeating unit of the community feed. */
export function PostCard({ post }: { post: Post }) {
  const author = profileById(post.authorId);
  const category = categoryById(post.categoryId);
  const state = stateByCode(post.stateCode);

  return (
    <article className="card group p-5 transition-shadow hover:shadow-soft">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {category && <span className="pill"><Icon name={category.icon as any} size={13} />{category.name}</span>}
        {state && (
          <Link href={`/community/${state.slug}`} className="pill hover:bg-harbor-100">
            <Icon name="map" size={13} /> {state.name}
          </Link>
        )}
      </div>

      <h3 className="text-lg font-semibold leading-snug text-harbor-900">
        <Link href="/community" className="hover:underline underline-offset-2">
          {post.title}
        </Link>
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-mist-700">{post.snippet}</p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Link
          href={author ? `/profile/${author.id}` : "#"}
          className="flex items-center gap-2 text-sm text-mist-700 hover:text-harbor-700"
        >
          {author && <Avatar name={author.displayName} size={28} />}
          <span className="font-medium">{author?.displayName ?? "A parent"}</span>
        </Link>

        <div className="flex items-center gap-3 text-xs text-mist-500">
          <span className="inline-flex items-center gap-1" title="Support reactions">
            <Icon name="heart" size={14} /> {post.supportCount}
          </span>
          <span className="inline-flex items-center gap-1" title="Replies">
            <Icon name="chat" size={14} /> {post.replyCount}
          </span>
          <span>{timeAgo(post.createdAt)}</span>
        </div>
      </div>
    </article>
  );
}
