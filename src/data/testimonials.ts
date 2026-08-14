export interface Testimonial {
  id?: number;
  name: string;
  result: string;
  course: string;
  photo: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
  id: 1,
  name: "Mahmudul Hasan",
  result: "Software Engineer at Brain Station 23",
  course: "Software Engineering & Computer Science",
  photo: "https://picsum.photos/seed/student1/300/300",
  text: "The practical programming sessions, real-world projects, and career guidance helped me build strong development skills and secure my first software engineering job.",
},
{
  id: 2,
  name: "Nusrat Jahan",
  result: "Junior Electrical Engineer at DESCO",
  course: "Electrical & Electronic Engineering (EEE)",
  photo: "https://picsum.photos/seed/student2/300/300",
  text: "The hands-on laboratory classes and experienced instructors gave me the confidence and technical knowledge to start my career as an electrical engineer.",
},
{
  id: 3,
  name: "Sabbir Ahmed",
  result: "Food Quality Control Officer at PRAN-RFL Group",
  course: "Food Engineering",
  photo: "https://picsum.photos/seed/student3/300/300",
  text: "The practical food processing labs, industry-focused curriculum, and internship support prepared me for a successful career in the food industry.",
},
];
