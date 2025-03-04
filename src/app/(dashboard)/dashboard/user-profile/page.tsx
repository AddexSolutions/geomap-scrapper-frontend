"use client";

import { useState } from "react";
import Image from "next/image";
import { FiEdit3 } from "react-icons/fi";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { FiX } from "react-icons/fi"; // Close Icon
import Loader from "@/components/Common/Loader";
import { useAuth } from "@/context/AuthContext";

export default function UserProfilePage() {
  return (
    <div className="p-4 md:p-6 bg-white rounded-xl border min-h-screen">
      <h1 className="text-xl font-bold mb-6">User Profile</h1>

      <div className="space-y-6">
        {/* Profile Section */}
        <ProfileHeader />

        {/* Personal Information Section */}
        <PersonalInfo />

        {/* Reset Password Section */}
        <ResetPasswordSection />
      </div>
    </div>
  );
}

// 🎯 Profile Header Component
const ProfileHeader = () => {
  return (
    <div className="bg-white rounded-lg p-6 border">
      <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
        <div className="flex flex-col xl:flex-row items-center gap-4 w-full">
          {/* User Image */}
          <Image
            src="/images/user.png"
            alt="User Profile"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover border"
          />

          <div className="text-center xl:text-left">
            <h2 className="text-lg font-semibold">Muhammad Bilawal</h2>
            <p className="text-gray-500 text-sm">Full Stack Developer | Addex Solutions</p>
          </div>
        </div>

        {/* Social Icons & Edit Button */}
        <div className="flex flex-col xl:flex-row max-xl:w-full gap-3">
          <div className="flex justify-center gap-2">
            <SocialIcon icon={<FaFacebookF />} />
            <SocialIcon icon={<FaXTwitter />} />
            <SocialIcon icon={<FaLinkedinIn />} />
            <SocialIcon icon={<FaInstagram />} />
          </div>
          <EditButton />
        </div>
      </div>
    </div>
  );
};

// 🎯 Personal Information Component
const PersonalInfo = () => {
  return (
    <div className="bg-white rounded-lg p-6 border">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-lg font-semibold mb-4 md:mb-0">Personal Information</h3>
        <EditButton additionalClasses="hidden xl:flex" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
        <InfoRow label="Full Name" value="Muhammad Bilawal" />
        <InfoRow label="Email Address" value="bk4449719@gmail.com" />
        <InfoRow label="Phone" value="+92 3340300278" />
        <EditButton additionalClasses="xl:hidden" />
      </div>
    </div>
  );
};

// 🎯 Reset Password Section
const ResetPasswordSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 border">
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between items-center">
        <h3 className="text-lg font-semibold">Reset Password</h3>
        <button
          className="px-4 py-2 text-sm max-lg:w-full font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition"
          onClick={() => setIsOpen(true)}
        >
          Reset Password
        </button>
      </div>

      {/* Reset Password Modal */}
      {isOpen && <ResetPasswordModal onClose={() => setIsOpen(false)} />}
    </div>
  );
};

// 🎯 Reset Password Modal Component with Close Button & Background Click to Close
const ResetPasswordModal = ({ onClose }: { onClose: () => void }) => {

  const { user, sendResetEmail } = useAuth();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    currentPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleResetPassword = async () => {
    setIsSubmitting(true);

    await sendResetEmail(formData.currentPassword);

    setFormData({ ...formData, currentPassword: '' });

    setIsSubmitting(false);
  };

  function confirmResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const userConfirmed = window.confirm(
      "⚠️ Warning: Resetting your password will log you out from all devices. Do you want to continue?"
    );

    if (userConfirmed) {
      handleResetPassword();
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Clicking outside closes the modal
    >
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative" onClick={(e) => e.stopPropagation()}>
        {/* Close Button (X) */}
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition"
          onClick={onClose}
        >
          <FiX className="text-gray-600" size={20} />
        </button>

        <h3 className="text-lg font-semibold mb-4">Reset Password</h3>

        <form onSubmit={confirmResetPassword}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="text-sm text-gray-500 block mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Current Password Input */}
          <div className="mb-4">
            <label className="text-sm text-gray-500 block mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:border-primary outline-none"
              placeholder="Enter your current password"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'} flex justify-center items-center px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition`}
            >
              {isSubmitting ? <Loader /> : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 🎯 Info Row Component
const InfoRow = ({ label, value, additionalClasses = "" }: { label: string; value: string; additionalClasses?: string }) => (
  <div className={`text-center md:text-left ${additionalClasses}`}>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-md font-medium">{value}</p>
  </div>
);

// 🎯 Social Icon Component
const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-9 h-9 flex items-center justify-center rounded-full border text-gray-700 hover:bg-gray-100 cursor-pointer transition">
    {icon}
  </div>
);

// 🎯 Edit Button Component
const EditButton = ({ additionalClasses }: { additionalClasses?: string }) => (
  <button className={`${additionalClasses} flex items-center justify-center max-sm:w-full gap-2 px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg hover:bg-gray-100 transition`}>
    <FiEdit3 />
    Edit
  </button>
);
