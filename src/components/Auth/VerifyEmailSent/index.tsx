export default function VerifyEmailSent({ email }: { email: string }) {
  return (
    <section className="bg-[#F4F7FF] py-20 dark:bg-dark flex ">
      <div className="container">
        <div className="flex justify-center">
          <div className="shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px] max-w-[450px]">
            {/* Email Sent Icon */}
            <div className="mb-6 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-16 w-16 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 9V5.25A2.25 2.25 0 0019.5 3H4.5a2.25 2.25 0 00-2.25 2.25V9m19.5 0V19.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V9m19.5 0L12 14.25 2.25 9"
                />
              </svg>
            </div>

            {/* Heading */}
            <h2 className="mb-3 text-2xl font-semibold text-dark dark:text-white">
              Verification Email Sent
            </h2>

            {/* Description */}
            <p className="mb-4 text-sm text-dark-6 dark:text-gray-300">
              Please check your inbox and click the verification link to
              activate your account.
            </p>

            {/* Email Display */}
            <p className="text-base font-medium text-primary">
              Sent to: <span className="text-base font-semibold">{email}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
