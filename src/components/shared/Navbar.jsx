import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, User, Menu, X } from "lucide-react";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import Logo from "./Logo";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { auth, avatar, logout } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuRef = useRef(null);
  const mobileRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (latest > 100 && latest > previous) {
      setHidden(true);
      setShowMenu(false);
      setShowMobile(false);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  // Close both on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
      if (
        mobileRef.current && !mobileRef.current.contains(e.target) &&
        mobileToggleRef.current && !mobileToggleRef.current.contains(e.target)
      ) {
        setShowMobile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleMobile = () => {
    setShowMobile((prev) => !prev);
    setShowMenu(false); // close profile dropdown when opening mobile menu
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
    setShowMobile(false); // close mobile menu when opening profile dropdown
  };

  const handleSignOut = () => {
    logout();
    setShowMenu(false);
    setShowMobile(false);
    navigate("/");
  };

  const navLink = (label, to, isAnchor = false) => {
    const isActive = !isAnchor && pathname === to;
    const cls = `hover:text-slate-900 dark:hover:text-white transition-colors ${isActive ? "text-slate-900 dark:text-white font-semibold" : ""}`;
    if (isAnchor) return <a href={to} className={cls}>{label}</a>;
    return <Link to={to} className={cls}>{label}</Link>;
  };

  const mobileNavLink = (label, to, isAnchor = false) => {
    const cls = "px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors";
    if (isAnchor) return <a href={to} onClick={() => setShowMobile(false)} className={cls}>{label}</a>;
    return <Link to={to} onClick={() => setShowMobile(false)} className={cls}>{label}</Link>;
  };

  const isAbout = pathname === "/about";
  const isMenu = pathname === "/menu";
  const isProfile = pathname === "/profile";
  const isFaqs = pathname === "/faqs";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: hidden ? "-150%" : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
    >
      <div className="glass-strong rounded-2xl px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <Logo className="w-8 h-8" />
          <span className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">Kitchens by K</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 text-[13px] text-slate-500 dark:text-slate-400 font-medium">
          {isProfile ? (
            <>
              {navLink("Home", "/")}
              {navLink("About", "/about")}
              {navLink("FAQs", "/faqs")}
              <Link to="/profile" className="text-slate-900 dark:text-white font-semibold">Profile</Link>
            </>
          ) : isAbout ? (
            <>
              {navLink("Home", "/")}
              {navLink("Menu", "/menu")}
              <a href="/#pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a>
              <Link to="/about" className="text-slate-900 dark:text-white font-semibold">About</Link>
              {navLink("FAQs", "/faqs")}
            </>
          ) : isMenu ? (
            <>
              {navLink("Home", "/")}
              <Link to="/menu" className="text-slate-900 dark:text-white font-semibold">Menu</Link>
              {navLink("About", "/about")}
              {navLink("FAQs", "/faqs")}
            </>
          ) : isFaqs ? (
            <>
              {navLink("Home", "/")}
              {navLink("Menu", "/menu")}
              {navLink("About", "/about")}
              <Link to="/faqs" className="text-slate-900 dark:text-white font-semibold">FAQs</Link>
            </>
          ) : (
            <>
              <a href="#how" className="hover:text-slate-900 dark:hover:text-white transition-colors">How It Works</a>
              <a href="#menu" className="hover:text-slate-900 dark:hover:text-white transition-colors">Menu</a>
              <a href="#pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a>
              {navLink("About", "/about")}
              {navLink("FAQs", "/faqs")}
            </>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <AnimatedThemeToggler />

          {/* CTA button — desktop */}
          {isProfile ? null : auth ? (
            <Link to="/profile#active-plan">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                className="hidden md:block bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 cursor-pointer">
                My Plan
              </motion.span>
            </Link>
          ) : isAbout ? (
            <motion.a href="mailto:hello@kitchensbyk.com" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              className="hidden md:block bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Contact Us
            </motion.a>
          ) : isMenu || isFaqs ? (
            <Link to="/#pricing">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                className="hidden md:block bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors dark:bg-white dark:text-slate-900 cursor-pointer">
                Get Started
              </motion.span>
            </Link>
          ) : (
            <motion.a href="#pricing" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              className="hidden md:block bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
              Get Started
            </motion.a>
          )}

          {/* Mobile hamburger */}
          <button ref={mobileToggleRef} onClick={toggleMobile}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {showMobile ? <X size={18} className="text-slate-700 dark:text-white" /> : <Menu size={18} className="text-slate-700 dark:text-white" />}
          </button>

          {/* Avatar dropdown */}
          <div className="relative" ref={menuRef}>
            <button onClick={toggleMenu} className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-orange-100 dark:bg-emerald-900/40 flex items-center justify-center">
                {avatar && auth ? (
                  avatar.startsWith("data:") ? (
                    <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg">{avatar}</span>
                  )
                ) : auth ? (
                  <span className="text-[11px] font-bold text-orange-700 dark:text-emerald-400">
                    {(auth.name || "").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "U"}
                  </span>
                ) : (
                  <User size={16} className="text-orange-700 dark:text-emerald-400" />
                )}
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${showMenu ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-48 rounded-xl overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-black/10 dark:shadow-black/40"
                >
                  {auth ? (
                    <>
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-[13px] font-semibold text-slate-900 dark:text-white truncate">{auth.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{auth.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setShowMenu(false)} className="block px-4 py-3 text-[13px] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        Profile
                      </Link>
                      <a href="#" className="block px-4 py-3 text-[13px] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        My Orders
                      </a>
                      <a href="#" className="block px-4 py-3 text-[13px] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        Help & Support
                      </a>
                      <div className="border-t border-slate-100 dark:border-slate-700" />
                      <button onClick={handleSignOut} className="w-full text-left px-4 py-3 text-[13px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/signin" className="block px-4 py-3 text-[13px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        Sign In
                      </Link>
                      <Link to="/signup" className="block px-4 py-3 text-[13px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        Create Account
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {showMobile && (
          <motion.div
            ref={mobileRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 rounded-2xl overflow-y-auto max-h-[75vh] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-xl"
          >
            <div className="flex flex-col p-3 gap-1 text-[14px] font-medium">
              {isProfile ? (
                <>
                  {mobileNavLink("Home", "/")}
                  {mobileNavLink("About", "/about")}
                  {mobileNavLink("FAQs", "/faqs")}
                  {mobileNavLink("Menu", "/menu")}
                </>
              ) : isAbout ? (
                <>
                  {mobileNavLink("Home", "/")}
                  {mobileNavLink("Menu", "/menu")}
                  <a href="/#pricing" onClick={() => setShowMobile(false)} className="px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Pricing</a>
                  {mobileNavLink("About", "/about")}
                  {mobileNavLink("FAQs", "/faqs")}
                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                  <a href="mailto:hello@kitchensbyk.com" onClick={() => setShowMobile(false)} className="mx-1 mt-1 px-4 py-3 rounded-xl text-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold">Contact Us</a>
                </>
              ) : isMenu ? (
                <>
                  {mobileNavLink("Home", "/")}
                  {mobileNavLink("Menu", "/menu")}
                  {mobileNavLink("About", "/about")}
                  {mobileNavLink("FAQs", "/faqs")}
                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                  <a href="/#pricing" onClick={() => setShowMobile(false)} className="mx-1 mt-1 px-4 py-3 rounded-xl text-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold">Get Started</a>
                </>
              ) : isFaqs ? (
                <>
                  {mobileNavLink("Home", "/")}
                  {mobileNavLink("Menu", "/menu")}
                  {mobileNavLink("About", "/about")}
                  {mobileNavLink("FAQs", "/faqs")}
                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                  <a href="/#pricing" onClick={() => setShowMobile(false)} className="mx-1 mt-1 px-4 py-3 rounded-xl text-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold">Get Started</a>
                </>
              ) : (
                <>
                  <a href="#how" onClick={() => setShowMobile(false)} className="px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">How It Works</a>
                  <a href="#menu" onClick={() => setShowMobile(false)} className="px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Menu</a>
                  <a href="#pricing" onClick={() => setShowMobile(false)} className="px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Pricing</a>
                  {mobileNavLink("About", "/about")}
                  {mobileNavLink("FAQs", "/faqs")}
                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                  {auth ? (
                    <Link to="/profile#active-plan" onClick={() => setShowMobile(false)} className="mx-1 mt-1 px-4 py-3 rounded-xl text-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold">My Plan</Link>
                  ) : (
                    <a href="#pricing" onClick={() => setShowMobile(false)} className="mx-1 mt-1 px-4 py-3 rounded-xl text-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold">Get Started</a>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
