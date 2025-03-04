import SectionTitle from "../Common/SectionTitle";
import PricingBox from "./PricingBox";
import { pricingData } from "@/components/Pricing/pricingData";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-[#F9FAFB] pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Pricing Plans"
            title="Affordable Plans for Every Need"
            paragraph="Choose a plan that fits your budget and start extracting Google Maps data effortlessly."
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {pricingData.map((product, i) => (
            <PricingBox key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;