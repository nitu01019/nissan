import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button variant="primary" leftIcon={<Home className="w-5 h-5" />}>
              Go Home
            </Button>
          </Link>
          <Link href="/cars">
            <Button variant="outline" leftIcon={<ArrowLeft className="w-5 h-5" />}>
              View Cars
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
