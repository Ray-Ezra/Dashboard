import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// IMPORTING COMPONENTS
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import ProgressBar from "@/components/ProgressBar"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} transition-all duration-500 ease-in-out bg-[#050012]`}
      >
        <Navbar />
        
        <main className={`min-h-[100vh]`}>
          <ProgressBar/>
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
