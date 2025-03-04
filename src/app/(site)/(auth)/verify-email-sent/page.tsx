import VerifyEmailSent from "@/components/Auth/VerifyEmailSent";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verification Email Sent | GMaps-Scraper",
};

interface VerifyEmailSentPageProps {
  searchParams?: Record<string, string | string[]>;
}

function VerifyEmailSentPage({ searchParams }: VerifyEmailSentPageProps) {
  const email = searchParams?.email ? decodeURIComponent(String(searchParams.email)) : "No email provided";

  return (
    <>
      <Breadcrumb pageName="Verification Email Sent" />

      <VerifyEmailSent email={email} />
    </>
  );
}

export default VerifyEmailSentPage;
