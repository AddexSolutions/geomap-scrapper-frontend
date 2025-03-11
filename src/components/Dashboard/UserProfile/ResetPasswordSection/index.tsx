"use client";

import { useState } from "react";
import ResetPasswordModal from "./ResetPasswordModel";

export default function ResetPasswordSection() {
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
      {isOpen && <ResetPasswordModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
