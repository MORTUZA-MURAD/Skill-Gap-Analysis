'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, UserSession } from '@/lib/auth-helpers';
import StatusBadge from '@/components/StatusBadge';
import {
  ShieldCheck,
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Search,
  Sparkles,
  MessageSquare,
  Send,
  Inbox,
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
  admin_notes?: string;
  replied_at?: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  reply?: string;
  status?: string;
  replied_at?: string;
  created_at: string;
}

type Tab = 'bookings' | 'contacts';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(null);
  const [updatingContactId, setUpdatingContactId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bookings', {
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
      console.error('Admin fetch error:', err);
    }

    const defaultAdminBookings: Booking[] = [
      {
        id: 'b-101',
        student_name: 'Ruhul Amin',
        phone: '+880 1712 111223',
        email: 'ruhul@gmailcom',
        course: 'SWE Preparation',
        preferred_date: '2025-08-05',
        preferred_time: 'Morning',
        status: 'pending',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'b-102',
        student_name: 'Priya',
        phone: '+880 1611 998877',
        email: 'priya@gmail.com',
        course: 'NFE Preparation',
        preferred_date: '2025-08-04',
        preferred_time: 'Afternoon',
        status: 'approved',
        created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
      },
      {
        id: 'b-103',
        student_name: 'Rohan',
        phone: '+880 1515 665544',
        email: 'rohan@gmail.com',
        course: 'EEE',
        preferred_date: '2025-08-03',
        preferred_time: 'Evening',
        status: 'completed',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: 'b-104',
        student_name: 'Ratul',
        phone: '+880 1818 443322',
        email: 'ratul@gmail.com',
        course: 'Computer Science',
        preferred_date: '2025-08-02',
        preferred_time: 'Morning',
        status: 'rejected',
        created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
    ];

    setBookings(defaultAdminBookings);
    setLoading(false);
  };

  const fetchAllContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        cache: 'no-store',
      });

      const data = await res.json();
      if (res.ok && data.data) {
        const formatted = data.data.map((c: any) => ({
          ...c,
          id: String(c.id),
        }));
        setContacts(formatted);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error('Admin fetch contacts error:', err);
    }

    const defaultContacts: ContactMessage[] = [
      {
        id: 'c-101',
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        phone: '+880 1712 111223',
        message: 'I want to know about JEE batch timings and fees.',
        status: 'pending',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'c-102',
        name: 'Sneha Patel',
        email: 'sneha@example.com',
        phone: '+880 1611 998877',
        message: 'Can I get a scholarship for NEET preparation?',
        status: 'replied',
        reply: 'Yes, we have merit-based scholarships. Please visit the center.',
        replied_at: new Date(Date.now() - 86400000).toISOString(),
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
    ];

    setContacts(defaultContacts);
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        router.push('/login?redirect=/admin');
        return;
      }

      if (currentUser.role !== 'admin' && !currentUser.email.toLowerCase().includes('admin')) {
        router.push('/dashboard');
        return;
      }

      setUser(currentUser);
      await fetchAllBookings();
    };

    init();
  }, [router]);

  useEffect(() => {
    if (activeTab === 'contacts' && contacts.length === 0) {
      fetchAllContacts();
    }
  }, [activeTab]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingBookingId(id);

    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update status.');
      }

      const updated = bookings.map((b) =>
        b.id === id ? { ...b, status: newStatus, replied_at: data.data?.replied_at || b.replied_at } : b
      );
      setBookings(updated);
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingBookingId(null);
    }
  };

  const handleBookingNotesChange = async (id: string, notes: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, admin_notes: notes } : b));
  };

  const saveBookingNotes = async (id: string) => {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    setUpdatingBookingId(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admin_notes: booking.admin_notes }),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save notes.');
      }

      const updated = bookings.map((b) =>
        b.id === id ? { ...b, replied_at: data.data?.replied_at || b.replied_at } : b
      );
      setBookings(updated);
    } catch (err) {
      console.error('Failed to save notes:', err);
    } finally {
      setUpdatingBookingId(null);
    }
  };

  const handleContactReply = async (id: string, reply: string, status: string) => {
    setUpdatingContactId(id);

    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply, status }),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send reply.');
      }

      const updated = contacts.map((c) =>
        c.id === id ? { ...c, reply, status, replied_at: data.data?.replied_at || c.replied_at } : c
      );
      setContacts(updated);
    } catch (err) {
      console.error('Failed to send reply:', err);
    } finally {
      setUpdatingContactId(null);
    }
  };

  if (loading && activeTab === 'bookings') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
        <p className="text-sm font-semibold text-slate-600">Loading Admin Portal...</p>
      </div>
    );
  }

  // Dashboard Metrics
  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const approvedCount = bookings.filter((b) => b.status === 'approved').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;
  const rejectedCount = bookings.filter((b) => b.status === 'rejected').length;
  const newestBooking = bookings[0];
  const pendingContacts = contacts.filter((c) => c.status !== 'replied').length;

  const filteredBookings = bookings.filter(
    (b) =>
      b.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery)
  );

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> Administrative Access
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Admin Dashboard
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Manage student demo bookings, reply to contact messages, and review workloads.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => {
              if (activeTab === 'bookings') fetchAllBookings();
              else fetchAllContacts();
            }}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-sm w-fit">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'bookings'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Demo Bookings
          {pendingCount > 0 && (
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
              activeTab === 'bookings' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
            }`}>
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'contacts'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Contact Messages
          {pendingContacts > 0 && (
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
              activeTab === 'contacts' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
            }`}>
              {pendingContacts}
            </span>
          )}
        </button>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">
            Total Bookings
          </span>
          <span className="text-2xl font-black text-slate-900">{totalCount}</span>
        </div>

        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/80 shadow-xs">
          <span className="text-xs text-amber-800 font-semibold uppercase tracking-wider block mb-1">
            Pending
          </span>
          <span className="text-2xl font-black text-amber-900">{pendingCount}</span>
        </div>

        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/80 shadow-xs">
          <span className="text-xs text-emerald-800 font-semibold uppercase tracking-wider block mb-1">
            Approved
          </span>
          <span className="text-2xl font-black text-emerald-900">{approvedCount}</span>
        </div>

        <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200/80 shadow-xs">
          <span className="text-xs text-blue-800 font-semibold uppercase tracking-wider block mb-1">
            Completed
          </span>
          <span className="text-2xl font-black text-blue-900">{completedCount}</span>
        </div>

        <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200/80 shadow-xs">
          <span className="text-xs text-rose-800 font-semibold uppercase tracking-wider block mb-1">
            Rejected
          </span>
          <span className="text-2xl font-black text-rose-900">{rejectedCount}</span>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xs col-span-2 md:col-span-1 lg:col-span-1">
          <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block mb-1">
            Newest Request
          </span>
          <span className="text-xs font-bold text-slate-100 block truncate">
            {newestBooking ? newestBooking.student_name : 'N/A'}
          </span>
          <span className="text-[10px] text-slate-400 block truncate">
            {newestBooking ? newestBooking.course : 'No requests yet'}
          </span>
        </div>
      </div>

      {/* SEARCH & TABLE SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900">
            {activeTab === 'bookings'
              ? `All Student Demo Bookings (${filteredBookings.length})`
              : `Contact Messages (${filteredContacts.length})`}
          </h2>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === 'bookings' ? 'Search bookings...' : 'Search messages...'}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {activeTab === 'bookings' && (
          <>
            {filteredBookings.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                No matching bookings found.
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                      <th className="p-3.5">Student Name</th>
                      <th className="p-3.5">Phone / Contact</th>
                      <th className="p-3.5">Course</th>
                      <th className="p-3.5">Pref. Date & Slot</th>
                      <th className="p-3.5">Current Status</th>
                      <th className="p-3.5">Update Status</th>
                      <th className="p-3.5">Admin Notes</th>
                      <th className="p-3.5">Requested On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">
                          {b.student_name}
                          {b.email && (
                            <span className="block text-[11px] font-normal text-slate-500">
                              {b.email}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-slate-700 font-semibold">
                          {b.phone}
                        </td>
                        <td className="p-3.5 font-medium text-slate-800">
                          {b.course}
                        </td>
                        <td className="p-3.5 text-slate-700 font-medium whitespace-nowrap">
                          {b.preferred_date}
                          <span className="ml-1 text-[11px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded-md">
                            {b.preferred_time}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <StatusBadge status={b.status} />
                        </td>
                        <td className="p-3.5">
                          {updatingBookingId === b.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                          ) : (
                            <select
                              value={b.status.toLowerCase()}
                              onChange={(e) => handleStatusChange(b.id, e.target.value)}
                              className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="completed">Completed</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          )}
                        </td>
                        <td className="p-3.5">
                          <div className="space-y-1.5">
                            <textarea
                              value={b.admin_notes || ''}
                              onChange={(e) => handleBookingNotesChange(b.id, e.target.value)}
                              placeholder="Add notes for student..."
                              rows={2}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 resize-none"
                            />
                            <button
                              onClick={() => saveBookingNotes(b.id)}
                              disabled={updatingBookingId === b.id}
                              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-md text-[10px] font-bold flex items-center gap-1 transition-colors"
                            >
                              {updatingBookingId === b.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Send className="w-3 h-3" />
                              )}
                              Save
                            </button>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-500 text-xs whitespace-nowrap">
                          {new Date(b.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {activeTab === 'contacts' && (
          <>
            {filteredContacts.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                No contact messages found.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContacts.map((c) => (
                  <div key={c.id} className="border border-slate-100 rounded-xl p-5 space-y-4 hover:bg-slate-50/80 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                          <span className="text-[10px] text-slate-500 font-medium">{c.email}</span>
                          <span className="text-[10px] text-slate-500 font-medium">{c.phone}</span>
                        </div>
                        <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                          {c.message}
                        </p>
                        <span className="text-[10px] text-slate-400">
                          Received: {new Date(c.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <div className="shrink-0">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold ${
                          c.status === 'replied'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {c.status === 'replied' ? 'Replied' : 'Pending'}
                        </span>
                      </div>
                    </div>

                    {c.status === 'replied' && c.reply && (
                      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 space-y-1">
                        <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Your Reply</span>
                        <p className="text-xs text-indigo-900 font-medium">{c.reply}</p>
                        {c.replied_at && (
                          <span className="text-[10px] text-indigo-500">
                            Replied on: {new Date(c.replied_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2">
                      <textarea
                        defaultValue={c.reply || ''}
                        id={`reply-${c.id}`}
                        placeholder="Type your reply here..."
                        rows={2}
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 resize-none"
                      />
                      <div className="flex sm:flex-col gap-2">
                        <button
                          onClick={() => {
                            const textarea = document.getElementById(`reply-${c.id}`) as HTMLTextAreaElement | null;
                            const replyText = textarea?.value?.trim();
                            if (!replyText) return;
                            handleContactReply(c.id, replyText, 'replied');
                          }}
                          disabled={updatingContactId === c.id}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          {updatingContactId === c.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Send className="w-3.5 h-3.5" />
                          )}
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
