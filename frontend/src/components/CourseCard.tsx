'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Course } from '@/data/courses';
import { Clock, Users, IndianRupee, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [showSyllabus, setShowSyllabus] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
      <div className="p-6">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
            {course.category}
          </span>
          {course.seats && (
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              {course.seats} Seats / Batch
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
          {course.name}
        </h3>

        {/* Highlight if available */}
        {course.highlight && (
          <p className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-3 flex items-center gap-1.5 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {course.highlight}
          </p>
        )}

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3">
          {course.description}
        </p>

        {/* Syllabus */}
        {course.syllabus && course.syllabus.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowSyllabus(!showSyllabus)}
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-800 transition-colors mb-2"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {showSyllabus ? 'Hide Syllabus' : 'View Syllabus'}
              {showSyllabus ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
            {showSyllabus && (
              <ul className="space-y-1.5 pl-1">
                {course.syllabus.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Batch timings if provided */}
        {course.batchTimings && course.batchTimings.length > 0 && (
          <div className="mb-4 pt-3 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
              Available Batches:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {course.batchTimings.map((time, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                >
                  {time}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Fees, Duration & Action */}
      <div className="bg-slate-50/80 px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-4 mt-auto">
        <div>
          <div className="flex items-center text-xs text-slate-500 gap-1 font-medium mb-0.5">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </div>
          <div className="text-lg font-extrabold text-slate-900 flex items-center">
            ৳{course.fees.toLocaleString('en-BD')}
            <span className="text-xs font-normal text-slate-500 ml-1">/ course</span>
          </div>
        </div>

        <Link
          href={`/enroll?course=${encodeURIComponent(course.name)}`}
          className="inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all hover:scale-[1.02] shrink-0"
        >
          Enroll Now
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
