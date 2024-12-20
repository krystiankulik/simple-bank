import type { Metadata } from "next";
import "./globals.css";
import { Titillium_Web } from "next/font/google";
import { Landmark } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

const font = Titillium_Web({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Simple Bank",
  description: "Simple Bank for simple needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`flex flex-col h-full ${font.className}`}>
        <header className="bg-primary text-primary-content p-4">
          <Link className="flex justify-center items-center gap-2" href={"/"}>
            <Landmark />
            <h1 className="text-2xl font-bold text-primary-content">Simple Bank</h1>
          </Link>
        </header>
        <Toaster position={"bottom-center"} />
        <main className="flex-1 bg-base-100">{children}</main>
        <footer className="bg-neutral text-neutral-content py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 Simple Bank. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
