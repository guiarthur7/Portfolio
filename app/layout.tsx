import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Arqovel — licence démo, usage personnel uniquement
const arqovel = localFont({
  src: "./fonts/arqovel-regular.otf",
  variable: "--font-arqovel",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arthur Guillaume",
  description: "Portfolio d'Arthur Guillaume.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${arqovel.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
