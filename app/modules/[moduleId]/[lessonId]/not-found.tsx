import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Level Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The level you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link href="/modules" className="text-primary hover:underline">
          Return to Modules
        </Link>
      </div>
    </div>
  );
}
