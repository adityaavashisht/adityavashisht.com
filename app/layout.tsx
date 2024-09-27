import { Inter } from "next/font/google";
import type { Metadata } from "next";
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased max-w-lg mx-auto px-6 flex flex-col gap-y-11  py-20`}
      >
        <main className="flex flex-col gap-y-9">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
