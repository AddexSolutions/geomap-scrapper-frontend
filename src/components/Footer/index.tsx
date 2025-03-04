import Image from "next/image";
import Link from "next/link";
import React from "react";

// Define your link groups as arrays for clarity and maintainability
const footerSections = [
  {
    title: "About Us",
    classNames: "w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12",
    links: [
      { label: "About", href: "/about" },
      { label: "How it works", href: "/about" },
      { label: "Explore", href: "/about" },
    ],
  },
  {
    title: "Pricing",
    classNames: "w-full px-4 md:w-1/2 lg:w-3/12 xl:w-2/12",
    links: [
      { label: "Starter Plan", href: "/pricing" },
      { label: "Professional Plan", href: "/pricing" },
      { label: "Enterprise Plan", href: "/pricing" },
    ],
  },
  {
    title: "Useful Links",
    classNames: "w-full px-4 md:w-2/3 lg:w-6/12 xl:w-3/12",
    links: [
      { label: "Home", href: "/" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const Footer = () => {
  return (
    <footer
      className="overflow-hidden wow fadeInUp relative z-10 bg-[#090E34] pt-20 lg:pt-[100px]"
      data-wow-delay=".15s"
    >
      <div className="container">
        <div className="-mx-4 grid grid-cols-1 xl:grid-cols-2">
          {/* Left section: Brand / Description */}
          <div className="w-full px-4">
            <div className="mb-10 w-full">
              <Link
                href="/"
                className="mb-6 inline-block header-logo w-full text-3xl font-semibold text-white"
              >
                GMaps Scraper
              </Link>
              <p className="mb-8 max-w-[270px] text-base text-gray-7">
                Extract business data from Google Maps quickly, easily,
                and at the lowest cost.
              </p>
            </div>
          </div>

          {/* Mapped link sections */}
          <div className="flex flex-wrap flex-1 justify-between gap-5">
            {footerSections.map((section) => (
              <div key={section.title} className={section.classNames}>
                <div className="mb-10 w-full">
                  <h4 className="mb-3 lg:mb-6 text-lg font-semibold whitespace-nowrap text-white">
                    {section.title}
                  </h4>
                  <ul className="max-lg:flex flex-wrap gap-5">
                    {section.links.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="lg:mb-3 inline-block text-base whitespace-nowrap text-gray-7 hover:text-primary"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Shapes */}
        <span className="absolute left-0 top-0 z-[-1] aspect-[95/82] w-full max-w-[570px]">
          <Image src="/images/footer/shape-1.svg" alt="shape" fill />
        </span>
        <span className="absolute bottom-0 right-0 z-[-1] aspect-[31/22] w-full max-w-[372px]">
          <Image src="/images/footer/shape-3.svg" alt="shape" fill />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
