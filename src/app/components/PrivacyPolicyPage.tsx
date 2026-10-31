import { LegalLayout, LegalSection } from "./LegalLayout";

const SECTIONS: LegalSection[] = [
  {
    id: "information-we-collect",
    heading: "Information We Collect",
    paras: [
      "When you enquire about a course, book a retreat or submit a form on our website, we collect the details you provide — such as your name, email address, phone number, country and any message you send us. This information is used solely to respond to your request and administer your enrolment.",
      "We also collect limited technical information automatically, such as your browser type, device and pages visited, to help us understand how the site is used and to improve it.",
    ],
  },
  {
    id: "how-we-use-it",
    heading: "How We Use Your Information",
    paras: [
      "We use your information to reply to enquiries, process course and retreat applications, send you information you have requested, and — where you have opted in — occasional updates about our programs.",
      "We do not sell your personal information. We only share it with trusted service providers (for example, payment processors) to the extent necessary to deliver our services to you.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies & Analytics",
    paras: [
      "Our website uses cookies to remember your preferences and to measure traffic through privacy-respecting analytics. Analytics cookies are only set after you accept them via our cookie banner.",
      "You can decline non-essential cookies at any time, and you can clear cookies through your browser settings without affecting the core functionality of the site.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your Rights",
    paras: [
      "You may request access to the personal information we hold about you, ask us to correct or delete it, or withdraw consent for marketing communications at any time. To exercise these rights, contact us using the details below.",
    ],
  },
  {
    id: "data-retention",
    heading: "Data Retention & Security",
    paras: [
      "We retain your information only for as long as necessary to fulfil the purposes described here or to comply with legal obligations. We take reasonable technical and organisational measures to protect your data against loss, misuse and unauthorised access.",
    ],
  },
  {
    id: "contact",
    heading: "Contact Us",
    paras: [
      "If you have any questions about this Privacy Policy or how your information is handled, please email us at info@shivayoganiketan.com or write to Shiva Yoga Niketan, Laxman Jhula Road, Tapovan, Rishikesh, Uttarakhand 249192, India.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="17 September 2025"
      intro="Your trust matters to us. This Privacy Policy explains what information Shiva Yoga Niketan collects, how we use it, and the choices you have. By using our website you agree to the practices described below."
      sections={SECTIONS}
    />
  );
}
