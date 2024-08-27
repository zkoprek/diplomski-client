import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";
import localFont from "next/font/local";

const anekDevanagari = localFont({
  src: [
    {
      path: "../../public/fonts/AnekDevanagari-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-AnekDevanagari",
});

export const metadata: Metadata = {
  title: "MAS SportsApp",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anekDevanagari.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
