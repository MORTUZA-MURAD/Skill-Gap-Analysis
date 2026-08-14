import React from 'react';
import Image from 'next/image';
import { Teacher } from '@/data/teachers';
import { Award, Briefcase, GraduationCap, Phone, Mail } from 'lucide-react';

interface TeacherCardProps {
  teacher: Teacher;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center text-center group">
      {/* Avatar Image */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 border-4 border-indigo-50 shadow-md group-hover:border-indigo-100 transition-colors">
        <Image
          src={teacher.photo}
          alt={teacher.name}
          fill
          sizes="(max-width: 640px) 96px, 112px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Name and Subject */}
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
        {teacher.name}
      </h3>
      <p className="text-sm font-semibold text-indigo-600 mb-3">{teacher.subject}</p>

      {/* Badges for Qualification & Experience */}
      <div className="flex flex-wrap justify-center gap-2 mb-4 text-xs">
        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
          {teacher.qualification}
        </span>
        <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md font-semibold flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
          {teacher.experience} Exp.
        </span>
      </div>

      {/* Bio */}
      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {teacher.bio}
      </p>

      {/* Contact Info */}
      <div className="w-full space-y-2 mb-4">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium">{teacher.phone}</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
          <Mail className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium">{teacher.email}</span>
        </div>
      </div>

      {/* Key achievement */}
      {teacher.achievements && (
        <div className="mt-auto w-full pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50/60 py-1.5 px-3 rounded-lg">
          <Award className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{teacher.achievements}</span>
        </div>
      )}
    </div>
  );
};

export default TeacherCard;
