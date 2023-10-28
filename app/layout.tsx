import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Votes",
  description:
    "Students preferred online voting system. Register to be a voter, and casr your vote. Each decision, each opinion matter. Come let's build, strengthen and nature our future by making sound decisions. Your vote surely counts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider session={undefined}>
        <body className={inter.className}>
          <main className="">
            <Navbar />
            {children}
          </main>
        </body>
      </Provider>
    </html>
  );
}
