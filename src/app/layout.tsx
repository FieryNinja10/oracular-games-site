import "./globals.css";
import type { Metadata } from "next";
import { Rubik, Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

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
      <body className={`${nunito.variable} ${rubik.variable}`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
