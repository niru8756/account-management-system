"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-semibold">
                Seller Management
              </Link>
              <nav className="flex gap-1">
                <Button
                  variant={isActive("/sellers") ? "secondary" : "ghost"}
                  asChild
                >
                  <Link href="/sellers">Sellers</Link>
                </Button>
                <Button
                  variant={isActive("/audit-logs") ? "secondary" : "ghost"}
                  asChild
                >
                  <Link href="/audit-logs">Audit Logs</Link>
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
