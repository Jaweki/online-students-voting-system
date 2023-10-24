import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Votes",
  description:
    "Zetec's #1 students online voting system. Register to be a voter, and place your voice. Each decision, each opinion matter. Come let's build, strengthen and nature our future by making sound decisions. Your vote surely counts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " "}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
