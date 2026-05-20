import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-6 rounded-t-[3rem]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">Start Eating Better Today.</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Join 50+ companies across Mumbai who trust us with their daily meals.</p>
          <motion.a href="mailto:hello@kitchensbyk.com" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-saffron hover:bg-saffron-dark text-white font-bold px-10 py-5 rounded-2xl text-base shadow-xl shadow-saffron/20 transition-colors">
            Get Started <ArrowRight size={18} />
          </motion.a>
        </div>

        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Logo className="w-8 h-8" />
              <span className="font-bold text-[15px]">Kitchens by K</span>
            </div>
            <p className="text-[13px] text-slate-400 max-w-[200px] leading-relaxed">Mumbai's freshest corporate kitchen.</p>
            <div className="flex flex-col gap-2 text-[13px] text-slate-400 mt-1">
              <span className="flex items-center gap-2"><Phone size={14} className="text-saffron/50" /> +91 98765 43210</span>
              <span className="flex items-center gap-2"><Mail size={14} className="text-saffron/50" /> hello@kitchensbyk.com</span>
              <span className="flex items-center gap-2"><MapPin size={14} className="text-saffron/50" /> Mumbai, India</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:flex md:gap-16 gap-8 w-full md:w-auto">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 mb-4">Company</p>
              <div className="flex flex-col gap-3 text-[13px] text-slate-400">
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                <a href="#how" className="hover:text-white transition-colors">How It Works</a>
                <a href="#menu" className="hover:text-white transition-colors">Menu</a>
                <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 mb-4">Partner With Us</p>
              <div className="flex flex-col gap-3 text-[13px] text-slate-400">
                <a href="mailto:hello@kitchensbyk.com" className="hover:text-white transition-colors">For Corporates</a>
                <a href="mailto:hello@kitchensbyk.com" className="hover:text-white transition-colors">For Caterers</a>
                <a href="mailto:hello@kitchensbyk.com" className="hover:text-white transition-colors">For HR Teams</a>
                <a href="mailto:hello@kitchensbyk.com" className="hover:text-white transition-colors">Bulk Orders</a>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 mb-4">Learn More</p>
              <div className="flex flex-col gap-3 text-[13px] text-slate-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Help & Support</a>
                <a href="#" className="hover:text-white transition-colors">Report an Issue</a>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 mb-4">Follow Us</p>
              <div className="flex flex-col gap-3 text-[13px] text-slate-400">
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Instagram
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap">
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  X (Twitter)
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 mb-4">Download App</p>
              <div className="flex flex-col gap-3 items-start">
                <a href="#" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-105 active:scale-95">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-[40px] w-[135px]" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-105 active:scale-95">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-[40px] w-[135px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-slate-600 text-center md:text-left">By continuing past this page, you agree to our <a href="#" className="hover:text-slate-400 underline">Terms of Service</a>, <a href="#" className="hover:text-slate:400 underline">Privacy Policy</a> and <a href="#" className="hover:text-slate-400 underline">Cookie Policy</a>.</p>
          <p className="text-[12px] text-slate-600 shrink-0 text-center md:text-right">{new Date().getFullYear()} &copy; Kitchens by K&trade;. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
