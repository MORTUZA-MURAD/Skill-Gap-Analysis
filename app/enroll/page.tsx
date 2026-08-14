import React, { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function EnrollPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>100% Free Trial • No Credit Card Required</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Enroll in Your Preferred Course
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Take the next step toward your academic goals at Daffodil Smart City (DSC), Birulia, Savar, Dhaka-1216. Choose your preferred course and start your journey with us.
        </p>
      </div>

      {/* Booking Form Component */}
      <Suspense fallback={<div className="text-center text-slate-500 text-sm">Loading form...</div>}>
        <BookingForm />
      </Suspense>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-600 pt-4">
        <div className="flex items-center gap-2 bg-white p-3.5 rounded-xl border border-slate-200/80">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Instant SMS & Email Confirmation</span>
        </div>
        <div className="flex items-center gap-2 bg-white p-3.5 rounded-xl border border-slate-200/80">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>1-on-1 Academic Counseling</span>
        </div>
        <div className="flex items-center gap-2 bg-white p-3.5 rounded-xl border border-slate-200/80">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Free Printed Sample Study Module</span>
        </div>
      </div>
    </div>
  );
}
