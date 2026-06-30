import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="section flex flex-col items-center justify-center py-24 text-center">
      <LogoMark size={64} />
      <h1 className="mt-6 text-3xl font-bold text-harbor-900">This shore isn&apos;t on our map.</h1>
      <p className="mt-3 max-w-md text-mist-700">
        The page you&apos;re looking for drifted off. Let&apos;s get you back to calmer water.
      </p>
      <div className="mt-7 flex gap-3">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/community" className="btn-secondary">Go to the forum</Link>
      </div>
    </div>
  );
}
