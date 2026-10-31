import { submitForm, Honeypot, FormError, usePageMeta, useJsonLd, absUrl, SITE } from "./SiteExtras";
import NotFoundPage from "./NotFoundPage";
import { useState, useMemo } from "react";
import { useCms } from "../cms/useCms";
import { useParams, Link } from "react-router";
import svgPaths from "../../imports/svg-zd947lh8yo";
import { placeholder, LCP } from "./imagePlaceholder";
import { SelectMenu } from "./ZenShared";

// Program hero images
const imgP2044 = placeholder("imgP2044");
const imgP2045 = placeholder("imgP2045");
const imgP2046 = placeholder("imgP2046");
const imgP2047 = placeholder("imgP2047");
const imgTexture = placeholder("imgTexture");

// Teacher photos
const imgTeacher1 = placeholder("imgTeacher1");
const imgTeacher2 = placeholder("imgTeacher2");
const imgTeacher3 = placeholder("imgTeacher3");
const imgTeacher4 = placeholder("imgTeacher4");
const imgTeacher5 = placeholder("imgTeacher5");
const imgTeacher6 = placeholder("imgTeacher6");

// ─────────────────────────────────────────────────────────────────────────────
// Program data
//
// ▸ To edit COURSE DATES, FEES or the DAILY SCHEDULE for any program, simply
//   change the arrays (`schedule`, `fees`, `dates`, `registrationFee`, …) inside
//   that program's object below. Each is a plain list of { … } rows.
// ─────────────────────────────────────────────────────────────────────────────

interface ProgramTeacher {
  name: string;
  title: string;
  photo: string;
  slug: string;
}

interface AccordionItem {
  title: string;
  body: string;
}

interface ScheduleRow {
  time: string;
  activity: string;
}

interface FeeRow {
  label: string;
  price: string;
}

interface CourseDate {
  period: string;
  price: string;
}

interface ProgramData {
  slug:          string;
  title:         string;
  badge:         string;
  tagline:       string;
  heroImg:       string;
  introTitle:    string;
  introParas:    string[];

  // "What you will learn" / syllabus — rendered as bulleted paragraphs
  learnTitle?:   string;
  learnPoints?:  string[];

  // Ethics & behaviour — rendered as a bulleted list
  ethicsTitle?:  string;
  ethicsPoints?: string[];

  // Optional accordion (used by programs without full brochure content yet)
  topicsHeading?: string;
  topics?:        AccordionItem[];

  // Daily schedule table
  scheduleTitle?: string;
  scheduleNote?:  string;
  schedule?:      ScheduleRow[];

  // Fees & registration
  feesTitle?:        string;
  registrationFee?:  string;
  fees?:             FeeRow[];
  feesNotes?:        string[];

  // Upcoming course dates
  datesTitle?: string;
  dates?:      CourseDate[];

  // Course fee includes
  includesTitle?: string;
  includes?:      string[];

  // Accommodation
  accommodationTitle?: string;
  accommodation?:      string;

  // Assistance / contact
  assistanceTitle?:    string;
  assistanceNote?:     string;
  assistanceEmail?:    string;
  assistanceWhatsapp?: string;

  showCallbackForm?: boolean;

  teachers: ProgramTeacher[];

  // Optional Google title/description overrides (from Sanity).
  seo?: { metaTitle?: string; metaDescription?: string };
}

// Shared brochure blocks reused across the teacher-training programs ────────────
const STANDARD_SCHEDULE: ScheduleRow[] = [
  { time: "06:00am – 07:00am", activity: "Pranayama, Kriyas & Meditation" },
  { time: "07:30am – 09:00am", activity: "Hatha Yoga Asana Practice" },
  { time: "09:00am – 09:30am", activity: "Tea Break & Breakfast Lectures" },
  { time: "09:30am – 10:30am", activity: "Yoga Principles & Philosophy" },
  { time: "10:30am – 11:30am", activity: "Anatomy Class" },
  { time: "11:30am – 12:30pm", activity: "Rest & Self Study" },
  { time: "01:00pm – 02:30pm", activity: "Lunch" },
  { time: "02:00pm – 03:30pm", activity: "Chanting, Meditation & Yoga Nidra" },
  { time: "04:00pm – 04:30pm", activity: "Refreshing Time, Tea Break With Snacks" },
  { time: "05:00pm – 06:30pm", activity: "Hatha Yoga Asana Practice Including Teaching Practicums" },
  { time: "06:30pm – 07:30pm", activity: "Rest Time or Sharing Knowledge" },
  { time: "07:30pm – 08:30pm", activity: "Dinner Time" },
  { time: "08:30pm – 09:30pm", activity: "Kirtan or Deep Meditation" },
  { time: "10:00pm",           activity: "Lights Off" },
];

const STANDARD_FEES: FeeRow[] = [
  { label: "Regular Course Price",        price: "USD 1450" },
  { label: "Booking Before One Month",    price: "USD 1200" },
  { label: "Course Price For Pair (Two)", price: "USD 2700" },
];

const STANDARD_FEE_NOTES = [
  "Special discount available for groups.",
  "Remaining fees needs to be paid on arrival.",
];

const STANDARD_DATES: CourseDate[] = [
  { period: "7th January 2022 – 3rd February 2022",  price: "USD 1450" },
  { period: "7th February 2022 – 3rd March 2022",    price: "USD 1450" },
  { period: "7th March 2022 – 3rd April 2022",       price: "USD 1450" },
  { period: "7th April 2022 – 3rd May 2022",         price: "USD 1450" },
  { period: "7th May 2022 – 3rd June 2022",          price: "USD 1450" },
  { period: "7th June 2022 – 3rd July 2022",         price: "USD 1450" },
  { period: "7th July 2022 – 3rd August 2022",       price: "USD 1450" },
  { period: "7th August 2022 – 3rd September 2022",  price: "USD 1450" },
  { period: "7th September 2022 – 3rd October 2022", price: "USD 1450" },
];

const STANDARD_INCLUDES = [
  "Private room with attached bathroom",
  "Vegetarian meals (3 times a day)",
  "Yoga course material, two yoga books, one notebook",
  "Two outdoor tours on weekends",
  "Comfortable accommodation",
  "Ganges river rafting",
  "Free Wi-Fi facility",
];

// Built-in content — shown when Sanity has no published programs (and used to seed Sanity).
export const ALL_PROGRAMS: ProgramData[] = [
  {
    slug:    "yoga-course-for-beginners",
    title:   "Yoga Course For Beginners",
    badge:   "Foundation & Fundamentals",
    tagline: "A four-week preparatory yoga series that introduces newcomers to all the basic fundamentals of yoga — asana, pranayama, meditation and philosophy.",
    heroImg: imgP2044,
    introTitle: "Yoga Course for Beginners in India",
    introParas: [
      "Shiva Yoga Niketan has developed a new yoga system for newcomers. The four-week preparatory yoga series introduces students to all the basic fundamentals of Yoga. In the present time there is a dilemma among most of us — whether yoga knowledge will be helpful, whether we will be able to do meditation, asanas and postures correctly, and whether we will understand the changes happening within the body through yoga. Keeping these questions in mind, Shiva Yoga Niketan has started a special yoga series to develop a deep yoga understanding among all.",
      "In this yoga series students will be told how they can understand the science of life through yoga power and fulfil their living values, so that they can improve their life in a physical, moral and social manner. You will understand the history, yoga philosophy and development of yoga, and analyse the famous yoga literature in depth — discovering the goal of yoga and the practice that can help you fulfil it in your personal and professional life.",
    ],
    learnTitle: "What You Will Learn",
    learnPoints: [
      "During the course, with the help of asanas and different body postures, students will be told about the problems of the human body and their body abilities for better yoga performance.",
      "With the help of right asana and postures, students will be able to understand how they can correct their shortcomings and do things with stability.",
      "By passive stretching techniques, students will feel the energy and flexibility in their health. By applying some simple asanas, students will be able to understand and co-ordinate with the architecture of their nervous system.",
      "With the help of regular pranayama, students will experience energy within. They will also learn the reasons for obstruction in the body's energy, and how those causes can be treated through pranayama.",
      "Meditation power will be developed from regular yoga practice, which is necessary today for everyone. Students will be given the best advice on yoga practice and proper guidance to strengthen their body health.",
      "With the help of philosophical and moral knowledge, students will develop awareness towards different dimensions of life so they can experience inner peace and fulfilment from within.",
    ],
    ethicsTitle: "Ethics and Behaviour",
    ethicsPoints: [
      "You will know the ancient science given in the Patanjali Yoga Sutras, Hatha Yoga Pradipika, Swara Yoga and Bhagavad Gita.",
      "You will be able to understand the structure of the human body through intense knowledge of pranayama, shatkarma and meditation.",
      "You will understand the development aspects of Vedic principles and personality.",
      "Mantra pronunciation and kirtan will be part of your daily activities.",
      "Changes in yoga techniques according to the personality of the student can be made, so that students benefit more from the practices.",
      "Suitable meals for physical, mental and spiritual development will be included with yoga practices.",
      "To understand the problems of all students, presentations and question & answer sessions will be conducted.",
      "All students should keep in mind that Shiva Yoga Niketan teaches only the traditional principles of Hatha and Raja Yoga.",
      "Behaviour plays an important role in learning and evaluating. Students should understand the rules and community ideas suggested by the ancient sages for yoga practice.",
      "Food prepared at Shiva Yoga Niketan is according to the ancient guidelines of Ayurveda and yoga. All students are expected to adapt their diet habits according to yoga.",
      "All students should reach their class on time; students who do not come on time will not be allowed to attend the classes.",
      "All students are requested to clear their dues before leaving the premises.",
      "Accommodation facility is available with meals during the course, and only vegetarian food will be made available — no non-vegetarian meals will be provided on the premises.",
      "All students should be mentally and physically fit before the beginning of the yoga course; if their health is not good they are advised to consult their doctor.",
    ],
    scheduleTitle: "Daily Schedule",
    scheduleNote:  "Program runs 7 to 8 hours a day (6 days per week). Class schedule may change according to the situation.",
    schedule:      STANDARD_SCHEDULE,
    feesTitle:       "Fees & Registration",
    registrationFee: "USD 200 (non-refundable)",
    fees:            STANDARD_FEES,
    feesNotes:       STANDARD_FEE_NOTES,
    datesTitle: "Upcoming Course Dates — Rishikesh, India",
    dates:      STANDARD_DATES,
    includesTitle: "Course Fee Includes",
    includes:      STANDARD_INCLUDES,
    accommodationTitle: "Our Accommodation",
    accommodation:      "In our attempt to promote a yogic lifestyle, vegetarian meals and herbal teas are served three times daily (breakfast / lunch / dinner), prepared in our own equipped kitchen using filtered water.",
    assistanceTitle:    "Assistance",
    assistanceNote:     "If you have any questions related to Registration, Payment, Visa or any other inquiry about our Yoga teacher training course, please contact us at:",
    assistanceEmail:    "support@shivayoganiketan.com",
    assistanceWhatsapp: "+91-7455855666",
    showCallbackForm:   true,
    teachers: [
      { name: "Angela Carbone", title: "Yoga Teacher & Therapist", photo: imgTeacher1, slug: "angela-carbone" },
      { name: "Meghan Conner",  title: "Yoga Teacher & Therapist", photo: imgTeacher2, slug: "meghan-conner"  },
      { name: "Sofia Renner",   title: "Yoga Teacher & Therapist", photo: imgTeacher3, slug: "sofia-renner"   },
    ],
  },
  {
    slug:    "200-hrs-hatha-yoga-teacher-training",
    title:   "200 Hrs Hatha Yoga Teacher Training",
    badge:   "Teacher Training · Certification",
    tagline: "A Yoga Alliance (USA) compliant certification rooted in classical Hatha yoga — asana, pranayama, philosophy, anatomy and the art of teaching.",
    heroImg: imgP2045,
    introTitle: "200 Hour Hatha Yoga Teacher Training",
    introParas: [
      "Shiva Yoga Niketan runs its 200-hour Hatha Yoga Teacher Training course in compliance with Yoga Alliance (USA) standards. The purpose of running this course is that students can acquire academic knowledge along with primary yoga practice and can choose yoga as a profession. Students are encouraged by the traditional ideas of the progressive patterns of Hatha Yoga so that they can gain a deeper experience of yoga science.",
      "There is a misconception about Hatha Yoga (Hatha Yoga Pradipika) that it has no spiritual goal, which is wrong — spiritual experiences can be achieved through the physiological yoga process of Hatha Yoga. All of us are caught in emotions like anger, greed and attachment; Hatha Yoga makes everyone free from these emotions. Hatha Yoga teaches us to stay steadfast with stability. Yoga means to unite — in Hatha Yoga we fully concentrate the mind at one point and keep the body firm through meditation and postures.",
    ],
    learnTitle: "What the 200 Hours of Hatha Yoga Provides",
    learnPoints: [
      "Asana: In the morning, regular 4 hours of yoga exercises from Monday to Sunday, practising therapeutic postures and awakening the important points of the body. All information related to vinyasa will be given so that everyone can learn how to create their own vinyasa sequence.",
      "Pranayama: Through regular pranayama practice you will feel the source of energy within yourself and be able to use that inner energy positively in your life.",
      "Yoga nidra and meditation will also be taught to all students so they can understand the importance of relaxation and meditation with intensity and use it in their life with confidence.",
      "You will learn the principles of Hatha Yoga through yoga postures so you can share your experience with your students and make them aware of the rules, methodology, practices and science of yoga in their class.",
      "Mantras and bhajans will be included with daily yoga exercises so everyone can experience mental peace during the course.",
      "Yoga philosophy includes the study of the Yoga Sutras of Patanjali, so that yoga can be used for the prevention of physical and mental disorders. Hatha Yoga Pradipika will be studied to understand the curative aspects of classical Hatha Yoga.",
    ],
    topicsHeading: "200 Hour Hatha Yoga Teacher Training Syllabus",
    topics: [
      { title: "Asanas",           body: "Practice of the yogasanas consists of 4 hours each day from Monday to Saturday. Morning practice focuses on asanas with a therapeutic approach and opening the vital centers of the body. Students also practise the modified vinyasa flow and learn to create their own vinyasa sequences. In the evening practice they are trained in teaching methodology, and from the third week onwards they teach classes for 200-hour level students." },
      { title: "Pranayama",        body: "Practice of yogic pranayama (breath work) every day provides a solid foundation for increasing the pranic reserves within, using it positively to gain vitality at various levels and to be able to teach it skillfully in their classes." },
      { title: "Yoga Nidra & Meditation", body: "Yoga nidra and meditation are practised regularly to allow students to understand relaxation and meditation more deeply and to use them with confidence in their own teaching classes." },
      { title: "Yoga Anatomy",     body: "Students study the various anatomical and physiological concepts in correlation with the yogic practices, in order to have a deeper experience of in-class explanations, methodology, alignment in positions, demonstration, cues, correction and feedback techniques of teaching." },
      { title: "Yoga Philosophy",  body: "The in-depth study of the Yoga Sutras of Patanjali gives insights into yoga as a preventive medicine for various physical and mental disorders, forming a firm foundation for learning the therapeutic applications of yogic techniques. Hatha Yoga Pradipika is studied to learn the curative aspects of yoga and the correct classical techniques." },
      { title: "Mantra & Bhajans", body: "Mantra chanting and bhajans add a holistic experience to the course and make students able to use them in their class teachings more effectively." },
      { title: "Yoga Therapy & Diet", body: "Yoga therapy sessions provide detailed knowledge about pathological conditions related to several common disorders and how yoga can be used to restore health and well-being, along with the importance of a yogic diet suitable from physiological, mental and spiritual perspectives." },
    ],
    scheduleTitle: "Daily Schedule",
    scheduleNote:  "Program runs 7 to 8 hours a day (6 days per week). Class schedule may change according to the situation.",
    schedule: [
      { time: "06:00am – 07:00am", activity: "Pranayama, Kriyas & Meditation" },
      { time: "07:30am – 09:00am", activity: "Hatha Yoga Asana Practice" },
      { time: "09:00am – 09:30am", activity: "Tea Break & Breakfast Lectures" },
      { time: "09:30am – 10:30am", activity: "Yoga Principles & Philosophy" },
      { time: "10:30am – 11:30am", activity: "Anatomy Class" },
      { time: "11:30am – 12:30pm", activity: "Rest & Self Study" },
      { time: "01:00pm – 02:30pm", activity: "Lunch" },
      { time: "02:00pm – 03:30pm", activity: "Chanting, Meditation & Yoga Nidra" },
      { time: "04:00pm – 04:30pm", activity: "Refreshing Time, Tea Break With Snacks" },
      { time: "05:00pm – 06:30pm", activity: "Multi Style Yoga Practice (Vinyasa, Hatha, Iyengar Yoga)" },
      { time: "06:30pm – 07:30pm", activity: "Rest Time or Sharing Knowledge" },
      { time: "07:30pm – 08:30pm", activity: "Dinner Time" },
      { time: "08:30pm – 09:30pm", activity: "Kirtan or Deep Meditation" },
      { time: "10:00pm",           activity: "Lights Off" },
    ],
    feesTitle:       "Fees & Registration",
    registrationFee: "USD 200 (non-refundable)",
    fees:            STANDARD_FEES,
    feesNotes: [
      "Special discount available for groups.",
      "The booking amount due with the application is USD 200 (a non-refundable advance towards the course fee); the remaining fee needs to be paid on arrival.",
    ],
    datesTitle: "Upcoming Course Dates — Rishikesh, India",
    dates:      STANDARD_DATES,
    includesTitle: "Course Fee Includes",
    includes:      STANDARD_INCLUDES,
    accommodationTitle: "Our Accommodation",
    accommodation:      "In our 200 Hrs Hatha Yoga Teacher Training we promote a yogic lifestyle — vegetarian meals and herbal teas are served three times daily (breakfast / lunch / dinner), prepared in our own equipped kitchen using filtered water.",
    assistanceTitle:    "Assistance",
    assistanceNote:     "If you have any questions related to Registration, Payment, Visa or any other inquiry about our Yoga teacher training course, please contact us at:",
    assistanceEmail:    "support@shivayoganiketan.com",
    assistanceWhatsapp: "+91-7455855666",
    showCallbackForm:   true,
    teachers: [
      { name: "Angela Carbone", title: "Yoga Teacher & Therapist", photo: imgTeacher1, slug: "angela-carbone" },
      { name: "Lena Hart",      title: "Yoga Teacher & Therapist", photo: imgTeacher4, slug: "lena-hart"      },
      { name: "Meghan Conner",  title: "Yoga Teacher & Therapist", photo: imgTeacher2, slug: "meghan-conner"  },
    ],
  },
  {
    slug:    "200-hrs-vinyasa-yoga-teacher-training",
    title:   "200 Hrs Vinyasa Yoga Teacher Training",
    badge:   "Teacher Training · Certification",
    tagline: "A Yoga Alliance (USA) accredited training in the flowing, breath-linked art of Vinyasa — taught through the ancient Gurukul method in Rishikesh, India.",
    heroImg: imgP2046,
    introTitle: "200 Hour Vinyasa Yoga Teacher Training, Rishikesh India",
    introParas: [
      "Shiva Yoga Niketan's 200-hour Vinyasa Yoga Teacher Training program is accredited by Yoga Alliance (USA). Whether you are a beginner trainee or an experienced practitioner, you can enroll for this training program. Through the ancient Gurukul teaching method you will practise the vinyasa flow on a daily basis and make changes in your thought process by gaining spiritual experiences.",
      "Vinyasa is one of the most prominent contemporary styles of yoga, encompassing many sorts of practice — whether it is Ashtanga or Power Yoga. Vinyasa — also called 'flow' — means to organise something in a special way; for example, to improve the performance of the asanas through practice.",
      "The beginner's version of the vinyasa is Plank → Knees, Chest, Chin → Cobra → Downward-Facing Dog. The advanced version is Plank → Chaturanga Dandasana → Upward-Facing Dog → Downward-Facing Dog. When the instructor says 'go through the vinyasa at your own pace', they mean to do a plank, chaturanga, and upward-facing dog, using your breath to measure when to move on to the next pose.",
    ],
    learnTitle: "What the 200 Hours of Vinyasa Yoga Provides",
    learnPoints: [
      "Asana: In the morning, regular 4 hours of yoga exercises from Monday to Sunday, practising therapeutic postures and awakening the important points of the body. All information related to vinyasa will be given so that everyone can learn how to create their own vinyasa sequence.",
      "Pranayama: Through regular pranayama practice you will feel the source of energy within yourself and be able to use that inner energy positively in your life.",
      "Yoga nidra and meditation will also be taught to all students so they can understand the importance of relaxation and meditation with intensity and use it in their life with confidence.",
      "You will learn the principles of Vinyasa Yoga through yoga postures so you can share your experience with your students and make them aware of the rules, methodology, practices and science of yoga in their class.",
      "Mantras and bhajans will be included with daily yoga exercises so everyone can experience mental peace during the course.",
      "Yoga philosophy includes the study of the Yoga Sutras of Patanjali, so that yoga can be used for the prevention of physical and mental disorders. Hatha Yoga Pradipika will be studied to understand the curative aspects of classical Hatha Yoga.",
    ],
    topicsHeading: "200 Hour Vinyasa Yoga Teacher Training Syllabus",
    topics: [
      { title: "Asanas",           body: "Practice of the yogasanas consists of 4 hours each day from Monday to Saturday. Morning practice focuses on asanas with a therapeutic approach and opening the vital centers of the body. Students also practise the modified vinyasa flow and learn to create their own vinyasa sequences. In the evening practice they are trained in teaching methodology, and from the third week onwards they teach classes for 200-hour level students." },
      { title: "Pranayama",        body: "Practice of yogic pranayama (breath work) every day provides a solid foundation for increasing the pranic reserves within, using it positively to gain vitality at various levels and to be able to teach it skillfully in their classes." },
      { title: "Yoga Nidra & Meditation", body: "Yoga nidra and meditation are practised regularly to allow students to understand relaxation and meditation more deeply and to use them with confidence in their own teaching classes." },
      { title: "Yoga Anatomy",     body: "Students study the various anatomical and physiological concepts in correlation with the yogic practices, in order to have a deeper experience of in-class explanations, methodology, alignment in positions, demonstration, cues, correction and feedback techniques of teaching." },
      { title: "Yoga Philosophy",  body: "The in-depth study of the Yoga Sutras of Patanjali gives insights into yoga as a preventive medicine for various physical and mental disorders, forming a firm foundation for learning the therapeutic applications of yogic techniques. Hatha Yoga Pradipika is studied to learn the curative aspects of yoga and the correct classical techniques." },
      { title: "Mantra & Bhajans", body: "Mantra chanting and bhajans add a holistic experience to the course and make students able to use them in their class teachings more effectively." },
      { title: "Yoga Therapy & Diet", body: "Yoga therapy sessions provide detailed knowledge about pathological conditions related to several common disorders and how yoga can be used to restore health and well-being, along with the importance of a yogic diet suitable from physiological, mental and spiritual perspectives." },
    ],
    scheduleTitle: "Daily Schedule",
    scheduleNote:  "Program runs 7 to 8 hours a day (6 days per week). Class schedule may change according to the situation.",
    schedule: [
      { time: "06:00am – 07:00am", activity: "Pranayama, Kriyas & Meditation" },
      { time: "07:30am – 09:00am", activity: "Vinyasa Yoga / Fusion Yoga" },
      { time: "09:00am – 09:30am", activity: "Tea Break & Breakfast Lectures" },
      { time: "09:30am – 10:30am", activity: "Yoga Principles & Philosophy" },
      { time: "10:30am – 11:30am", activity: "Anatomy Class" },
      { time: "11:30am – 12:30pm", activity: "Rest & Self Study" },
      { time: "01:00pm – 02:30pm", activity: "Lunch" },
      { time: "02:00pm – 03:30pm", activity: "Chanting, Meditation & Yoga Nidra" },
      { time: "04:00pm – 04:30pm", activity: "Refreshing Time, Tea Break With Snacks" },
      { time: "05:00pm – 06:30pm", activity: "Multi Style Yoga Practice (Vinyasa, Hatha, Iyengar Yoga)" },
      { time: "06:30pm – 07:30pm", activity: "Rest Time or Sharing Knowledge" },
      { time: "07:30pm – 08:30pm", activity: "Dinner Time" },
      { time: "08:30pm – 09:30pm", activity: "Kirtan or Deep Meditation" },
      { time: "10:00pm",           activity: "Lights Off" },
    ],
    feesTitle:       "Fees & Registration",
    registrationFee: "USD 200 (non-refundable)",
    fees:            STANDARD_FEES,
    feesNotes: [
      "Special discount available for groups.",
      "The booking amount due with the application is USD 200 (a non-refundable advance towards the course fee); the remaining fee needs to be paid on arrival.",
    ],
    datesTitle: "Upcoming Course Dates — Rishikesh, India",
    dates:      STANDARD_DATES,
    includesTitle: "Course Fee Includes",
    includes:      STANDARD_INCLUDES,
    accommodationTitle: "Our Accommodation",
    accommodation:      "In our attempt to promote a yogic lifestyle, vegetarian meals and herbal teas are served three times daily (breakfast / lunch / dinner), prepared in our own equipped kitchen using filtered water.",
    assistanceTitle:    "Assistance",
    assistanceNote:     "If you have any questions related to Registration, Payment, Visa or any other inquiry about our Yoga teacher training course, please contact us at:",
    assistanceEmail:    "support@shivayoganiketan.com",
    assistanceWhatsapp: "+91-7455855666",
    showCallbackForm:   true,
    teachers: [
      { name: "Maya Tran",      title: "Yoga Teacher & Therapist", photo: imgTeacher5, slug: "maya-tran"      },
      { name: "Sofia Renner",   title: "Yoga Teacher & Therapist", photo: imgTeacher3, slug: "sofia-renner"   },
      { name: "Angela Carbone", title: "Yoga Teacher & Therapist", photo: imgTeacher1, slug: "angela-carbone" },
    ],
  },
  {
    slug:    "200-hrs-kundalini-yoga-teacher-training",
    title:   "200 Hrs Kundalini Yoga Teacher Training",
    badge:   "Teacher Training · Certification",
    tagline: "A Yoga Alliance (USA) accredited immersion into the science of Kundalini — awakening the divine energy within through practice, meditation and restraint.",
    heroImg: imgP2047,
    introTitle: "200 Hour Kundalini Yoga Teacher Training, Rishikesh India",
    introParas: [
      "The 200-hour teacher training program is accredited by Yoga Alliance (USA). The purpose of running this course is that students can acquire academic knowledge along with primary yoga practice and choose yoga as their profession. Yoga is a process of continuous learning and experience — we want you to walk on the path of Yoga and experience peace and fulfilment in your life. We encourage our students to know the progressive nature of traditional yoga and the science of Kundalini; the aim is not only physical practice, but to improve life by learning the principles of yoga science.",
      "About Kundalini — The Kundalini is a divine power, located like a serpent at the lower point of the body. As long as it stays there, the person continues to run towards worldly subjects; but when it awakens, a spiral wave seems to rise upward — a very divine experience. There are seven chakras in our body: besides the Muladhara, the six Kundalini chakras are Swadhisthana, Manipura, Anahata, Vishuddha, Ajna and Sahasrara.",
      "One end of the Kundalini rests on the Muladhara chakra, while the other is wrapped around the spinal cord; as it moves upward, its purpose is to reach the seventh chakra, Sahasrara. If the person abandons restraint and meditation, this cycle can stop at any chakra. Continuous yoga practice, meditation and restraint can be utilised to awaken the Kundalini, and in our program all the important rules and principles for awakening it will be explained. Kundalini Yoga has had a great influence on the systems of Tantra and the Shakta community.",
    ],
    learnTitle: "What the 200 Hours of Kundalini Yoga Provides",
    learnPoints: [
      "Asana: In the morning, regular 4 hours of yoga exercises from Monday to Sunday, practising therapeutic postures and awakening the important points of the body. All information related to vinyasa will be given so that everyone can learn how to create their own sequence.",
      "Pranayama: Through regular pranayama practice you will feel the source of energy within yourself and be able to use that inner energy positively in your life.",
      "Yoga nidra and meditation will also be taught to all students so they can understand the importance of relaxation and meditation with intensity and use it in their life with confidence.",
      "You will learn the principles of Kundalini Yoga through yoga postures so you can share your experience with your students and make them aware of the rules, methodology, practices and science of yoga in their class.",
      "Mantras and bhajans will be included with daily yoga exercises so everyone can experience mental peace during the course.",
      "Yoga philosophy includes the study of the Yoga Sutras of Patanjali, so that yoga can be used for the prevention of physical and mental disorders. Hatha Yoga Pradipika will be studied to understand the curative aspects of classical Hatha Yoga.",
    ],
    topicsHeading: "200 Hour Kundalini Yoga Teacher Training Syllabus",
    topics: [
      { title: "Asanas",           body: "Practice of the yogasanas consists of 4 hours each day from Monday to Saturday. Morning practice focuses on asanas with a therapeutic approach and opening the vital centers of the body. Students also practise the modified vinyasa flow and learn to create their own sequences. In the evening practice they are trained in teaching methodology, and from the third week onwards they teach classes for 200-hour level students." },
      { title: "Pranayama",        body: "Practice of yogic pranayama (breath work) every day provides a solid foundation for increasing the pranic reserves within, using it positively to gain vitality at various levels and to be able to teach it skillfully in their classes." },
      { title: "Yoga Nidra & Meditation", body: "Yoga nidra and meditation are practised regularly to allow students to understand relaxation and meditation more deeply and to use them with confidence in their own teaching classes." },
      { title: "Yoga Anatomy",     body: "Students study the various anatomical and physiological concepts in correlation with the yogic practices, in order to have a deeper experience of in-class explanations, methodology, alignment in positions, demonstration, cues, correction and feedback techniques of teaching." },
      { title: "Yoga Philosophy",  body: "The in-depth study of the Yoga Sutras of Patanjali gives insights into yoga as a preventive medicine for various physical and mental disorders, forming a firm foundation for learning the therapeutic applications of yogic techniques. Hatha Yoga Pradipika is studied to learn the curative aspects of yoga and the correct classical techniques." },
      { title: "Mantra & Bhajans", body: "Mantra chanting and bhajans add a holistic experience to the course and make students able to use them in their class teachings more effectively." },
      { title: "Yoga Therapy & Diet", body: "Yoga therapy sessions provide detailed knowledge about pathological conditions related to several common disorders and how yoga can be used to restore health and well-being, along with the importance of a yogic diet suitable from physiological, mental and spiritual perspectives." },
    ],
    scheduleTitle: "Daily Schedule",
    scheduleNote:  "Program runs 7 to 8 hours a day (6 days per week). Class schedule may change according to the situation.",
    schedule: [
      { time: "06:00am – 07:00am", activity: "Pranayama, Kriyas & Meditation" },
      { time: "07:30am – 09:00am", activity: "Vinyasa Yoga / Fusion Yoga" },
      { time: "09:00am – 09:30am", activity: "Tea Break & Breakfast Lectures" },
      { time: "09:30am – 10:30am", activity: "Yoga Principles & Philosophy" },
      { time: "10:30am – 11:30am", activity: "Anatomy Class" },
      { time: "11:30am – 12:30pm", activity: "Rest & Self Study" },
      { time: "01:00pm – 02:30pm", activity: "Lunch" },
      { time: "02:00pm – 03:30pm", activity: "Chanting, Meditation & Yoga Nidra" },
      { time: "04:00pm – 04:30pm", activity: "Refreshing Time, Tea Break With Snacks" },
      { time: "05:00pm – 06:30pm", activity: "Multi Style Yoga Practice (Vinyasa, Hatha, Iyengar Yoga)" },
      { time: "06:30pm – 07:30pm", activity: "Rest Time or Sharing Knowledge" },
      { time: "07:30pm – 08:30pm", activity: "Dinner Time" },
      { time: "08:30pm – 09:30pm", activity: "Kirtan or Deep Meditation" },
      { time: "10:00pm",           activity: "Lights Off" },
    ],
    feesTitle:       "Fees & Registration",
    registrationFee: "USD 200 (non-refundable)",
    fees:            STANDARD_FEES,
    feesNotes: [
      "Special discount available for groups.",
      "The booking amount due with the application is USD 200 (a non-refundable advance towards the course fee); the remaining fee needs to be paid on arrival.",
    ],
    datesTitle: "Upcoming Course Dates — Rishikesh, India",
    dates:      STANDARD_DATES,
    includesTitle: "Course Fee Includes",
    includes:      STANDARD_INCLUDES,
    accommodationTitle: "Our Accommodation",
    accommodation:      "In our attempt to promote a yogic lifestyle, vegetarian meals and herbal teas are served three times daily (breakfast / lunch / dinner), prepared in our own equipped kitchen using filtered water.",
    assistanceTitle:    "Assistance",
    assistanceNote:     "If you have any questions related to Registration, Payment, Visa or any other inquiry about our Yoga teacher training course, please contact us at:",
    assistanceEmail:    "support@shivayoganiketan.com",
    assistanceWhatsapp: "+91-7455855666",
    showCallbackForm:   true,
    teachers: [
      { name: "Priya Sharma",   title: "Yoga Teacher & Therapist", photo: imgTeacher6, slug: "priya-sharma"   },
      { name: "Maya Tran",      title: "Yoga Teacher & Therapist", photo: imgTeacher5, slug: "maya-tran"      },
      { name: "Angela Carbone", title: "Yoga Teacher & Therapist", photo: imgTeacher1, slug: "angela-carbone" },
    ],
  },
];

// Arrow icon used in sidebar list
function ArrowSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
      <path d={svgPaths.p7c7a380} fill="#151515" />
    </svg>
  );
}

// Section heading
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[24px] sm:text-[36px] lg:text-[52px] tracking-[-1px] lg:tracking-[-2px] leading-[1.1]">
      {children}
    </h2>
  );
}

// Bullet marker
function Bullet() {
  return <span className="mt-[9px] w-[7px] h-[7px] rounded-full bg-[#074240] shrink-0" />;
}

// Accordion item
function AccordionRow({ item, isOpen, onToggle }: { item: AccordionItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="flex flex-col w-full">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left py-2 gap-4"
      >
        <span className={`font-['Marcellus:Regular',sans-serif] text-[18px] sm:text-[22px] lg:text-[26px] tracking-[-0.5px] leading-[1.3] ${isOpen ? "text-[#074240]" : "text-[#151515]"}`}>
          {item.title}
        </span>
        <div className={`w-[18px] h-[10px] relative shrink-0 transition-transform duration-300 ${isOpen ? "" : "rotate-180"}`}>
          <svg className="block w-full h-full" fill="none" viewBox="0 0 18.2426 10.6213">
            <path d={svgPaths.p22282f80} stroke="#074240" strokeLinecap="square" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7] pb-4">
          {item.body}
        </p>
      )}
      <div className="w-full h-px bg-[#8b8a82] opacity-40" />
    </div>
  );
}

// Request-a-callback form
function CallbackForm({ courses }: { courses: string[] }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", course: "", mobile: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bot = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    setSending(true); setSendError(null);
    const res = await submitForm("Callback request", { ...form, botcheck: bot });
    setSending(false);
    if (res.ok) setSent(true); else setSendError(res.error);
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputCls =
    "w-full bg-white rounded-[10px] px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none placeholder:text-[#8b8a82] border border-transparent focus:border-[#074240]";

  if (sent) {
    return (
      <div className="bg-[#c3dbc5] rounded-[20px] p-7 lg:p-[50px] flex flex-col gap-3 items-center text-center">
        <p className="font-['Marcellus:Regular',sans-serif] text-[#074240] text-[24px] lg:text-[32px]">Thank you!</p>
        <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] leading-[1.6] max-w-[420px]">
          Your callback request has been received. Our team will get in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#c3dbc5] rounded-[20px] p-7 lg:p-[50px] flex flex-col gap-5">
      <SectionHeading>Request a Callback</SectionHeading>
      <form
        className="flex flex-col gap-[10px]"
        onSubmit={onSubmit}
      >
        <input required value={form.name} onChange={set("name")} type="text" placeholder="Your Name (required)" className={inputCls} />
        <input required value={form.email} onChange={set("email")} type="email" placeholder="Your Email (required)" className={inputCls} />
        <SelectMenu
          required
          value={form.course}
          onChange={(v) => setForm((f) => ({ ...f, course: v }))}
          placeholder="— Please choose an option —"
          options={courses.map((c) => ({ label: c, value: c }))}
          triggerClassName={inputCls}
        />
        <input required value={form.mobile} onChange={set("mobile")} type="tel" placeholder="Your Mobile (required)" className={inputCls} />
        <textarea value={form.message} onChange={set("message")} placeholder="Your Message" rows={4} className={`${inputCls} resize-none`} />
        <Honeypot />
        <FormError message={sendError} />
        <button type="submit" disabled={sending} className="w-full bg-[#074240] rounded-full py-4 font-['Lato:Medium',sans-serif] text-white text-[14px] lg:text-[16px] hover:opacity-90 transition-opacity mt-1 disabled:opacity-60">
          {sending ? "Sending…" : "Send Request"}
        </button>
      </form>
    </div>
  );
}

// Teacher card
function TeacherCard({ teacher }: { teacher: ProgramTeacher }) {
  return (
    <Link to={`/teachers/${teacher.slug}`} className="flex flex-col rounded-[20px] overflow-hidden bg-white flex-1 min-w-[160px] group">
      <div className="h-[200px] sm:h-[240px] relative overflow-hidden">
        <img
          src={teacher.photo}
          alt={teacher.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 lg:p-[30px] flex flex-col gap-1">
        <p className="font-['Lato:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[18px] leading-[1.6]">{teacher.name}</p>
        <p className="font-['Marcellus:Regular',sans-serif] text-[#434a4a] text-[13px] lg:text-[16px] leading-[1.5]">{teacher.title}</p>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
// ── Content source: Sanity when published, otherwise the built-in ALL_PROGRAMS ──
const HERO_FALLBACKS = [imgP2044, imgP2045, imgP2046, imgP2047];
const TEACHER_FALLBACKS = [imgTeacher1, imgTeacher2, imgTeacher3, imgTeacher4, imgTeacher5, imgTeacher6];

export function useProgramList(): ProgramData[] {
  const { programs } = useCms();
  return useMemo(
    () =>
      programs
        ? programs.map((p, i) => ({
            ...p,
            heroImg: p.heroImg ?? HERO_FALLBACKS[i % HERO_FALLBACKS.length],
            teachers: p.teachers.map((t, j) => ({ ...t, photo: t.photo ?? TEACHER_FALLBACKS[j % TEACHER_FALLBACKS.length] })),
          }))
        : ALL_PROGRAMS,
    [programs],
  );
}

export default function ProgramDetailPage() {
  const params = useParams();
  const programs = useProgramList();
  // Unknown slug → real 404 (prevents "soft 404" duplicate pages in Google).
  if (!programs.some((p) => p.slug === params.slug)) return <NotFoundPage />;
  return <ProgramDetail key={params.slug} slugParam={params.slug!} programs={programs} />;
}

function ProgramDetail({ slugParam, programs }: { slugParam: string; programs: ProgramData[] }) {

  const idx  = programs.findIndex((p) => p.slug === slugParam);
  const prog = programs[idx >= 0 ? idx : 0];
  const prev = idx > 0 ? programs[idx - 1] : null;
  const next = idx < programs.length - 1 ? programs[idx + 1] : null;

  const [openIdx, setOpenIdx] = useState<number>(0);

  // Real per-course title/description + Course rich-result schema.
  const desc = prog.tagline.length > 158 ? prog.tagline.slice(0, 155).replace(/\s+\S*$/, "") + "…" : prog.tagline;
  usePageMeta({ title: prog.seo?.metaTitle || `${prog.title} in Rishikesh | ${SITE.name}`, description: prog.seo?.metaDescription || desc });
  const priceMatch = (prog.dates?.[0]?.price ?? "").match(/([A-Z]{3})\s*([\d,]+)/);
  useJsonLd("syn-course-schema", {
    "@context": "https://schema.org",
    "@type": "Course",
    name: prog.title,
    description: prog.tagline,
    url: absUrl(`/programs/${prog.slug}`),
    provider: { "@type": "Organization", name: SITE.name, sameAs: SITE.url },
    inLanguage: "en",
    ...(priceMatch ? { offers: { "@type": "Offer", category: "Paid", priceCurrency: priceMatch[1], price: priceMatch[2].replace(/,/g, ""), url: absUrl("/appointment") } } : {}),
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "Onsite", location: { "@type": "Place", name: SITE.name, address: `${SITE.street}, ${SITE.city}, ${SITE.region}, India` } },
  });

  const courseNames = programs.map((p) => p.title);

  return (
    <div className="bg-[#f8f3ed]">

      {/* ── Hero card ── */}
      <section className="px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6">
        <div className="bg-white rounded-[20px] overflow-hidden flex flex-col md:flex-row">
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-[80px] xl:px-[100px] py-10 lg:py-[80px] gap-6 lg:gap-[50px]">
            <div className="flex flex-col gap-4 lg:gap-5">
              <span className="inline-flex self-start bg-[#c3dbc5] rounded-full px-3 py-1 font-['Lato:SemiBold',sans-serif] text-[#151515] text-[11px] lg:text-[12px] tracking-[1px] uppercase">
                {prog.badge}
              </span>
              <h1 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[36px] sm:text-[56px] lg:text-[70px] xl:text-[90px] tracking-[-2px] lg:tracking-[-4px] leading-[1.05]">
                {prog.title}
              </h1>
            </div>
            <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7] max-w-[520px]">
              {prog.tagline}
            </p>
          </div>

          <div className="hidden md:block relative w-[44%] shrink-0 min-h-[340px] lg:min-h-[520px]">
            <img {...LCP}
              src={prog.heroImg}
              alt={prog.title}
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <img
              src={imgTexture}
              alt=""
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-10 pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* ── Main 2-col layout ── */}
      <section className="py-10 sm:py-14 lg:py-[80px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-[60px] xl:gap-[100px] items-start">

          {/* ── Left sidebar ── */}
          <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0 flex flex-col gap-5 lg:gap-[40px] lg:sticky lg:top-6">

            <div className="bg-[#c3dbc5] rounded-[20px] p-7 lg:p-[40px] flex flex-col gap-6 lg:gap-[30px]">
              <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[18px] tracking-[1px] uppercase text-center">
                Our Programs
              </p>
              <div className="flex flex-col gap-4 lg:gap-5">
                {programs.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/programs/${p.slug}`}
                    className="flex items-center justify-between group"
                  >
                    <span className={`font-['Lato:Regular',sans-serif] text-[14px] lg:text-[16px] leading-[1.6] transition-colors ${p.slug === prog.slug ? "text-[#074240]" : "text-[#151515] group-hover:text-[#074240]"}`}>
                      {p.title}
                    </span>
                    <ArrowSmall />
                  </Link>
                ))}
              </div>
            </div>

            {/* Book a Consultation */}
            <div className="bg-white rounded-[20px] p-6 lg:p-[40px] flex flex-col gap-4">
              <p className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[18px] tracking-[1px] uppercase text-center">
                Book a Consultation:
              </p>
              <div className="flex flex-col gap-[5px]">
                <input type="text" placeholder="Your Full Name" className="w-full bg-[#f8f3ed] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none placeholder:text-[#8b8a82]" />
                <input type="tel" placeholder="Your Phone" className="w-full bg-[#f8f3ed] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none placeholder:text-[#8b8a82]" />
                <input type="date" className="w-full bg-[#f8f3ed] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none" />
                <input type="time" className="w-full bg-[#f8f3ed] rounded-full px-5 py-3.5 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] outline-none" />
                <Link to="/appointment" className="w-full bg-[#c3dbc5] rounded-full py-4 font-['Lato:Medium',sans-serif] text-[#151515] text-[14px] lg:text-[16px] hover:opacity-90 transition-opacity mt-1 text-center">
                  Book Now
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right main content ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-12 lg:gap-[70px]">

            {/* Intro section */}
            <div className="flex flex-col gap-5 lg:gap-[30px]">
              <h2 className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[28px] sm:text-[40px] lg:text-[56px] tracking-[-1px] lg:tracking-[-2px] leading-[1.1]">
                {prog.introTitle}
              </h2>
              {prog.introParas.map((para, i) => (
                <p key={i} className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.8]">
                  {para}
                </p>
              ))}
              <Link
                to={`/appointment?course=${encodeURIComponent(prog.title)}`}
                className="inline-flex self-start bg-[#074240] rounded-full px-8 py-4 font-['Lato:Medium',sans-serif] text-white text-[14px] lg:text-[16px] hover:opacity-90 transition-opacity mt-2"
              >
                Register Now
              </Link>
            </div>

            {/* What You Will Learn (bulleted paragraphs) */}
            {prog.learnPoints && prog.learnPoints.length > 0 && (
              <div className="flex flex-col gap-5 lg:gap-[30px]">
                <SectionHeading>{prog.learnTitle ?? "What You Will Learn"}</SectionHeading>
                <ul className="flex flex-col gap-4">
                  {prog.learnPoints.map((pt, i) => (
                    <li key={i} className="flex gap-3">
                      <Bullet />
                      <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7]">{pt}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Syllabus / topics accordion */}
            {prog.topics && prog.topics.length > 0 && (
              <div className="flex flex-col gap-5 lg:gap-[30px]">
                <SectionHeading>{prog.topicsHeading ?? "Course Curriculum"}</SectionHeading>
                <div className="flex flex-col gap-4">
                  {prog.topics.map((item, i) => (
                    <AccordionRow
                      key={item.title}
                      item={item}
                      isOpen={openIdx === i}
                      onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Ethics & Behaviour */}
            {prog.ethicsPoints && prog.ethicsPoints.length > 0 && (
              <div className="flex flex-col gap-5 lg:gap-[30px]">
                <SectionHeading>{prog.ethicsTitle ?? "Ethics and Behaviour"}</SectionHeading>
                <ul className="flex flex-col gap-4">
                  {prog.ethicsPoints.map((pt, i) => (
                    <li key={i} className="flex gap-3">
                      <Bullet />
                      <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.7]">{pt}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Daily Schedule table */}
            {prog.schedule && prog.schedule.length > 0 && (
              <div className="flex flex-col gap-5 lg:gap-[30px]">
                <SectionHeading>{prog.scheduleTitle ?? "Daily Schedule"}</SectionHeading>
                {prog.scheduleNote && (
                  <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[16px] leading-[1.6]">{prog.scheduleNote}</p>
                )}
                <div className="rounded-[20px] overflow-hidden border border-[#e8e0d8]">
                  <div className="flex bg-[#074240] text-white">
                    <div className="w-[42%] sm:w-[38%] px-4 sm:px-5 py-3.5 font-['Lato:SemiBold',sans-serif] text-[13px] lg:text-[15px]">Time</div>
                    <div className="flex-1 px-4 sm:px-5 py-3.5 font-['Lato:SemiBold',sans-serif] text-[13px] lg:text-[15px]">Schedule</div>
                  </div>
                  {prog.schedule.map((row, i) => (
                    <div key={i} className={`flex ${i % 2 === 0 ? "bg-white" : "bg-[#f8f3ed]"}`}>
                      <div className="w-[42%] sm:w-[38%] px-4 sm:px-5 py-3 font-['Lato:Medium',sans-serif] text-[#151515] text-[13px] lg:text-[15px] leading-[1.5]">{row.time}</div>
                      <div className="flex-1 px-4 sm:px-5 py-3 font-['Lato:Regular',sans-serif] text-[#434a4a] text-[13px] lg:text-[15px] leading-[1.5]">{row.activity}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fees & Registration */}
            {prog.fees && prog.fees.length > 0 && (
              <div className="flex flex-col gap-5 lg:gap-[30px]">
                <SectionHeading>{prog.feesTitle ?? "Fees & Registration"}</SectionHeading>
                <div className="bg-white rounded-[20px] p-6 lg:p-[40px] flex flex-col gap-4 border border-[#e8e0d8]">
                  {prog.registrationFee && (
                    <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#e8e0d8]">
                      <span className="font-['Lato:SemiBold',sans-serif] text-[#151515] text-[15px] lg:text-[18px]">Registration Fee</span>
                      <span className="font-['Marcellus:Regular',sans-serif] text-[#074240] text-[16px] lg:text-[20px]">{prog.registrationFee}</span>
                    </div>
                  )}
                  {prog.fees.map((fee, i) => (
                    <div key={i} className="flex items-center justify-between gap-4">
                      <span className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[15px] lg:text-[18px]">{fee.label}</span>
                      <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[20px]">{fee.price}</span>
                    </div>
                  ))}
                  {prog.feesNotes && prog.feesNotes.length > 0 && (
                    <div className="flex flex-col gap-1.5 pt-3 mt-1 border-t border-[#e8e0d8]">
                      {prog.feesNotes.map((n, i) => (
                        <p key={i} className="font-['Lato:Regular',sans-serif] text-[#8b8a82] text-[13px] lg:text-[15px] leading-[1.6]">{n}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Upcoming Dates */}
            {prog.dates && prog.dates.length > 0 && (
              <div className="flex flex-col gap-5 lg:gap-[30px]">
                <SectionHeading>{prog.datesTitle ?? "Upcoming Course Dates"}</SectionHeading>
                <div className="flex flex-col gap-3">
                  {prog.dates.map((d, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 bg-white rounded-[16px] px-5 lg:px-7 py-4 border border-[#e8e0d8]">
                      <span className="flex-1 font-['Lato:Medium',sans-serif] text-[#151515] text-[14px] lg:text-[17px]">{d.period}</span>
                      <span className="font-['Marcellus:Regular',sans-serif] text-[#074240] text-[15px] lg:text-[18px] sm:w-[100px]">{d.price}</span>
                      <Link to={`/appointment?course=${encodeURIComponent(prog.title)}&date=${encodeURIComponent(d.period)}`} className="inline-flex justify-center bg-[#c3dbc5] rounded-full px-6 py-2.5 font-['Lato:Medium',sans-serif] text-[#151515] text-[13px] lg:text-[15px] hover:bg-[#074240] hover:text-white transition-colors">
                        Book Now
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Fee Includes */}
            {prog.includes && prog.includes.length > 0 && (
              <div className="flex flex-col gap-5 lg:gap-[30px]">
                <SectionHeading>{prog.includesTitle ?? "Course Fee Includes"}</SectionHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {prog.includes.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <Bullet />
                      <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.6]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accommodation */}
            {prog.accommodation && (
              <div className="flex flex-col gap-4 lg:gap-[20px]">
                <SectionHeading>{prog.accommodationTitle ?? "Our Accommodation"}</SectionHeading>
                <p className="font-['Lato:Regular',sans-serif] text-[#434a4a] text-[14px] lg:text-[18px] leading-[1.8]">{prog.accommodation}</p>
              </div>
            )}

            {/* Callback form */}
            {prog.showCallbackForm && <CallbackForm courses={courseNames} />}

            {/* Assistance */}
            {(prog.assistanceEmail || prog.assistanceWhatsapp) && (
              <div className="bg-[#074240] rounded-[20px] p-7 lg:p-[50px] flex flex-col gap-4 text-white">
                <p className="font-['Marcellus:Regular',sans-serif] text-[24px] lg:text-[32px]">{prog.assistanceTitle ?? "Assistance"}</p>
                {prog.assistanceNote && (
                  <p className="font-['Lato:Regular',sans-serif] text-white/80 text-[14px] lg:text-[16px] leading-[1.7]">{prog.assistanceNote}</p>
                )}
                <div className="flex flex-col gap-2 mt-1">
                  {prog.assistanceEmail && (
                    <a href={`mailto:${prog.assistanceEmail}`} className="font-['Lato:Medium',sans-serif] text-[#c3dbc5] text-[15px] lg:text-[18px] hover:text-white transition-colors">
                      E-mail: {prog.assistanceEmail}
                    </a>
                  )}
                  {prog.assistanceWhatsapp && (
                    <a href={`https://wa.me/${prog.assistanceWhatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" className="font-['Lato:Medium',sans-serif] text-[#c3dbc5] text-[15px] lg:text-[18px] hover:text-white transition-colors">
                      WhatsApp: {prog.assistanceWhatsapp}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Teachers section */}
            <div className="flex flex-col gap-5 lg:gap-[40px]">
              <SectionHeading>Program Teachers</SectionHeading>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-[20px]">
                {prog.teachers.map((t) => (
                  <TeacherCard key={t.slug} teacher={t} />
                ))}
              </div>
              <Link to="/teachers" className="flex items-center gap-2 self-start">
                <span className="font-['Lato:Medium',sans-serif] text-[#1e1b1b] text-[14px] lg:text-[16px]">View More</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d={svgPaths.p29f60cc0} fill="#151515" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Prev / Next ── */}
      <section className="pb-12 lg:pb-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-6">
          {prev ? (
            <Link to={`/programs/${prev.slug}`} className="flex items-center gap-4 group">
              <div className="w-[50px] h-[50px] rounded-full bg-[#C3DBC5] flex items-center justify-center shrink-0 group-hover:bg-[#074240] transition-colors rotate-180">
                <svg width="16" height="16" viewBox="0 0 50 50" fill="none">
                  <path d={svgPaths.pb429800} fill="#074240" />
                </svg>
              </div>
              <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[24px] group-hover:text-[#074240] transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/programs/${next.slug}`} className="flex items-center gap-4 group">
              <span className="font-['Marcellus:Regular',sans-serif] text-[#151515] text-[16px] lg:text-[24px] group-hover:text-[#074240] transition-colors text-right">
                {next.title}
              </span>
              <div className="w-[50px] h-[50px] rounded-full bg-[#C3DBC5] flex items-center justify-center shrink-0 group-hover:bg-[#074240] transition-colors">
                <svg width="16" height="16" viewBox="0 0 50 50" fill="none">
                  <path d={svgPaths.pb429800} fill="#074240" />
                </svg>
              </div>
            </Link>
          ) : <div />}
        </div>
      </section>

    </div>
  );
}
