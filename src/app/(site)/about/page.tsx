import About from "@/components/About";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | GMaps Scraper",
  description: "GMaps Scraper - Affordable and efficient Google Maps data extraction.",
};

const AboutPage = () => {
  return (
    <main>
      <Breadcrumb pageName="About Us Page" />
      <About />
    </main>
  );
};

export default AboutPage;
