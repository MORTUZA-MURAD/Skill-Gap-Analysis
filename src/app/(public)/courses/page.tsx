import React from 'react';
import Link from 'next/link';
import { courses } from '@/data/courses';
import CourseCard from '@/components/CourseCard';
import { BookOpen, Calendar } from 'lucide-react';

export default function CoursesPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Page Header */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-400/20">
            Targeted Exam & Skill Batches
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Our Regular & Crash Courses
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            All courses feature daily speed tests, doubt solving sessions, study modules, and full-length test series.
          </p>
        </div>
      </section>

      {/* Courses List Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Per-Course Syllabus Sections */}
      {courses.map((course) => (
        <section key={course.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{course.name} Syllabus</h2>
                <p className="text-sm text-slate-500">{course.category} • {course.duration}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.syllabus?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center pt-6 border-t border-slate-100">
              <Link
                href="/enroll"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
              >
                <Calendar className="w-4 h-4" />
                Enroll Now
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
