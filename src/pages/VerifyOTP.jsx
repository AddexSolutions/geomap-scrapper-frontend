import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get('token') || "";
    const otp = searchParams.get('otp') || "";


    console.log(token);

    const [userOTP, setUserOTP] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Handle OTP Verification
    const handleVerifyOTP = async (e) => {
        e.preventDefault(); // Prevent form submission

        // Check if OTP is empty
        if (!userOTP.trim()) {
            setError("OTP is required!");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch(`https://primary-production-af7f.up.railway.app/webhook/geomap/verify-otp?otp=${userOTP}&token=${token}`, {
                redirect: 'follow',
                // mode: 'no-cors',
            });

            console.log("VERIFY");
            console.log(response);

            const data = await response.json();

            console.log(data);

            if (!response.ok) {

                if (response.status === 302) {
                    setTimeout(() => {
                        window.location.href = data.url;
                    }, 2000)
                    return;
                }

                throw new Error("Invalid OTP or token");
            }

            toast.success("OTP Verified! Redirecting to login...");

            setTimeout(() => {
                navigate('/login');
            }, 1000)
        } catch (err) {
            console.log(err);
            toast.error("OTP Verification Failed!");
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-[90vh] flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleVerifyOTP}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-sm text-center"
            >
                <h2 className="text-3xl font-bold text-gray-800">Verify OTP</h2>
                <p className="mt-2 text-gray-600 text-sm">
                    Enter the OTP sent to your email to verify your account.
                </p>

                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={userOTP}
                    required
                    onChange={(e) => setUserOTP(e.target.value)}
                    className="w-full px-5 mt-6 py-3 border border-gray-300 rounded-md text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

                <button
                    disabled={isSubmitting}
                    className={`mt-5 w-full py-3 rounded-md flex items-center justify-center gap-2 font-medium transition ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} text-white`}
                >
                    {isSubmitting && <Loader2 className="animate-spin" size={20} />}
                    {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                </button>

                {/* Debug OTP (Optional) */}
                <p className="mt-4 text-xs text-gray-500">Debug OTP: <strong>{otp}</strong></p>
            </form>
        </section>
    );
};

export default VerifyOTP;
