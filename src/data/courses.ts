export interface Course {
  id: number;
  name: string;
  category: string;
  duration: string;
  fees: number;
  description: string;
  batchTimings: string[];
  seats: number;
  highlight: string;
  syllabus?: string[];
}

export const courses: Course[] = [
  {
    id: 1,
    name: "Software Engineering",
    category: "Engineering",
    duration: "12 Months",
    fees: 25000,
    description:
      "Complete preparation for SWE & Advanced with daily practice tests, doubt sessions, and rank booster modules.",
    batchTimings: [
      "8:00 AM - 9:00 AM",
      "4:00 PM - 6:00 PM",
    ],
    seats: 30,
    highlight: "500+ IIT selections in 2024",
    syllabus: [
      "Web-Development: HTML, CSS, JavaScript, React & Node.js",
      "Cybersecurity: Network Security, Ethical Hacking, Cryptography",
      "Data Structures & Algorithms: Arrays, Linked Lists, Trees, Graphs, Sorting & Searching",
    ]
  },
  {
    id: 2,
    name: "Computer Science",
    category: "Computer Science",
    duration: "12 Months",
    fees: 28000,
    description:
      "Intensive Computer-Science coaching for CS Students with high-yield biological diagrams, mock exams, and speed accuracy drills.",
    batchTimings: [
      "8:00 AM - 10:30 AM",
      "3:00 PM - 5:30 PM",
    ],
    seats: 35,
    highlight: "200+ CS qualifiers in 2024",
    syllabus: [
      "Data-Science: Python, R, SQL, Machine Learning & AI",
      "Physics: Mechanics, Optics, Thermodynamics",
      "Chemistry: Organic Mechanisms, Periodic Table, Electrochemistry"
    ]
  },
  {
  id: 3,
  name: "Electrical Engineering",
  category: "Engineering",
  duration: "6 Months",
  fees: 15000,
  description:
    "Comprehensive Electrical Engineering course covering electrical circuits, power systems, machines, electronics, and industrial applications with practical lab sessions.",
  batchTimings: [
    "9:30 AM - 11:30 AM",
    "5:00 PM - 7:00 PM",
  ],
  seats: 40,
  highlight: "350+ selections in CGL/CHSL",
  syllabus: [
    "Basic Electrical Circuits & Network Analysis",
    "Electrical Machines & Transformers",
    "Power Generation, Transmission & Distribution",
    "Electrical Measurements & Industrial Safety"
  ]
},
{
  id: 4,
  name: "Civil Engineering",
  category: "Engineering",
  duration: "6 Months",
  fees: 16000,
  description:
    "A practical Civil Engineering course covering structural design, surveying, construction materials, transportation, and environmental engineering.",
  batchTimings: [
    "8:00 AM - 10:00 AM",
    "4:00 PM - 6:00 PM",
  ],
  seats: 35,
  highlight: "280+ Bank PO & Clerk Selections",
  syllabus: [
    "Engineering Mechanics & Strength of Materials",
    "Surveying & Geomatics",
    "Construction Materials & Building Technology",
    "Transportation & Environmental Engineering"
  ]
},
{
  id: 5,
  name: "Food Engineering",
  category: "Engineering",
  duration: "3 Months",
  fees: 6000,
  description:
    "Learn food processing, preservation techniques, quality control, packaging, and food safety standards with practical industrial applications.",
  batchTimings: [
    "10:00 AM - 11:30 AM",
    "6:00 PM - 7:30 PM",
  ],
  seats: 25,
  highlight: "100% Practical Speaking & GD Sessions",
  syllabus: [
    "Food Chemistry & Microbiology",
    "Food Processing & Preservation",
    "Food Packaging & Storage Technology",
    "Quality Assurance & Food Safety Standards"
  ]
},
{
  id: 6,
  name: "English Language",
  category: "Language",
  duration: "6 Months",
  fees: 8500,
  description:
    "Develop strong English communication skills through grammar, vocabulary, speaking, writing, listening, and presentation practice.",
  batchTimings: [
    "11:00 AM - 1:00 PM",
    "3:00 PM - 5:00 PM",
  ],
  seats: 20,
  highlight: "ISO Certified Certificate & Practical Lab Access",
  syllabus: [
    "English Grammar & Sentence Structure",
    "Vocabulary Building & Reading Comprehension",
    "Speaking, Listening & Presentation Skills",
    "Academic Writing & Professional Communication"
  ]
}
];
