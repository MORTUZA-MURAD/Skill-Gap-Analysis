import React from 'react';
import Image from 'next/image';
import { Testimonial } from '@/data/testimonials';
import { Quote, Trophy } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between relative hover:shadow-lg transition-all duration-300">
      <Quote className="absolute top-5 right-5 w-8 h-8 text-indigo-100/80 -z-0" />

      {/* Testimonial text */}
      <div className="relative z-10 mb-6">
        <p className="text-slate-700 italic text-sm sm:text-base leading-relaxed">
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>

      {/* Student Details */}
      <div className="relative z-10 flex items-center gap-4 pt-4 border-t border-slate-100">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-200 shrink-0">
          <Image
            src={testimonial.photo}
            alt={testimonial.name}
            fill
            sizes="48px"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-slate-900 text-sm truncate">
            {testimonial.name}
          </h4>
          <p className="text-xs text-indigo-600 font-medium truncate">
            {testimonial.course}
          </p>

          <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
            <Trophy className="w-3 h-3 text-amber-500" />
            {testimonial.result}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
