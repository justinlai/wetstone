import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Navbar } from "@/components/Navbar";
import "./globals.css";
import "./effects.css";

// Brand face (licensed TWK Lausanne files from the client).
const lausanne = localFont({
  variable: "--font-lausanne",
  display: "swap",
  src: [
    { path: "./fonts/TWKLausanne-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/TWKLausanne-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/TWKLausanne-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/TWKLausanne-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/TWKLausanne-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/TWKLausanne-800.woff2", weight: "800", style: "normal" },
  ],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Wetstone — The global offshore mining company",
    template: "%s — Wetstone",
  },
  description:
    "Secure, sustainable, and scalable technology to supply the next 100 years of minerals demand.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lausanne.variable} ${spaceMono.variable} antialiased`}>
      <body className="min-h-full bg-white">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
