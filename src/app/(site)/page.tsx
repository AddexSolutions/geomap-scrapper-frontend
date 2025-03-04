import CallToAction from "@/components/CallToAction";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GMaps Scraper - Affordable Google Maps Data Extraction",
  description: "GMaps Scraper helps you extract business data from Google Maps at the most affordable rates. Get leads, contact details, and location insights effortlessly.",
};

export default function Home() {

  return (
    <main>
      <ScrollUp />
      <Hero />
      <Features />
      <CallToAction />
      <Faq />
      <Contact />
    </main>
  );
}
