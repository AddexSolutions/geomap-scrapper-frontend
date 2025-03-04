"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface TopbarProps {
  sidebarOpen: boolean,
  setSidebarOpen: (open: boolean) => void,
}

export default function Topbar({ sidebarOpen, setSidebarOpen }: TopbarProps) {

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b relative">

      {/* Sidebar Toggle */}
      <div className="flex justify-between w-full items-center">
        <button
          className="flex items-center justify-center p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition duration-300 focus:outline-none"
          aria-label="Toggle Sidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <RxHamburgerMenu size={20} className="text-gray-600" />
        </button>

        {/* User Profile Dropdown */}
        <UserDropdown />
      </div>
    </header>
  );
}

// 🎯 UserDropdown Component (Dropdown Closes on Item Click)
const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const { signout } = useAuth();

  return (
    <div
      className="relative"
      ref={dropdownRef}
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
    >
      {/* Profile Button */}
      <div
        className="flex items-center md:gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={"/images/user.png"}
          alt="User"
          width={30}
          height={30}
          className="w-12 h-12 object-cover bg-gray-300 rounded-full"
        />
        <span className="flex items-center">
          <h1 className="hidden md:inline-block text-sm">Muhammad Bilawal</h1>
          <MdOutlineKeyboardArrowDown size={24} className="text-gray-600 ml-1" />
        </span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <h3 className="text-sm font-semibold">Muhammad Bilawal</h3>
            <p className="text-xs text-gray-600">bk4449719@gmail.com</p>
          </div>
          <ul className="p-2 space-y-1">
            <DropdownItem label="Edit Profile" onClick={() => {
              router.push('/dashboard/user-profile');
              setIsOpen(false); // Close dropdown after clicking
            }} />
            <DropdownItem label="Account Settings" onClick={() => {
              router.push('/dashboard/settings');
              setIsOpen(false);
            }} />
            <DropdownItem label="Sign Out" onClick={() => {
              signout();
              setIsOpen(false);
            }} additionalClasses="text-red-600 border-t mt-2" />
          </ul>
        </div>
      )}
    </div>
  );
};

// 🎯 Reusable DropdownItem Component
const DropdownItem = ({ label, onClick, additionalClasses = "" }: { label: string, onClick: () => void, additionalClasses?: string }) => {
  return (
    <li
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 flex items-center rounded ${additionalClasses}`}
    >
      {label}
    </li>
  );
};
