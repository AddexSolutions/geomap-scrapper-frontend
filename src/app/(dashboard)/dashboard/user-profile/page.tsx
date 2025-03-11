import { Metadata } from "next";
import ProfileHeader from "@/components/Dashboard/UserProfile/ProfileHeader";
import PersonalInfo from "@/components/Dashboard/UserProfile/PersonalInfo";
import ResetPasswordSection from "@/components/Dashboard/UserProfile/ResetPasswordSection";

export const metadata: Metadata = {
  title: "User Profile | Dashboard",
  description: "View and update your profile information, including personal details and password settings."
};

export default function UserProfilePage() {
  return (
    <div className="p-4 md:p-6 bg-white rounded-xl border min-h-screen">
      <h1 className="text-xl font-bold mb-6">User Profile</h1>
      <div className="space-y-6">
        <ProfileHeader />
        <PersonalInfo />
        <ResetPasswordSection />
      </div>
    </div>
  );
}