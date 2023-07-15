import "./globals.css";
import type { Metadata } from "next";
import { Rubik, Nunito } from "next/font/google";
import Providers from './providers'

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Oracular Games",
  description: "The official Oracular Games website!"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${nunito.variable}`}><Providers>{children}</Providers></body>
    </html>
  );
}
