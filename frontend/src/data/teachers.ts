export interface Teacher {
  id: number;
  name: string;
  subject: string;
  experience: string;
  qualification: string;
  photo: string;
  bio: string;
  achievements: string;
  phone: string;
  email: string;
}

export const teachers: Teacher[] = [
  {
  id: 1,
  name: "Dr. Md. Hasan Mahmud",
  subject: "Software Engineering & Computer Science",
  experience: "12 years",
  qualification: "Ph.D. in Computer Science, M.Sc. in Software Engineering",
  photo: "https://picsum.photos/seed/teacher1/300/300",
  bio: "Experienced faculty member specializing in Software Engineering, Data Structures, Algorithms, Web Development, and Artificial Intelligence with a strong focus on practical learning.",
  achievements: "500+ graduates working in leading IT companies",
  phone: "+880 1712 111111",
  email: "hasan@example.com",
  },
  {
  id: 2,
  name: "Prof. Nusrat Jahan",
  subject: "Electrical & Electronic Engineering (EEE)",
  experience: "8 years",
  qualification: "M.Sc. in Electrical & Electronic Engineering",
  photo: "https://picsum.photos/seed/teacher2/300/300",
  bio: "Dedicated EEE educator with expertise in electrical circuits, power systems, control engineering, and renewable energy technologies.",
  achievements: "300+ successful engineering graduates",
  phone: "+880 1611 222222",
  email: "nusrat@example.com",
  },
  {
  id: 3,
  name: "Dr. Ahmed Faisal",
  subject: "Food Engineering",
  experience: "10 years",
  qualification: "Ph.D. in Food Engineering, M.Sc. in Food Technology",
  photo: "https://picsum.photos/seed/teacher3/300/300",
  bio: "Specialist in food processing, food safety, quality assurance, packaging technology, and modern food preservation techniques with extensive research experience.",
  achievements: "150+ research publications and industry collaborations",
  phone: "+880 1515 333333",
  email: "ahmed@example.com",
  },
  {
  id: 4,
  name: "Ms. Emily Carter",
  subject: "English Language & Communication",
  experience: "7 years",
  qualification: "M.A. in English Literature, TESOL Certified",
  photo: "https://picsum.photos/seed/teacher4/300/300",
  bio: "Passionate English instructor focusing on grammar, academic writing, spoken English, presentation skills, and professional communication.",
  achievements: "1000+ students improved English proficiency",
  phone: "+880 1818 444444",
  email: "emily@example.com",
  },
  ];
