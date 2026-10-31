import { Check } from "lucide-react";
import { Breadcrumbs, PrimaryButton } from "./SiteExtras";

export default function ThankYouPage() {
  return (
    <main className="bg-[#f8f3ed]">
      <Breadcrumbs />
      <section className="px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-[120px]">
        <div className="max-w-[680px] mx-auto flex flex-col items-center text-center gap-7 lg:gap-9">
          {/* Confirmation icon */}
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[#074240] flex items-center justify-center shadow-[0_16px_40px_rgba(7,66,64,0.18)]">
            <Check size={44} strokeWidth={2.4} className="text-white" />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[36px] sm:text-[52px] lg:text-[64px] tracking-[-2px] lg:tracking-[-3px] leading-[1.05]">
              Thank you
            </h1>
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px] leading-[1.8] max-w-[520px] mx-auto">
              Your message has reached us. Our team typically replies within{" "}
              <strong className="text-[#074240]">one business day</strong>. In the meantime, feel
              free to keep exploring our courses and retreats.
            </p>
          </div>

          {/* Secondary CTA */}
          <PrimaryButton to="/" variant="secondary">Return to Home</PrimaryButton>
        </div>
      </section>
    </main>
  );
}
