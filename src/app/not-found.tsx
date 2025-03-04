import NotFound from "@/components/NotFound";
import { Metadata } from "next";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";

export const metadata: Metadata = {
  title: "Page Not Found | GMaps Scraper",
  description: "Oops! The page you're looking for doesn't exist. Return to the homepage and continue exploring."
};

const ErrorPage = () => {
  return (
    <>
      <NotFound />
    </>
  );
};

export default ErrorPage;
