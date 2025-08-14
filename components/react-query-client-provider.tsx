"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

export default function ReactQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
