import React from 'react';
import Link from 'next/link';
import { institute } from '@/data/institute';
import { teachers } from '@/data/teachers';
import TeacherCard from '@/components/TeacherCard';
import {
  GraduationCap,
  Target,
  Compass,
  History as HistoryIcon,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
            About {institute.name}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Nurturing Ranks & Shaping Futures Since 2024
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Skill Gap Analysis is committed to concept clarity, personal mentorship, and career excellence at Daffodil Smart City (DSC), Birulia, Savar, Dhaka-1216.
          </p>
        </div>
      </section>

      {/* Mission, Vision & History Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {institute.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Our Vision</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {institute.vision}
            </p>
          </div>

          {/* History */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HistoryIcon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">14+ Years Legacy</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {institute.history}
            </p>
          </div>
        </div>
      </section>

      {/* Achievement Statistics */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Our Journey in Numbers
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Proven results across competitive entrance exams and skill-building cohorts.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {institute.stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                <div className="text-4xl font-black text-amber-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Faculty Spotlight
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Meet Our Key Educators
          </h2>
          <p className="text-slate-600 text-sm">
            Learn directly from subject specialists dedicated to making difficult subjects simple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.slice(0, 3).map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-50 rounded-3xl p-8 sm:p-10 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Experience the Skill Gap Analysis Teaching Methodology
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Attend a live class, inspect study materials, and consult with our subject heads.
            </p>
          </div>
          <Link
            href="/enroll"
            className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shrink-0 shadow-md transition-all flex items-center gap-2"
          >
            Enroll Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
