// src/data/subjects.js
export const subjectsData = {
  frontend: [
    {
      id: "html",
      title: "HTML & CSS",
      lessons: ["html1", "html2", "html3"],
      tests: [{ afterLesson: "html2", id: "htmlTest1" }],
      exam: "htmlExam"
    },
    {
      id: "js",
      title: "JavaScript/React",
      lessons: ["js1", "js2", "js3", "js4"],
      tests: [{ afterLesson: "js2", id: "jsTest1" }, { afterLesson: "js4", id: "jsTest2" }],
      exam: "jsExam"
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      lessons: ["uiux1", "uiux2"],
      tests: [],
      exam: "uiuxExam"
    },
    {
      id: "portfolio",
      title: "Final Project/Portfolio",
      lessons: ["portfolio1"],
      tests: [],
      exam: null // no exam required here
    }
  ],

  "digital-marketing": [
    {
      id: "strategy",
      title: "Marketing Strategies",
      lessons: ["strategy1", "strategy2"],
      tests: [{ afterLesson: "strategy2", id: "strategyTest1" }],
      exam: "strategyExam"
    },
    {
      id: "smm",
      title: "SMM and Advertising",
      lessons: ["smm1", "smm2"],
      tests: [{ afterLesson: "smm2", id: "smmTest1" }],
      exam: "smmExam"
    },
    {
      id: "seo",
      title: "SEO and Analytics",
      lessons: ["seo1", "seo2"],
      tests: [{ afterLesson: "seo2", id: "seoTest1" }],
      exam: "seoExam"
    },
    {
      id: "final",
      title: "Practical Course & Final Test",
      lessons: ["final1"],
      tests: [],
      exam: null
    }
  ],

  "business-admin": [
    {
      id: "management",
      title: "Management",
      lessons: ["management1", "management2"],
      tests: [{ afterLesson: "management2", id: "managementTest1" }],
      exam: "managementExam"
    },
    {
      id: "finance",
      title: "Finance",
      lessons: ["finance1"],
      tests: [],
      exam: "financeExam"
    },
    {
      id: "marketing",
      title: "Marketing",
      lessons: ["marketing1"],
      tests: [],
      exam: "marketingExam"
    },
    {
      id: "law",
      title: "Fundamentals of Law",
      lessons: ["law1"],
      tests: [],
      exam: "lawExam"
    }
  ],
  // University programs:

  psychology: [
    {
      id: "general-psych",
      title: "General Psychology",
      lessons: ["gp1", "gp2", "gp3"],
      tests: [{ afterLesson: "gp3", id: "gpTest1" }],
      exam: "generalPsychExam"
    },
    {
      id: "child-psych",
      title: "Child Psychology",
      lessons: ["cp1", "cp2"],
      tests: [{ afterLesson: "cp2", id: "cpTest1" }],
      exam: "childPsychExam"
    },
    {
      id: "clinical-psych",
      title: "Clinical Psychology",
      lessons: ["clp1"],
      tests: [{ afterLesson: "clp1", id: "clpTest1" }],
      exam: "clinicalPsychExam"
    },
    {
      id: "research",
      title: "Research Methodology",
      lessons: ["r1", "r2"],
      tests: [{ afterLesson: "r2", id: "rTest1" }],
      exam: "researchExam"
    }
  ],

  medicine: [
    {
      id: "anatomy",
      title: "Anatomy",
      lessons: ["anat1", "anat2", "anat3"],
      tests: [{ afterLesson: "anat3", id: "anatTest1" }],
      exam: "anatomyExam"
    },
    {
      id: "therapy",
      title: "Therapy",
      lessons: ["ther1", "ther2"],
      tests: [{ afterLesson: "ther2", id: "therTest1" }],
      exam: "therapyExam"
    },
    {
      id: "surgery",
      title: "Surgery",
      lessons: ["sur1"],
      tests: [{ afterLesson: "sur1", id: "surTest1" }],
      exam: "surgeryExam"
    },
    {
      id: "internship",
      title: "Clinical Practice",
      lessons: ["intern1"],
      tests: [],
      exam: null // practical module, no exam required
    }
  ],

  law: [
    {
      id: "civil-law",
      title: "Civil Law",
      lessons: ["civ1", "civ2"],
      tests: [{ afterLesson: "civ2", id: "civTest1" }],
      exam: "civilLawExam"
    },
    {
      id: "criminal-law",
      title: "Criminal Law",
      lessons: ["crim1", "crim2"],
      tests: [{ afterLesson: "crim2", id: "crimTest1" }],
      exam: "criminalLawExam"
    },
    {
      id: "international-law",
      title: "International Law",
      lessons: ["intl1"],
      tests: [{ afterLesson: "intl1", id: "intlTest1" }],
      exam: "intlLawExam"
    },
    {
      id: "practice",
      title: "Practice & Internship",
      lessons: ["prac1"],
      tests: [],
      exam: null
    }
  ]
};
