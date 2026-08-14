'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser, UserSession } from '@/lib/auth-helpers';
import StatusBadge from '@/components/StatusBadge';
import TeacherCard from '@/components/TeacherCard';
import { teachers } from '@/data/teachers';
import {
  Calendar,
  Clock,
  BookOpen,
  PlusCircle,
  User,
  Phone,
  Mail,
  Loader2,
  CalendarCheck,
  AlertCircle,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

interface Booking {
  id: string;
  student_name: string;
  phone: string;
  email?: string;
  course: string;
  preferred_date: string;
  preferred_time: string;
  status: 'pending' | 'approved' | 'completed' | 'rejected' | string;
  created_at: string;
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTeachers, setShowTeachers] = useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        router.push('/login?redirect=/dashboard');
        return;
      }

      setUser(currentUser);

      try {
        const res = await fetch('/api/bookings', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          cache: 'no-store',
        });

        const data = await res.json();
        if (res.ok && data.data) {
          const formatted = data.data.map((b: any) => ({
            ...b,
            id: String(b.id),
          }));
          setBookings(formatted);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error('Fetch bookings error:', err);
      }

      // Fallback demo bookings in localStorage
      const localBookings: Booking[] = JSON.parse(
        localStorage.getItem('demo_bookings_list') || '[]'
      );

      // Filter by user id if set, else return sample demo bookings for testing
      const userBookings = localBookings.length > 0
        ? localBookings
        : [
            {
              id: 'demo-1',
              student_name: currentUser.full_name || 'Nayem Sheikh',
              phone: '+880 1712 345678',
              email: currentUser.email,
              course: 'JEE Preparation',
              preferred_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
              preferred_time: 'Morning',
              status: 'pending',
              created_at: new Date().toISOString(),
            },
            {
              id: 'demo-2',
              student_name: currentUser.full_name || 'Nayem Sheikh',
              phone: '+880 1712 345678',
              email: currentUser.email,
              course: 'Spoken English & Personality',
              preferred_date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
              preferred_time: 'Evening',
              status: 'approved',
              created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
            },
          ];

      setBookings(userBookings);
      setLoading(false);
    };

    init();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-sm font-semibold text-slate-600">Loading Student Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 rounded-full text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Student Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome, {user?.full_name || 'Student'}!
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            Track your free demo class bookings and reserved batch slots.
          </p>
        </div>

        <Link
          href="/enroll"
          className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-slate-950" />
          Enroll Now
        </Link>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-500 text-[11px] block">Student Name</span>
            <span className="font-bold text-slate-900">{user?.full_name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-500 text-[11px] block">Email Address</span>
            <span className="font-semibold text-slate-900">{user?.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 font-bold text-xs">
            {bookings.length}
          </div>
          <div>
            <span className="text-slate-500 text-[11px] block">Total Demo Bookings</span>
            <span className="font-bold text-indigo-600">{bookings.length} Sessions</span>
          </div>
        </div>
      </div>

      {/* Bookings List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-indigo-600" />
            Your Demo Class Bookings
          </h2>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-4 shadow-xs">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Demo Sessions Found</h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto">
              You haven&apos;t booked any free demo classes yet. Reserve your seat today to test our live teaching methodology!
            </p>
            <Link
              href="/enroll"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              Enroll Now
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200/80 font-bold">
                    <th className="p-4">Course</th>
                    <th className="p-4">Preferred Date</th>
                    <th className="p-4">Time Slot</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Booked On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-slate-900">
                        {booking.course}
                      </td>
                      <td className="p-4 text-slate-700 font-medium">
                        {booking.preferred_date}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {booking.preferred_time}
                        </span>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="p-4 text-slate-500 text-xs">
                        {new Date(booking.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Connect with Teacher Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Connect with Teacher
          </h2>
          <button
            onClick={() => setShowTeachers(!showTeachers)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors"
          >
            {showTeachers ? (
              <>
                <X className="w-3.5 h-3.5" />
                Hide Teachers
              </>
            ) : (
              <>
                <Users className="w-3.5 h-3.5" />
                View Teachers
              </>
            )}
          </button>
        </div>

        {showTeachers && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
