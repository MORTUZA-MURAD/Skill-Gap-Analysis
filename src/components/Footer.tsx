import React from 'react';
import Link from 'next/link';
import { institute } from '@/data/institute';
import { GraduationCap, Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Institute Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                {institute.name}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {institute.tagline}. Empowering students for over 2 years with competitive exam success across SWE, CSE, EEE, NFE, and Computer Skills.
            </p>
            <div className="pt-2 text-xs text-indigo-400 font-semibold">
              Est. 2024 Daffodil Smart City (DSC), Birulia, Savar, Dhaka-1216.
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide uppercase text-xs">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About Us & Faculty
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-indigo-400 transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/enroll" className="hover:text-indigo-400 transition-colors">
                  Enroll Now
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-indigo-400 transition-colors">
                  Student Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Courses Offered */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide uppercase text-xs">
              Courses Offered
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Engineering (SWE & CSE)</li>
              <li>Food Engineering (NFE)</li>
              <li>SSC & HSC Batches</li>
              <li>Electrical (EEE)</li>
              <li>Spoken English & Soft Skills</li>
              <li>Computer Diploma (DCA)</li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide uppercase text-xs">
              Get In Touch
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{institute.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{institute.phone.join(' / ')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{institute.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{institute.timings}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {institute.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            Built with excellence for student success
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
