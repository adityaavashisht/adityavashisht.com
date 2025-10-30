import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aditya Vashisht",
  description: "I'm a Developer based in Toronto, ON.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="leading-10">
      <body
        className={`${inter.className} antialiased max-w-lg mx-auto px-6 flex flex-col gap-y-11 py-20 bg-background text-foreground`}
      >
        <main className="flex flex-col gap-y-9">
          {children} <Analytics mode={"production"} />
        </main>
        <Footer />
      </body>
    </html>
  );
}
