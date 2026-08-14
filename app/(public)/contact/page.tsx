'use client';

import React, { useState } from 'react';
import { institute } from '@/data/institute';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSuccess(false);

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Please fill in all fields.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      console.error('Contact error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Page Header */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Contact Skill Gap Analysis
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Have questions about batches, fees, or demo schedules? Visit our Daffodil Smart City center or leave us a message below.
          </p>
        </div>
      </section>

      {/* Main Form & Details Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Details Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                Institute Information
              </h2>

              <ul className="space-y-5 text-sm">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Campus Address</h3>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                      {institute.address}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Phone & WhatsApp</h3>
                    <p className="text-slate-600 text-xs mt-0.5">
                      {institute.phone.join(' / ')}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Email Support</h3>
                    <p className="text-slate-600 text-xs mt-0.5">
                      {institute.email}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Office Timings</h3>
                    <p className="text-slate-600 text-xs mt-0.5">
                      {institute.timings}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Map Placeholder */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm overflow-hidden">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">
                Location Map (Daffodil Smart City, Birulia, Savar, Dhaka)
              </h3>
              <div className="w-full h-48 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-500 text-center p-4">
                <MapPin className="w-8 h-8 text-indigo-500 mb-2 animate-bounce" />
                <p className="font-bold text-xs text-slate-800">Daffodil Smart City (DSC)</p>
                <p className="text-[11px] text-slate-500">Birulia, Savar, Dhaka-1216</p>
                <span className="mt-2 text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full">
                  Google Maps Interactive Placeholder
                </span>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-slate-600 text-sm mb-6">
                Fill out the form below and our admissions team will respond within 24 hours.
              </p>

              {success ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-emerald-900">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-emerald-700">
                    Thank you for reaching out. We have logged your query and will call or email you shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-2 text-xs font-bold text-emerald-800 underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Your Name"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+880 1712 345678"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Your Query or Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask about batch timings, fee concessions, study material, or general admissions..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
