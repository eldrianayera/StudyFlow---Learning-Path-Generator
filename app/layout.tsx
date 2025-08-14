import type { Metadata } from "next";
import "./globals.css";
import ReactQueryClientProvider from "@/components/react-query-client-provider";

export const metadata: Metadata = {
  title: "LearnBuddy",
  description: "your friendly study companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          <main>{children}</main>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
