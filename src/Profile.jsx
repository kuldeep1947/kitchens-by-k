import { useEffect } from "react";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Lock, Check, Sparkles, Shield, MapPin, Plus, Trash2, Star, Camera, ArrowRight, Eye, EyeOff, Pencil, MoreVertical, X } from "lucide-react";
import Reveal from "./components/shared/Reveal";
import { scaleIn } from "./components/shared/reveal-variants";
import { useAuth } from "./context/auth-context";

function PersonalInfo() {
  const { login, updateAvatar } = useAuth();
  const stored = localStorage.getItem("kbk_user");
  const user = stored ? JSON.parse(stored) : {};
  const authData = localStorage.getItem("kbk_auth") ? JSON.parse(localStorage.getItem("kbk_auth")) : {};

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [mobile, setMobile] = useState(user.mobile || "");
  const [avatar, setAvatar] = useState(user.avatar || null);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const fileRef = useRef(null);
  const avatarBlockRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiOptions = ["🍱", "🥗", "🍛", "🍜", "🥘", "🍲", "🥙", "🍣", "🍔", "🥑", "🍕", "🌮", "👨‍🍳", "👩‍🍳", "🧑‍🍳", "⭐", "🔥", "💫"];

  // Close the emoji picker when clicking outside the avatar block.
  useEffect(() => {
    if (!showEmojiPicker) return;
    const handler = (e) => {
      if (avatarBlockRef.current && !avatarBlockRef.current.contains(e.target)) setShowEmojiPicker(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showEmojiPicker]);

  const persistAvatar = (value) => {
    try {
      localStorage.setItem("kbk_user", JSON.stringify({ ...user, avatar: value }));
      setAvatar(value);
      updateAvatar(value);
      setAvatarError("");
    } catch {
      setAvatarError("Couldn't save that image — please try a smaller one.");
    }
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("Image too large — please choose one under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => persistAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) { setEditError("Please enter your first and last name."); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEditError("Please enter a valid email address."); return false; }
    if (!/^[6-9]\d{9}$/.test(mobile)) { setEditError("Please enter a valid 10-digit mobile number."); return false; }
    localStorage.setItem("kbk_user", JSON.stringify({ ...user, firstName, lastName, email, mobile, avatar }));
    // Route through context so the navbar (name + avatar) updates live, no reload.
    login({ ...authData, name: firstName + " " + lastName, email });
    setEditError("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    return true;
  };

  return (
    <Reveal variants={scaleIn} custom={0}>
      <div className="glass rounded-3xl p-8 shadow-sm">
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
              aria-label="Change profile photo"
              className="absolute bottom-0 right-0 w-6 h-6 bg-saffron rounded-full flex items-center justify-center shadow-md hover:brightness-110 transition-all"
            >
              <Camera size={12} className="text-white" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
          </div>
          <div ref={avatarBlockRef}>
            <p className="font-semibold text-slate-900 dark:text-white">{firstName} {lastName}</p>
            <p className="text-xs text-slate-400 mt-0.5">{email}</p>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <button onClick={() => fileRef.current?.click()} className="text-xs text-saffron hover:text-amber-600 font-medium transition-colors">Change photo</button>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} aria-expanded={showEmojiPicker} className="text-xs text-saffron hover:text-amber-600 font-medium transition-colors">Choose avatar</button>
              {avatar && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <button
                    onClick={() => persistAvatar(null)}
                    className="text-xs text-red-400 hover:text-red-500 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
            {avatarError && <p role="alert" className="text-xs text-red-500 mt-2">{avatarError}</p>}
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
                      aria-label={`Use ${emoji} as avatar`}
                      onClick={() => { persistAvatar(emoji); setShowEmojiPicker(false); }}
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
        {isEditing ? (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pi-first" className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">First Name</label>
                <input
                  id="pi-first"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                />
              </div>
              <div>
                <label htmlFor="pi-last" className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Last Name</label>
                <input
                  id="pi-last"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                />
              </div>
              <div>
                <label htmlFor="pi-email" className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5"><Mail size={11} className="inline mr-1" />Email</label>
                <input
                  id="pi-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                />
              </div>
              <div>
                <label htmlFor="pi-mobile" className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5"><Phone size={11} className="inline mr-1" />Mobile</label>
                <input
                  id="pi-mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                />
              </div>
            </div>
            {editError && <p role="alert" className="mt-3 text-sm text-red-500">{editError}</p>}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => { if (handleSave()) setIsEditing(false); }}
                className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold px-6 py-2.5 rounded-xl text-sm hover:brightness-105 transition-all"
              >
                {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
              </button>
              <button
                onClick={() => { setFirstName(user.firstName || ""); setLastName(user.lastName || ""); setEmail(user.email || ""); setMobile(user.mobile || ""); setEditError(""); setIsEditing(false); }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">First Name</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{firstName || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Last Name</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{lastName || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1"><Mail size={11} className="inline mr-1" />Email</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{email || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1"><Phone size={11} className="inline mr-1" />Mobile</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{mobile || "—"}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 flex items-center gap-2 text-sm font-semibold text-saffron hover:text-amber-600 transition-colors"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </Reveal>
  );
}

function ActivePlan() {
  const navigate = useNavigate();
  const [activePlan, setActivePlan] = useState(() => {
    const stored = localStorage.getItem("kbk_active_plan");
    return stored ? JSON.parse(stored) : null;
  });
  const [showDetails, setShowDetails] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const planStyles = {
    Weekly: { color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    Monthly: { color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    Enterprise: { color: "text-saffron", bg: "bg-saffron/10" },
  };

  const handleViewPlans = () => {
    navigate("/pricing");
  };

  return (
    <Reveal variants={scaleIn} custom={1}>
      <div id="active-plan" className="glass rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
            <Sparkles size={18} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Plan</h3>
        </div>
        {activePlan ? (
          <div className={`${planStyles[activePlan.title]?.bg ?? "bg-slate-50 dark:bg-slate-800"} rounded-2xl p-5`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{activePlan.title} Plan</p>
                <p className={`text-2xl font-extrabold ${planStyles[activePlan.title]?.color ?? "text-saffron"} mt-1`}>
                  {activePlan.finalPrice ?? activePlan.price}
                  {!activePlan.finalPrice && <span className="text-sm font-normal text-slate-400">{activePlan.priceSuffix}</span>}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activePlan.meals}</p>
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs font-semibold text-saffron hover:text-amber-600 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors shrink-0 mt-1"
              >
                {showDetails ? "Hide details" : "View details"}
              </button>
            </div>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10 space-y-3">
                    {/* Price Breakdown */}
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Price Breakdown</p>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                          <span>Base plan</span>
                          <span>₹{activePlan.basePrice?.toLocaleString("en-IN")}</span>
                        </div>
                        {activePlan.totalExtras > 0 && (
                          <div className="flex justify-between text-xs text-amber-600 dark:text-amber-400">
                            <span>Add-ons (₹{activePlan.extrasPerMeal}/meal × {activePlan.mealCount} meals)</span>
                            <span>+₹{activePlan.totalExtras?.toLocaleString("en-IN")}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-xs font-bold text-slate-900 dark:text-white pt-1 border-t border-black/10 dark:border-white/10">
                          <span>Total paid</span>
                          <span>{activePlan.finalPrice}</span>
                        </div>
                      </div>
                    </div>
                    {activePlan.selectedMeals?.length > 0 && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Selected Meals</p>
                        <div className="flex flex-wrap gap-1.5">
                          {activePlan.selectedMeals.map((meal) => (
                            <span key={meal} className="text-[11px] font-medium bg-white/60 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full">
                              {meal}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {activePlan.customizations?.length > 0 && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Preferences</p>
                        <div className="flex flex-wrap gap-1.5">
                          {activePlan.customizations.map((c) => (
                            <span key={c} className="text-[11px] font-medium bg-white/60 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {confirming ? (
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs text-slate-500 dark:text-slate-400">Cancel this plan?</span>
                <button
                  onClick={() => { localStorage.removeItem("kbk_active_plan"); setActivePlan(null); setConfirming(false); }}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
                >
                  Yes, cancel
                </button>
                <button
                  onClick={() => setConfirming(false)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  Keep plan
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirming(true)}
                className="mt-4 text-xs text-red-400 hover:text-red-500 font-medium transition-colors"
              >
                Cancel Plan
              </button>
            )}
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
  const [editingId, setEditingId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [form, setForm] = useState({ label: "Home", address: "", city: "", pincode: "" });
  const [error, setError] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    if (!openMenu) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [openMenu]);

  const save = (updated) => {
    setAddresses(updated);
    localStorage.setItem("kbk_addresses", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!form.address || !form.city || !form.pincode) { setError("Please fill in all fields."); return; }
    if (!/^\d{6}$/.test(form.pincode)) { setError("Enter a valid 6-digit pincode."); return; }
    if (editingId) {
      save(addresses.map((a) => a.id === editingId ? { ...a, ...form } : a));
      setEditingId(null);
    } else {
      const newAddr = { ...form, id: Date.now(), isDefault: addresses.length === 0 };
      save([...addresses, newAddr]);
    }
    setForm({ label: "Home", address: "", city: "", pincode: "" });
    setError("");
    setShowForm(false);
  };

  const startEdit = (addr) => {
    setForm({ label: addr.label, address: addr.address, city: addr.city, pincode: addr.pincode });
    setEditingId(addr.id);
    setShowForm(true);
    setError("");
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
    <Reveal variants={scaleIn} custom={2}>
      <div className="glass rounded-3xl p-8 shadow-sm overflow-visible relative z-10">
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
              <div className="flex gap-2 items-center">
                {["Home", "Office"].map((l) => (
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
                <input
                  type="text"
                  aria-label="Custom address label"
                  value={form.label === "Home" || form.label === "Office" ? "" : form.label}
                  onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                  onFocus={() => { if (form.label === "Home" || form.label === "Office") setForm((f) => ({ ...f, label: "" })); }}
                  placeholder="Custom label"
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all w-28 focus:outline-none focus:ring-2 focus:ring-saffron/20 ${
                    form.label !== "Home" && form.label !== "Office" && form.label !== ""
                      ? "bg-saffron text-white border-saffron placeholder:text-white/60"
                      : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 placeholder:text-slate-400"
                  }`}
                />
              </div>
            </div>
            <div>
              <label htmlFor="addr-full" className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Full Address</label>
              <input
                id="addr-full"
                type="text"
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                placeholder="Building, street, area"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="addr-city" className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">City</label>
                <input
                  id="addr-city"
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  placeholder="Mumbai"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                />
              </div>
              <div>
                <label htmlFor="addr-pincode" className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Pincode</label>
                <input
                  id="addr-pincode"
                  type="text"
                  inputMode="numeric"
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
                <Check size={14} /> {editingId ? "Update Address" : "Save Address"}
              </button>
              <button onClick={() => { setShowForm(false); setEditingId(null); setError(""); setForm({ label: "Home", address: "", city: "", pincode: "" }); }} className="px-5 py-2 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
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
            {addresses.filter((addr) => addr.id !== editingId).map((addr) => (
              <div key={addr.id} className={`relative flex items-start justify-between p-4 rounded-2xl border transition-all ${
                addr.isDefault
                  ? "border-saffron/30 bg-saffron/5 dark:bg-saffron/10"
                  : "border-slate-200 dark:border-slate-700"
              } ${openMenu === addr.id ? "z-[50]" : ""}`}>
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
                <div className="relative ml-4 shrink-0" ref={openMenu === addr.id ? menuRef : null}>
                  <button
                    onClick={() => setOpenMenu(openMenu === addr.id ? null : addr.id)}
                    aria-label={`Options for ${addr.label} address`}
                    aria-expanded={openMenu === addr.id}
                    className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <MoreVertical size={16} className="text-slate-400" />
                  </button>
                  <AnimatePresence>
                    {openMenu === addr.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-10 z-20 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-1.5 space-y-0.5"
                      >
                        {!addr.isDefault && (
                          <button
                            onClick={() => { setDefault(addr.id); setOpenMenu(null); }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-saffron/10 hover:text-saffron transition-colors"
                          >
                            <Star size={13} /> Set as default
                          </button>
                        )}
                        <button
                          onClick={() => { startEdit(addr); setOpenMenu(null); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 transition-colors"
                        >
                          <Pencil size={13} /> Edit address
                        </button>
                        <button
                          onClick={() => { remove(addr.id); setOpenMenu(null); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                        <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
                        <button
                          onClick={() => setOpenMenu(null)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        >
                          <X size={13} /> Cancel
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
      <div className="glass rounded-3xl p-8 shadow-sm">
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
                    <label htmlFor={`pw-${key}`} className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5"><Lock size={11} className="inline mr-1" />{label}</label>
                    <div className="relative">
                      <input
                        id={`pw-${key}`}
                        type={showFields[key] ? "text" : "password"}
                        autoComplete={key === "current" ? "current-password" : "new-password"}
                        value={value}
                        onChange={(e) => set(e.target.value)}
                        className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                      />
                      <button
                        type="button"
                        aria-label={showFields[key] ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
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
  const { auth } = useAuth();
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.replace("#", ""));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
  }, [hash]);

  if (!auth) return <Navigate to="/signin" replace />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden antialiased transition-colors duration-300">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
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
            <span className="text-aurora">your way.</span>
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
    </div>
  );
}
