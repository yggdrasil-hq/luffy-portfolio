import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monkey D. Luffy — Portfolio",
  description:
    "In-universe character portfolio for Monkey D. Luffy, captain of the Straw Hat Pirates and future Pirate King.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}