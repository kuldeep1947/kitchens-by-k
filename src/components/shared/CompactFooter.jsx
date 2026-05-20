import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import Logo from "./Logo";

export default function CompactFooter() {
  return (
    <footer className="bg-slate-900 text-white py-8 px-6 rounded-t-[2rem]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="w-7 h-7" />
          <span className="font-bold text-[14px]">Kitchens by K</span>
        </Link>
        <div className="flex flex-col sm:flex-row gap-4 text-[13px] text-slate-400">
          <span className="flex items-center gap-2"><Phone size={13} className="text-saffron/50" /> +91 98765 43210</span>
          <span className="flex items-center gap-2"><Mail size={13} className="text-saffron/50" /> hello@kitchensbyk.com</span>
        </div>
        <p className="text-[12px] text-slate-600">{new Date().getFullYear()} &copy; Kitchens by K&trade;. All rights reserved.</p>
      </div>
    </footer>
  );
}
