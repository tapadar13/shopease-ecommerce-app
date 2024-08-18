"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuthEffect } from "@/hooks/useAuthEffect";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  useAuthEffect();

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        {!isAuthPage && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!isAuthPage && <Footer />}
      </div>
    </QueryClientProvider>
  );
}
