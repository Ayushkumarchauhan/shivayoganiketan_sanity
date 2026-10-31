import { LegalLayout, LegalSection } from "./LegalLayout";

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of Terms",
    paras: [
      "By accessing this website and by booking a course or retreat with Shiva Yoga Niketan, you agree to be bound by these Terms & Conditions. If you do not agree with any part of them, please do not use our website or services.",
    ],
  },
  {
    id: "bookings",
    heading: "Bookings & Registration",
    paras: [
      "A place on any course or retreat is confirmed only once we have received your completed application and the required registration fee. The registration fee forms part of the total course fee and is non-refundable.",
      "The remaining balance is payable on arrival unless otherwise agreed in writing. We reserve the right to decline any application at our discretion.",
    ],
  },
  {
    id: "payments",
    heading: "Payments & Fees",
    paras: [
      "All fees are quoted in US Dollars and cover the items listed on the relevant course or retreat page. Fees do not include airfare, visa costs, travel insurance or personal expenses unless expressly stated.",
    ],
  },
  {
    id: "cancellations",
    heading: "Cancellations & Refunds",
    paras: [
      "If you need to cancel, the non-refundable registration fee will be retained; any additional amount paid may be transferred to a future course within twelve months, subject to availability. We recommend arranging travel insurance to cover unforeseen circumstances.",
      "In the rare event that we must cancel a course, you will be offered an alternative date or a refund of amounts paid, excluding third-party costs already incurred on your behalf.",
    ],
  },
  {
    id: "conduct",
    heading: "Student Conduct",
    paras: [
      "Students are expected to attend classes punctually, respect fellow participants and staff, and follow the guidelines of the school, including its dietary and community principles. We may ask any student whose conduct disrupts the programme to leave without refund.",
    ],
  },
  {
    id: "liability",
    heading: "Health & Liability",
    paras: [
      "Yoga practice carries inherent physical risk. You confirm that you are in suitable health to participate and agree to practise within your own limits. Shiva Yoga Niketan accepts no liability for injury, loss or damage except where caused by our proven negligence.",
    ],
  },
  {
    id: "contact",
    heading: "Contact Us",
    paras: [
      "Questions about these Terms & Conditions can be sent to info@shivayoganiketan.com or to Shiva Yoga Niketan, Laxman Jhula Road, Tapovan, Rishikesh, Uttarakhand 249192, India.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      updated="17 September 2025"
      intro="These Terms & Conditions set out the basis on which you may use our website and enrol in courses and retreats offered by Shiva Yoga Niketan. Please read them carefully before booking."
      sections={SECTIONS}
    />
  );
}
