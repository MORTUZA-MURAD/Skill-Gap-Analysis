import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { institute } from '@/data/institute';
import { courses } from '@/data/courses';
import { teachers } from '@/data/teachers';
import { testimonials } from '@/data/testimonials';
import CourseCard from '@/components/CourseCard';
import TeacherCard from '@/components/TeacherCard';
import TestimonialCard from '@/components/TestimonialCard';
import {
  Calendar,
  CheckCircle2,
  Award,
  Users,
  BookOpen,
  ArrowRight,
  PhoneCall,
  Sparkles,
  GraduationCap,
  Star,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const featuredCourses = courses.slice(0, 6);
  const featuredTeachers = teachers.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-900 text-white pt-12 sm:pt-20 pb-20 sm:pb-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Admissions Open for 2026-2027 Batches</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
                Check Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-indigo-300">Skill Gap</span> Now
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Identify your strengths, discover your skill gaps, and receive a personalized learning roadmap from industry experts. Whether you're studying Software Engineering, Computer Science, Electrical & Electronic Engineering (EEE), Civil Engineering, Food Engineering, or English, our Skill Gap Analysis Program helps you build the practical skills employers value and prepares you for a successful career.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/enroll"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5 text-slate-950" />
                  Enroll Now
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </Link>

                <Link
                  href="/courses"
                  className="w-full sm:w-auto px-7 py-4 bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-base rounded-2xl border border-slate-700 hover:border-slate-600 transition-all text-center"
                >
                  Explore All Courses
                </Link>
              </div>

              {/* Highlights List */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-300 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Small Batch Sizes (Max 35)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Daily Doubt Clearing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Skill Progress Tests</span>
                </div>
              </div>

              <p className="text-center text-sm text-slate-300 pt-2">Check your skill gap through our chatbot.</p>
            </div>

            {/* Hero Right Visual Banner */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl backdrop-blur-xl">
                <div className="absolute -top-4 -right-4 bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-slate-950" /> 100% Free Trial
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-white text-lg">
                        {institute.name}
                      </h2>
                      <p className="text-xs text-indigo-300 font-medium">
                        {institute.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Target Programs:</span>
                      <span className="text-amber-300 font-bold">2026-2027</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
                      <span className="bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-800">SWE</span>
                      <span className="bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-800">CSE</span>
                      <span className="bg-amber-950 text-amber-300 px-2.5 py-1 rounded-md border border-amber-800">EEE</span>
                      <span className="bg-blue-950 text-blue-300 px-2.5 py-1 rounded-md border border-blue-800">NFE</span>
                      <span className="bg-purple-950 text-purple-300 px-2.5 py-1 rounded-md border border-purple-800">Civil</span>
                    </div>
                  </div>

                  <div className="pt-2 text-center">
                    <Link
                      href="/enroll"
                      className="inline-flex items-center justify-center w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all gap-2"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      Enroll Now
                    </Link>
                </div>
              </div>

              <p className="text-center text-sm text-slate-300 pt-2">Check your skill gap through our chatbot.</p>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTE STATISTICS SECTION */}
      <section className="-mt-16 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {institute.stats.map((stat, idx) => (
            <div key={idx} className={`pt-4 lg:pt-0 ${idx > 0 ? 'lg:pl-6' : ''}`}>
              <div className="text-3xl sm:text-4xl font-black text-indigo-600 tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Our Key Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Popular Exam Prep & Skill Courses
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Expertly designed curricula targeting high scoring ranks and practical real-world skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md"
          >
            View All Courses & Detailed Syllabi
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-amber-700 text-xs font-bold uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Hall of Fame
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Student Success Stories
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Hear directly from our toppers who turned their dreams into top ranks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Mentors & Educators
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Learn From Subject Experts
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Dedicated educators with 10+ years of proven mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-bold text-sm hover:underline"
          >
            Meet Full Faculty & Institute Leadership
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CONTACT CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left z-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Start Your Success Journey?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Enroll in your preferred course or visit our main center at Daffodil Smart City (DSC), Birulia, Savar, Dhaka-1216. Our career counselors are ready to help you choose the right path.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 z-10 w-full md:w-auto">
            <Link
              href="/enroll"
              className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl text-center transition-all shadow-md"
            >
              Enroll Now
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl text-center border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              Contact Center
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
