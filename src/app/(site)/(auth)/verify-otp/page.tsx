import VerifyOTP from "@/components/Auth/VerifyOTP";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Verify OTP | GMaps-Scraper",
};

const SigninPage = () => {
  return (
    <>
      <Breadcrumb pageName="Verify-OTP Page" />

      <VerifyOTP />
    </>
  );
};

export default SigninPage;
