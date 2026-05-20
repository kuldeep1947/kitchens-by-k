import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Lock, Check, ChevronDown, Sparkles, Shield, MapPin, Plus, Trash2, Star, Camera, ArrowRight, Menu, X, Eye, EyeOff } from "lucide-react";
import { AnimatedThemeToggler } from "./components/ui/animated-theme-toggler";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, variants: v = fadeUp, custom = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={v} custom={custom} className={className}>
      {children}
    </motion.div>
  );
}

function Logo({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoBg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#064E3B"/>
          <stop offset="100%" stopColor="#1E293B"/>
        </linearGradient>
        <linearGradient id="leafGrad" x1="24" y1="6" x2="32" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399"/>
          <stop offset="100%" stopColor="#059669"/>
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#logoBg)"/>
      <path d="M12 29V11h3.2v7.4l7.2-7.4h4l-7.4 7.6L26.6 29h-4l-5.2-7.6-2.2 2.3V29H12z" fill="white" opacity="0.95"/>
      <path d="M28 7c3.5 2 5 5.5 4 9-1.5-1-3.5-1.5-5.5-.8 0-3.2 0.5-5.8 1.5-8.2z" fill="url(#leafGrad)" opacity="0.9"/>
      <path d="M28.5 7.5c0 0 1 3.5 0.5 6.5" stroke="#6EE7B7" strokeWidth="0.6" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}

function ProfileNavbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const menuRef = useRef(null);
  const mobileRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("kbk_auth");
    return stored ? JSON.parse(stored) : null;
  });

  // Close dropdown on outside click
  useEffect(() => {
    if (!showMenu) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showMenu]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!showMobile) return;
    const handler = (e) => {
      if (
        mobileRef.current && !mobileRef.current.contains(e.target) &&
        mobileToggleRef.current && !mobileToggleRef.current.contains(e.target)
      ) setShowMobile(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showMobile]);

  const handleSignOut = () => {
    localStorage.removeItem("kbk_auth");
    setAuth(null);
    navigate("/");
  };

  return (
    <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 shadow-lg shadow-slate-200/30 dark:shadow-black/20 rounded-2xl px-6 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo className="w-8 h-8" />
          <span className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">Kitchens by K</span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-[13px] text-slate-500 dark:text-slate-400 font-medium">
          <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</Link>
          <Link to="/profile" className="text-slate-900 dark:text-white font-semibold">Profile</Link>
        </div>
        <div className="flex items-center gap-3">
          <AnimatedThemeToggler />
          {/* Mobile hamburger */}
          <button ref={mobileToggleRef} onClick={() => setShowMobile(!showMobile)} className="md:hidden flex items-center justify-center w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {showMobile ? <X size={18} className="text-slate-700 dark:text-white" /> : <Menu size={18} className="text-slate-700 dark:text-white" />}
          </button>
          {auth && (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-orange-100 dark:bg-emerald-900/40 flex items-center justify-center">
                  {(() => {
                    const user = localStorage.getItem("kbk_user");
                    const avatar = user ? JSON.parse(user).avatar : null;
                    return avatar ? (
                      avatar.startsWith("data:") ? (
                        <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg">{avatar}</span>
                      )
                    ) : (
                      <span className="text-[11px] font-bold text-orange-700 dark:text-emerald-400">
                        {auth.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                      </span>
                    );
                  })()}
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${showMenu ? "rotate-180" : ""}`} />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-12 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-[13px] font-semibold text-slate-900 dark:text-white truncate">{auth.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{auth.email}</p>
                  </div>
                  <button onClick={handleSignOut} className="w-full text-left px-4 py-3 text-[13px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
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
            className="md:hidden mt-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="flex flex-col p-3 gap-1 text-[14px] font-medium">
              <Link to="/" onClick={() => setShowMobile(false)} className="px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Home</Link>
              <Link to="/about" onClick={() => setShowMobile(false)} className="px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">About</Link>
              <Link to="/menu" onClick={() => setShowMobile(false)} className="px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Menu</Link>
              <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
              <button onClick={() => { handleSignOut(); setShowMobile(false); }} className="px-4 py-3 rounded-xl text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Sign Out</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function PersonalInfo() {
  const stored = localStorage.getItem("kbk_user");
  const user = stored ? JSON.parse(stored) : {};
  const auth = localStorage.getItem("kbk_auth") ? JSON.parse(localStorage.getItem("kbk_auth")) : {};

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [mobile, setMobile] = useState(user.mobile || "");
  const [avatar, setAvatar] = useState(user.avatar || null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiOptions = ["🍱", "🥗", "🍛", "🍜", "🥘", "🍲", "🥙", "🍣", "🍔", "🥑", "🍕", "🌮", "👨‍🍳", "👩‍🍳", "🧑‍🍳", "⭐", "🔥", "💫"];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setAvatar(base64);
      const updated = { ...user, avatar: base64 };
      localStorage.setItem("kbk_user", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    };
    reader.readAsDataURL(file);
  };

  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

  const handleSave = () => {
    const updated = { ...user, firstName, lastName, email, mobile, avatar };
    localStorage.setItem("kbk_user", JSON.stringify(updated));
    localStorage.setItem("kbk_auth", JSON.stringify({ ...auth, name: firstName + " " + lastName, email }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Reveal variants={scaleIn} custom={0}>
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/40 dark:border-slate-700/40 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center">
            <User size={18} className="text-saffron" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Personal Information</h3>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-5 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-saffron/20 bg-gradient-to-br from-saffron/20 to-emerald-400/20 flex items-center justify-center">
              {avatar ? (
                avatar.startsWith("data:") ? (
                  <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">{avatar}</span>
                )
              ) : (
                <span className="text-2xl font-bold text-saffron">{initials || <User size={28} className="text-saffron" />}</span>
              )}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 w-6 h-6 bg-saffron rounded-full flex items-center justify-center shadow-md hover:brightness-110 transition-all"
            >
              <Camera size={12} className="text-white" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">{firstName} {lastName}</p>
            <p className="text-xs text-slate-400 mt-0.5">{email}</p>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <button onClick={() => fileRef.current?.click()} className="text-xs text-saffron hover:text-amber-600 font-medium transition-colors">Change photo</button>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-xs text-saffron hover:text-amber-600 font-medium transition-colors">Choose avatar</button>
              {avatar && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <button
                    onClick={() => {
                      setAvatar(null);
                      const updated = { ...user, avatar: null };
                      localStorage.setItem("kbk_user", JSON.stringify(updated));
                      window.dispatchEvent(new Event("storage"));
                    }}
                    className="text-xs text-red-400 hover:text-red-500 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
            {/* Emoji picker */}
            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="mt-3 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl grid grid-cols-6 gap-1.5 w-fit"
                >
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setAvatar(emoji);
                        const updated = { ...user, avatar: emoji };
                        localStorage.setItem("kbk_user", JSON.stringify(updated));
                        window.dispatchEvent(new Event("storage"));
                        setShowEmojiPicker(false);
                      }}
                      className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center hover:bg-saffron/10 transition-colors ${
                        avatar === emoji ? "bg-saffron/20 ring-2 ring-saffron/40" : ""
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5"><Mail size={11} className="inline mr-1" />Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5"><Phone size={11} className="inline mr-1" />Mobile</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-6 flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold px-6 py-2.5 rounded-xl text-sm hover:brightness-105 transition-all"
        >
          {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
        </button>
      </div>
    </Reveal>
  );
}

function ActivePlan() {
  const navigate = useNavigate();
  const plans = { Weekly: { price: "₹1,499", meals: "5 meals/week", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" }, Monthly: { price: "₹4,999", meals: "22 meals/month", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" }, Enterprise: { price: "Custom", meals: "Unlimited", color: "text-saffron", bg: "bg-saffron/10" } };
  const activePlan = null;

  const handleViewPlans = () => {
    navigate("/");
    setTimeout(() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  return (
    <Reveal variants={scaleIn} custom={1}>
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/40 dark:border-slate-700/40 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
            <Sparkles size={18} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Plan</h3>
        </div>
        {activePlan ? (
          <div className={`${plans[activePlan].bg} rounded-2xl p-5`}>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{activePlan} Plan</p>
            <p className={`text-2xl font-extrabold ${plans[activePlan].color} mt-1`}>{plans[activePlan].price}<span className="text-sm font-normal text-slate-400">/month</span></p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{plans[activePlan].meals}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-10 px-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center mb-4">
              <span className="text-3xl">🍱</span>
            </div>
            <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">No active plan yet</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-6 max-w-xs">Subscribe to a plan and get fresh chef-crafted meals delivered to your desk every day.</p>
            <button onClick={handleViewPlans} className="inline-flex items-center gap-2 bg-saffron text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:brightness-105 transition-all shadow-lg shadow-saffron/20">
              View Plans <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </Reveal>
  );
}

function Addresses() {
  const [addresses, setAddresses] = useState(() => {
    const stored = localStorage.getItem("kbk_addresses");
    return stored ? JSON.parse(stored) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: "Home", address: "", city: "", pincode: "" });
  const [error, setError] = useState("");

  const save = (updated) => {
    setAddresses(updated);
    localStorage.setItem("kbk_addresses", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!form.address || !form.city || !form.pincode) { setError("Please fill in all fields."); return; }
    if (!/^\d{6}$/.test(form.pincode)) { setError("Enter a valid 6-digit pincode."); return; }
    const newAddr = { ...form, id: Date.now(), isDefault: addresses.length === 0 };
    save([...addresses, newAddr]);
    setForm({ label: "Home", address: "", city: "", pincode: "" });
    setError("");
    setShowForm(false);
  };

  const setDefault = (id) => {
    save(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const remove = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    if (updated.length > 0 && !updated.some((a) => a.isDefault)) updated[0].isDefault = true;
    save(updated);
  };

  return (
    <Reveal variants={scaleIn} custom={3}>
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/40 dark:border-slate-700/40 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <MapPin size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Saved Addresses</h3>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setError(""); }}
            className="flex items-center gap-1.5 text-sm font-semibold text-saffron hover:text-amber-600 transition-colors"
          >
            <Plus size={16} /> Add New
          </button>
        </div>

        {/* Add form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 space-y-3"
          >
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Label</label>
              <div className="flex gap-2">
                {["Home", "Office", "Other"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setForm((f) => ({ ...f, label: l }))}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      form.label === l
                        ? "bg-saffron text-white border-saffron"
                        : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-saffron"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Full Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                placeholder="Building, street, area"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  placeholder="Mumbai"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Pincode</label>
                <input
                  type="text"
                  value={form.pincode}
                  onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value }))}
                  placeholder="400001"
                  maxLength={6}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                />
              </div>
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <div className="flex gap-2 pt-1">
              <button onClick={handleAdd} className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold px-5 py-2 rounded-xl text-sm hover:brightness-105 transition-all">
                <Check size={14} /> Save Address
              </button>
              <button onClick={() => { setShowForm(false); setError(""); }} className="px-5 py-2 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Address list */}
        {addresses.length === 0 && !showForm ? (
          <p className="text-slate-400 dark:text-slate-500 text-sm text-center py-6">No saved addresses yet.</p>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div key={addr.id} className={`flex items-start justify-between p-4 rounded-2xl border transition-all ${
                addr.isDefault
                  ? "border-saffron/30 bg-saffron/5 dark:bg-saffron/10"
                  : "border-slate-200 dark:border-slate-700"
              }`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">{addr.label}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-semibold text-saffron bg-saffron/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star size={8} fill="currentColor" /> Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{addr.address}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{addr.city} — {addr.pincode}</p>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  {!addr.isDefault && (
                    <button onClick={() => setDefault(addr.id)} className="text-[11px] font-medium text-slate-400 hover:text-saffron transition-colors">
                      Set default
                    </button>
                  )}
                  <button onClick={() => remove(addr.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}


function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [showFields, setShowFields] = useState({ current: false, new: false, confirm: false });

  const handleChange = () => {
    const stored = localStorage.getItem("kbk_user");
    const user = stored ? JSON.parse(stored) : null;
    if (!current || !newPass || !confirm) { setError("Please fill in all fields."); return; }
    if (!user || current !== user.password) { setError("Current password is incorrect."); return; }
    if (newPass !== confirm) { setError("New passwords don't match."); return; }
    if (newPass.length < 6) { setError("Password must be at least 6 characters."); return; }
    localStorage.setItem("kbk_user", JSON.stringify({ ...user, password: newPass }));
    setError("");
    setSaved(true);
    setCurrent(""); setNewPass(""); setConfirm("");
    setOpen(false);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Reveal variants={scaleIn} custom={3}>
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/40 dark:border-slate-700/40 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <Shield size={18} className="text-slate-600 dark:text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Change Password</h3>
          </div>
          <button
            onClick={() => { setOpen(!open); setError(""); }}
            className="flex items-center gap-2 text-sm font-semibold text-saffron hover:text-amber-600 transition-colors"
          >
            {saved ? <><Check size={14} /> Updated!</> : open ? "Cancel" : "Update Password"}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-4 mt-6">
                {[
                  { label: "Current Password", value: current, set: setCurrent, key: "current" },
                  { label: "New Password", value: newPass, set: setNewPass, key: "new" },
                  { label: "Confirm New Password", value: confirm, set: setConfirm, key: "confirm" },
                ].map(({ label, value, set, key }) => (
                  <div key={label}>
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5"><Lock size={11} className="inline mr-1" />{label}</label>
                    <div className="relative">
                      <input
                        type={showFields[key] ? "text" : "password"}
                        value={value}
                        onChange={(e) => set(e.target.value)}
                        className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowFields((prev) => ({ ...prev, [key]: !prev[key] }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                      >
                        {showFields[key] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                ))}
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                  onClick={handleChange}
                  className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold px-6 py-2.5 rounded-xl text-sm hover:brightness-105 transition-all w-fit"
                >
                  <Check size={14} /> Confirm Change
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function Profile() {
  const auth = localStorage.getItem("kbk_auth");
  if (!auth) return <Navigate to="/signin" replace />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden antialiased transition-colors duration-300">
      <ProfileNavbar />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
        <div className="absolute top-[0%] left-[10%] w-[600px] h-[600px] bg-emerald-200/[0.12] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-[0%] right-[5%] w-[500px] h-[500px] bg-saffron/[0.06] rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-[13px] text-slate-400 hover:text-slate-600 transition-colors mb-8">
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[12px] font-semibold tracking-[0.15em] uppercase text-saffron mb-6">
            My Account
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-[4.5rem] font-extrabold leading-[0.95] tracking-tighter text-slate-900 dark:text-white">
            Your profile,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-amber-500 to-emerald-500">your way.</span>
          </motion.h1>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto grid gap-6">
          <PersonalInfo />
          <ActivePlan />
          <Addresses />
          <ChangePassword />
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-8 px-6 rounded-t-[2rem]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo className="w-7 h-7" />
            <span className="font-bold text-[14px]">Kitchens by K</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-[13px] text-slate-400">
            <span className="flex items-center gap-2"><Phone size={13} className="text-saffron/50" /> +91 98765 43210</span>
            <span className="flex items-center gap-2"><Mail size={13} className="text-saffron/50" /> hello@kitchensbyk.com</span>
          </div>
          <p className="text-[12px] text-slate-600">2026 &copy; Kitchens by K&trade;. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
