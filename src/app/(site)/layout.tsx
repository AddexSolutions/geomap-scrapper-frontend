"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";

export default function SiteLayout({ children }: { children: React.ReactNode }) {

  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  );
}
