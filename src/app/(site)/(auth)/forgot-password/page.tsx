import ForgotPassword from "@/components/Auth/ForgotPassword";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Forgot Password | GMaps-Scraper",
};

const SigninPage = () => {
  return (
    <>
      <Breadcrumb pageName="Forgot-Password Page" />

      <ForgotPassword />
    </>
  );
};

export default SigninPage;
