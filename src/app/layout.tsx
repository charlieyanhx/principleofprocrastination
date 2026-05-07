import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Principle of Procrastination",
  description: "AI automation for industrial productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
