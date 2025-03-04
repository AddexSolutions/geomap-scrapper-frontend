import ResetPassword from "@/components/Auth/ResetPassword";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Reset Password | GMaps-Scraper",
};

const SigninPage = () => {
  return (
    <>
      <Breadcrumb pageName="Reset-Password Page" />

      <ResetPassword />
    </>
  );
};

export default SigninPage;
