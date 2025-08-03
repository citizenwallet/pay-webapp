import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { Suspense } from "react";

import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import LanguageProvider from "@/components/providers/language-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Citizen Wallet",
  description:
    "Send and receive your community currency in your mobile browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen min-w-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Theme>
          <Suspense
            fallback={
              <div className="min-h-screen min-w-screen flex flex-col items-center"></div>
            }
          >
            <LanguageProvider>
              <div className="flex flex-col items-center">{children}</div>
            </LanguageProvider>
          </Suspense>
          <Toaster />
        </Theme>
      </body>
    </html>
  );
}
