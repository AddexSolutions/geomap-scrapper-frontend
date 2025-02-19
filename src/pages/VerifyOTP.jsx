import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const VerifyOTP = () => {
    // Extract email from query params
    const [searchParams] = useSearchParams();
    console.log(searchParams);
    const token = searchParams.get('token') || "your token";

    const [countdown, setCountdown] = useState(5);

    return (
        <section className="min-h-[90vh] flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold text-gray-800">Verify Your Email</h2>
                <p className="mt-3 text-gray-600">
                    We've sent an email to
                    Please check your inbox and enter the verification code.
                </p>
                <p className="mt-4 text-sm text-gray-500">
                    Redirecting to login in <strong>{countdown}</strong> seconds...
                </p>
                <p>
                    {token}
                </p>
            </div>
        </section>
    );
};

export default VerifyOTP;
