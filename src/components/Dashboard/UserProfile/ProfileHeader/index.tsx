import Image from "next/image";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import React from "react";

export default function ProfileHeader() {
  return (
    <div className="bg-white rounded-lg p-6 border">
      <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
        <div className="flex flex-col xl:flex-row items-center gap-4 w-full">
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
        <div className="flex flex-col xl:flex-row max-xl:w-full gap-3">
          <div className="flex justify-center gap-2">
            <SocialIcon icon={<FaFacebookF />} />
            <SocialIcon icon={<FaXTwitter />} />
            <SocialIcon icon={<FaLinkedinIn />} />
            <SocialIcon icon={<FaInstagram />} />
          </div>

          <button className={`flex items-center justify-center max-sm:w-full gap-2 px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg hover:bg-gray-100 transition`}>
            <FiEdit3 />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="w-9 h-9 flex items-center justify-center rounded-full border text-gray-700 hover:bg-gray-100 cursor-pointer transition">
      {icon}
    </div>
  );
}