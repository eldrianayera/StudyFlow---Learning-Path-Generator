import type { Metadata } from "next";
import "./globals.css";
import ReactQueryClientProvider from "@/components/react-query-client-provider";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "StudyFlow",
  description: "your friendly study companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ReactQueryClientProvider>
        <html lang="en">
          <body>
            <Toaster />
            <Navbar />
            <main>{children}</main>
          </body>
        </html>
      </ReactQueryClientProvider>
    </ClerkProvider>
  );
}
