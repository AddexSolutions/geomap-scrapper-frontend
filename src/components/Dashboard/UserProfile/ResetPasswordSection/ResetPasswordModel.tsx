"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { MdWarning } from "react-icons/md"; // Warning icon
import Loader from "@/components/Common/Loader";
import { useAuth } from "@/context/AuthContext";

interface ResetPasswordModalProps {
  onClose: () => void;
}

export default function ResetPasswordModal({ onClose }: ResetPasswordModalProps) {
  const { user, sendResetEmail } = useAuth();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    currentPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResetPassword = async () => {
    setIsSubmitting(true);
    await sendResetEmail(formData.currentPassword);
    setFormData({ ...formData, currentPassword: '' });
    setIsSubmitting(false);
    onClose(); // Close modal after process completes
  };

  // Opens the confirmation modal
  function confirmResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowConfirm(true);
  }

  const handleConfirm = async () => {
    setShowConfirm(false);
    await handleResetPassword();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={!isSubmitting ? onClose : undefined} // Disable closing when submitting
    >
      <div
        className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full transition ${!isSubmitting ? "hover:bg-gray-200" : "opacity-50 cursor-not-allowed"
            }`}
          onClick={!isSubmitting ? onClose : undefined}
          disabled={isSubmitting}
        >
          <FiX className="text-gray-600" size={20} />
        </button>
        <h3 className="text-lg font-semibold mb-4">Reset Password</h3>
        <form onSubmit={confirmResetPassword}>
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
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={!isSubmitting ? onClose : undefined}
              disabled={isSubmitting}
              className={`px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg transition ${!isSubmitting ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"
                }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex justify-center items-center px-4 py-2 text-sm font-semibold rounded-lg transition ${isSubmitting
                ? "cursor-not-allowed bg-blue-400"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              {isSubmitting ? <Loader /> : "Reset Password"}
            </button>
          </div>
        </form>

        {showConfirm && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={!isSubmitting ? () => setShowConfirm(false) : undefined}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div
              className="bg-white rounded-lg p-6 w-[90%] max-w-lg z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-4">
                <MdWarning className="text-yellow-500" size={24} />
                <h4 className="text-lg font-semibold">Warning</h4>
              </div>
              <p className="mb-6">
                Resetting your password will log you out from all devices.
                Are you sure you want to continue?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={!isSubmitting ? () => setShowConfirm(false) : undefined}
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg transition ${!isSubmitting ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"
                    }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition ${isSubmitting ? "cursor-not-allowed bg-red-400" : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                  {isSubmitting ? <Loader /> : "Yes, Continue"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}