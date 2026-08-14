'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { courses } from '@/data/courses';
import { getCurrentUser } from '@/lib/auth-helpers';
import { Calendar, Clock, User, Phone, BookOpen, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCourse = searchParams.get('course') || '';

  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState(preselectedCourse || courses[0]?.name || 'JEE Preparation');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');

  const [userId, setUserId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Check user logged in status
    const loadUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.id);
        if (user.full_name) setStudentName(user.full_name);
        if (user.email) setEmail(user.email);
      }
    };
    loadUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSuccess(false);

    if (!studentName.trim() || !phone.trim() || !preferredDate) {
      setErrorMsg('Please fill in all required fields.');
      setSubmitting(false);
      return;
    }

    const bookingData = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `demo-${Date.now()}`,
      student_name: studentName,
      phone: phone,
      email: email || 'student@example.com',
      course: course,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      status: 'pending',
      user_id: userId,
      created_at: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          phone,
          email,
          course,
          preferredDate,
          preferredTime,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create booking.');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: any) {
      console.error('Booking error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10">
      {success ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">
            Enrollment Submitted Successfully!
          </h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Thank you, <span className="font-semibold text-slate-900">{studentName}</span>. Our counselor will contact you at <span className="font-semibold text-slate-900">{phone}</span> to confirm your session.
          </p>
          <p className="text-xs text-indigo-600 font-medium">
            Redirecting to your student dashboard...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Student Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Nayem Sheikh"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-900"
              />
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1712 345678"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-900"
              />
            </div>
          </div>

          {/* Course Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Select Course <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <BookOpen className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-900"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.category}) - ৳{c.fees.toLocaleString('en-BD')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preferred Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Preferred Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  required
                  value={preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Preferred Time Slot <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Morning', 'Afternoon', 'Evening'] as const).map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setPreferredTime(slot)}
                    className={`py-3 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                      preferredTime === slot
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Booking Your Demo...
              </>
            ) : (
              <>Enroll Now</>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
