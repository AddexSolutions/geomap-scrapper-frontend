"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiHome, FiSettings, FiUser, FiX } from "react-icons/fi";
import { TbSubtask } from "react-icons/tb";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: FiHome },
  { href: "/dashboard/jobs", label: "Jobs", icon: TbSubtask },
  { href: "/dashboard/user-profile", label: "User Profile", icon: FiUser },
  { href: "/dashboard/settings", label: "Settings", icon: FiSettings },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    }

    if (sidebarOpen && window.innerWidth < 1024) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarOpen, setSidebarOpen]);

  if (!sidebarOpen) {
    return null;
  }

  return (
    <div ref={sidebarRef} className={`flex flex-col fixed top-0 left-0 z-50 h-screen w-72 bg-white border-r transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:w-72 lg:translate-x-0`}>
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image src={"/images/logo/logo.png"} alt="Logo" height={40} width={40} />
          <h1 className="text-xl lg:text-2xl font-semibold">GeoMaps Scraper</h1>
        </div>
        {/* Close button for mobile */}
        <button className="lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
          <FiX size={24} />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <SidebarNav />

      {/* Go to Homepage Component */}
      <GoToHomepage />
    </div>
  );
}

// 🎯 Sidebar Navigation Component
const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <nav className="p-4 flex-1">
      <ul className="flex flex-col gap-3">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded transition ${isActive ? "text-primary bg-blue-50" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <item.icon className={`mr-2 text-xl ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                <span className="text-sm md:text-md">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

// 🎯 Go to Homepage Component
const GoToHomepage = () => (
  <div className="p-4 mx-3 my-4 bg-slate-50 rounded-lg text-center">
    <h3 className="text-sm font-semibold">Power Up Your Lead Generation</h3>
    <p className="text-xs text-gray-600 mt-1">Find, extract, and organize business data from Google Maps in seconds.</p>
    <Link href="/">
      <button className="mt-3 py-2 w-full bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
        Go to Homepage
      </button>
    </Link>
  </div>
);
