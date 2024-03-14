import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Truth Table Generator",
  description:
    "Truth Table Generator es un generador de tablas de verdad, ingresa las variables que desees y inserta las proposiciones que deseas evaluar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Toaster position="top-center" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
