"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function SiteLayout({ children }: { children: React.ReactNode }) {

  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <Header />
      <Toaster />
      <main>
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  );
}
