"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const initMSW = async () => {
      if (typeof window === "undefined") {
        // work on server
        const { server } = await import("../mock/server");
        server.listen();
      } else {
        // work on client
        const { worker } = await import("../mock/browser");
        worker.start();
      }
    };

    initMSW();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>{children}</JotaiProvider>
    </QueryClientProvider>
  );
}
