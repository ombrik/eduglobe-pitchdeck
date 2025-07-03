// data/professions.js

export const professions = [
  // DIGITAL/IT
  {
    id: "frontend",
    title: "Frontend Developer",
    desc: "Building interfaces for modern web and mobile applications.",
    duration: "2-3 years",
    degree: "Junior Software Engineer Diploma",
    area: "Digital", // 👈 Category (can be filtered/grouped)
    subjects: [
      { id: "html", title: "HTML & CSS" },
      { id: "js", title: "JavaScript/React" },
      { id: "uiux", title: "UI/UX Design" },
      { id: "portfolio", title: "Final Project/Portfolio" }
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketer",
    desc: "Online promotion, analytics, paid campaigns.",
    duration: "2 years",
    degree: "Digital Marketing Diploma",
    area: "Digital",
    subjects: [
      { id: "strategy", title: "Marketing Strategies" },
      { id: "smm", title: "SMM and Advertising" },
      { id: "seo", title: "SEO and Analytics" },
      { id: "final", title: "Practical Course & Final Test" }
    ]
  },

  // UNIVERSITY/TRADITIONAL
  {
    id: "psychology",
    title: "Psychology (Bachelor's)",
    desc: "A classical university program. Preparation of psychology professionals.",
    duration: "4 years",
    degree: "Bachelor of Psychology",
    area: "University Education",
    subjects: [
      { id: "general-psych", title: "General Psychology" },
      { id: "child-psych", title: "Child Psychology" },
      { id: "clinical-psych", title: "Clinical Psychology" },
      { id: "research", title: "Research Methodology" }
    ]
  },
  {
    id: "medicine",
    title: "Medicine (General Practitioner)",
    desc: "Training general physicians. A classic medical program.",
    duration: "6 years",
    degree: "Doctor of Medicine (Bachelor/Specialist)",
    area: "University Education",
    subjects: [
      { id: "anatomy", title: "Anatomy" },
      { id: "therapy", title: "Therapy" },
      { id: "surgery", title: "Surgery" },
      { id: "internship", title: "Clinical Practice" }
    ]
  },
  {
    id: "law",
    title: "Law (Bachelor's)",
    desc: "A fundamental program for training legal professionals.",
    duration: "4 years",
    degree: "Bachelor of Law",
    area: "University Education",
    subjects: [
      { id: "civil-law", title: "Civil Law" },
      { id: "criminal-law", title: "Criminal Law" },
      { id: "international-law", title: "International Law" },
      { id: "practice", title: "Practice & Internship" }
    ]
  },
  {
    id: "business-admin",
    title: "Business Administration",
    desc: "Management, finance, business processes.",
    duration: "2-4 years",
    degree: "Bachelor of Business Administration",
    area: "University Education",
    subjects: [
      { id: "management", title: "Management" },
      { id: "finance", title: "Finance" },
      { id: "marketing", title: "Marketing" },
      { id: "law", title: "Fundamentals of Law" }
    ]
  },

  // EXAMPLES FOR EXPANSION
  // {
  //   id: "philology",
  //   title: "Philology (Bachelor's)",
  //   desc: "Study of language, literature, and culture.",
  //   duration: "4 years",
  //   degree: "Bachelor of Philology",
  //   area: "University Education",
  //   subjects: [
  //     { id: "linguistics", title: "Linguistics" },
  //     { id: "literature", title: "Literature" },
  //     { id: "translation", title: "Translation" },
  //     { id: "teaching", title: "Teaching" }
  //   ]
  // },
  // {
  //   id: "pharmacy",
  //   title: "Pharmacy",
  //   desc: "Training of specialists in pharmaceutical sciences.",
  //   duration: "5 years",
  //   degree: "Pharmacist Diploma",
  //   area: "University Education",
  //   subjects: [
  //     { id: "chemistry", title: "Organic Chemistry" },
  //     { id: "pharmacology", title: "Pharmacology" },
  //     { id: "practice", title: "Pharmacy Practice" }
  //   ]
  // }
];
