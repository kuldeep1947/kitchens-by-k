import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Phone, Mail, MapPin, ChefHat, Truck, Calendar, UtensilsCrossed, Repeat, ChevronDown, User, Menu, X } from "lucide-react";
import { BackgroundPaths } from "./components/ui/background-paths";
import ScrollExpandMedia from "./components/ui/scroll-expansion-hero";
import JourneyPath from "./components/ui/journey-path";
import { Pricing1 } from "./components/ui/pricing-1";
import { TestimonialsColumn } from "./components/ui/testimonials-columns-1";
import { Spotlight } from "./components/ui/spotlight";
import { PromptInput } from "./components/ui/ai-chat-input";
import { AnimatedThemeToggler } from "./components/ui/animated-theme-toggler";
import Logo from "./components/shared/Logo";
import Reveal, { scaleIn } from "./components/shared/Reveal";
import "./App.css";

/* NAVBAR */
function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const menuRef = useRef(null);
  const mobileRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("kbk_auth");
    return stored ? JSON.parse(stored) : null;
  });
  const [avatar, setAvatar] = useState(() => {
    const user = localStorage.getItem("kbk_user");
    return user ? JSON.parse(user).avatar : null;
  });

  // Listen for avatar changes from profile page
  useEffect(() => {
    const handler = () => {
      const user = localStorage.getItem("kbk_user");
      setAvatar(user ? JSON.parse(user).avatar : null);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

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
    setAvatar(null);
    setShowMenu(false);
  };
  return (
    <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 shadow-lg shadow-slate-200/30 dark:shadow-black/20 rounded-2xl px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Logo className="w-8 h-8" />
          <span className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">Kitchens by K</span>
        </div>
        <div className="hidden md:flex items-center gap-7 text-[13px] text-slate-500 dark:text-slate-400 font-medium">
          <a href="#how" className="hover:text-slate-900 dark:hover:text-white transition-colors">How It Works</a>
          <a href="#menu" className="hover:text-slate-900 dark:hover:text-white transition-colors">Menu</a>
          <a href="#pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a>
          <Link to="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</Link>
        </div>
        <div className="flex items-center gap-3">
          <AnimatedThemeToggler />
          {auth ? (
            <Link to="/profile">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                className="hidden md:block bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 cursor-pointer">
                My Plan
              </motion.span>
            </Link>
          ) : (
            <motion.a href="#pricing" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              className="hidden md:block bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
              Get Started
            </motion.a>
          )}
          {/* Mobile hamburger */}
          <button ref={mobileToggleRef} onClick={() => setShowMobile(!showMobile)} className="md:hidden flex items-center justify-center w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {showMobile ? <X size={18} className="text-slate-700 dark:text-white" /> : <Menu size={18} className="text-slate-700 dark:text-white" />}
          </button>
          <div className="relative" ref={menuRef}>
            <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-orange-100 dark:bg-emerald-900/40 flex items-center justify-center">
                {avatar ? (
                  avatar.startsWith("data:") ? (
                    <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg">{avatar}</span>
                  )
                ) : auth ? (
                  <span className="text-[11px] font-bold text-orange-700 dark:text-emerald-400">
                    {auth.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </span>
                ) : (
                  <User size={16} className="text-orange-700 dark:text-emerald-400" />
                )}
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 overflow-hidden"
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
            className="md:hidden mt-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="flex flex-col p-3 gap-1 text-[14px] font-medium">
              <a href="#how" onClick={() => setShowMobile(false)} className="px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">How It Works</a>
              <a href="#menu" onClick={() => setShowMobile(false)} className="px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Menu</a>
              <a href="#pricing" onClick={() => setShowMobile(false)} className="px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Pricing</a>
              <Link to="/about" onClick={() => setShowMobile(false)} className="px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">About</Link>
              <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
              {auth ? (
                <>
                  <Link to="/profile" onClick={() => setShowMobile(false)} className="px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Profile</Link>
                  <button onClick={() => { handleSignOut(); setShowMobile(false); }} className="px-4 py-3 rounded-xl text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Sign Out</button>
                </>
              ) : null}
              {auth ? (
                <Link to="/profile" onClick={() => setShowMobile(false)} className="mx-1 mt-1 px-4 py-3 rounded-xl text-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold">My Plan</Link>
              ) : (
                <a href="#pricing" onClick={() => setShowMobile(false)} className="mx-1 mt-1 px-4 py-3 rounded-xl text-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold">Get Started</a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* HERO - BACKGROUND PATHS */
function Hero() {
  return (
    <BackgroundPaths
      title="Premium Meals Delivered"
      subtitle="Chef-crafted, nutrition-balanced lunches for Mumbai's busiest professionals. Subscribe once, eat fresh every day."
      buttonText="View Plans"
      buttonHref="#pricing"
      badge="Now Serving Mumbai"
    />
  );
}

/* HOW IT WORKS - JOURNEY PATH */
const journeySteps = [
  {
    id: 1,
    title: "Subscribe",
    description: "Pick a plan that fits your team — weekly or monthly. Pause or cancel anytime.",
    icon: Calendar,
  },
  {
    id: 2,
    title: "We Cook",
    description: "Our chefs prepare balanced meals every morning with locally sourced ingredients.",
    icon: ChefHat,
  },
  {
    id: 3,
    title: "Delivered",
    description: "Hot meals reach your desk before lunch. Always on time, across Mumbai.",
    icon: Truck,
  },
  {
    id: 4,
    title: "Enjoy",
    description: "Restaurant-quality food without leaving your office. Every single day.",
    icon: UtensilsCrossed,
  },
  {
    id: 5,
    title: "Repeat",
    description: "New menu every week. Rate meals and we'll personalize your preferences.",
    icon: Repeat,
  },
];

/* FOOD SHOWCASE - SCROLL EXPAND */
function FoodShowcase() {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1400&h=800&fit=crop&q=85"
      darkMediaSrc="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1400&h=800&fit=crop&q=85"
      bgImageSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop&q=80"
      title="Fresh Every Day"
      date="Now Serving Mumbai"
      scrollToExpand="Scroll to explore"
      textBlend
    >
      <div className="py-12 px-8 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-6">
            Restaurant-Quality, Office-Delivered
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every meal is prepared fresh each morning by our team of experienced chefs using locally sourced ingredients. No reheating, no compromises.
          </p>
        </div>
      </div>
    </ScrollExpandMedia>
  );
}

function HowItWorks() {
  return <JourneyPath steps={journeySteps} />;
}

/* MENU WITH REAL IMAGES */
function MenuSection() {
  const [expanded, setExpanded] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const items = [
    { name: "Executive Thali", desc: "Dal, sabzi, roti, rice, raita & dessert", cal: "650 kcal", category: "Veg", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=500&fit=crop&q=80", contents: ["Toor Dal Tadka", "Seasonal Sabzi", "Tandoori Roti (3)", "Steamed Basmati Rice", "Fresh Boondi Raita", "Gulab Jamun"] },
    { name: "High-Protein Bowl", desc: "Grilled paneer, quinoa, greens & hummus", cal: "580 kcal", category: "High-Protein", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop&q=80", contents: ["Grilled Paneer Tikka", "Quinoa Pilaf", "Sautéed Greens", "Beetroot Hummus", "Roasted Chickpeas", "Lemon Tahini Drizzle"] },
    { name: "Regional Special", desc: "Rotating weekly menu from across India", cal: "600 kcal", category: "Veg", img: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=500&h=500&fit=crop&q=80", contents: ["This Week: Hyderabadi Biryani", "Mirchi Ka Salan", "Raita", "Papad", "Gutti Vankaya", "Phirni"] },
    { name: "Light & Green", desc: "Seasonal salad, soup & multigrain bread", cal: "420 kcal", category: "Light", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80", contents: ["Roasted Pumpkin Soup", "Mediterranean Grain Bowl", "Multigrain Sourdough", "Avocado Spread", "Seasonal Fruit", "Green Detox Juice"] },
  ];

  const filters = ["All", "Veg", "High-Protein", "Light"];
  const filtered = activeFilter === "All" ? items : items.filter((i) => i.category === activeFilter);

  return (
    <section id="menu" className="py-32 md:py-40 px-6 relative">
      <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-saffron/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal><p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-saffron mb-4">The Menu</p></Reveal>
        <Reveal custom={1}>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
              Today&apos;s specials.<br /><span className="text-slate-400">Always fresh.</span>
            </h2>
            <Link to="/menu">
              <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="hidden md:inline-flex items-center gap-2 text-[13px] font-semibold text-saffron hover:text-amber-600 transition-colors cursor-pointer">
                View Full Menu <ArrowRight size={15} />
              </motion.span>
            </Link>
          </div>
        </Reveal>

        {/* Filter bar */}
        <Reveal custom={2}>
          <div className="flex gap-2 mb-6 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => { setActiveFilter(f); setExpanded(null); }}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold border transition-all ${
                  activeFilter === f
                    ? "bg-saffron text-white border-saffron shadow-lg shadow-saffron/20"
                    : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-saffron hover:text-saffron"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="md:hidden mb-8">
            <Link to="/menu" className="inline-flex items-center gap-2 text-[13px] font-semibold text-saffron hover:text-amber-600 transition-colors">
              View Full Menu <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        {/* Bento grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length === 0 ? (
              <p className="text-slate-400 text-center py-16">No items in this category.</p>
            ) : filtered.length === 1 ? (
              <MenuCard item={filtered[0]} i={0} expanded={expanded} setExpanded={setExpanded} featured />
            ) : (
              <div className="grid gap-5">
                <MenuCard item={filtered[0]} i={0} expanded={expanded} setExpanded={setExpanded} featured />
                <div className={`grid gap-5 ${ filtered.length - 1 === 1 ? "grid-cols-1" : filtered.length - 1 === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3" }`}>
                  {filtered.slice(1).map((item, i) => (
                    <MenuCard key={item.name} item={item} i={i + 1} expanded={expanded} setExpanded={setExpanded} featured={filtered.length - 1 === 1} flipLayout={filtered.length - 1 === 1} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function MenuCard({ item, i, expanded, setExpanded, featured = false, flipLayout = false }) {
  return (
    <Reveal variants={scaleIn} custom={i}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(expanded === i ? null : i); } }}
        className={`group bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-slate-700/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-black/20 transition-all duration-500 cursor-pointer ${
          featured ? `flex flex-col md:h-[280px] ${flipLayout ? "md:flex-row-reverse" : "md:flex-row"}` : ""
        }`}
        onClick={() => setExpanded(expanded === i ? null : i)}
      >
        <div className={`overflow-hidden relative ${ featured ? "md:w-1/2 h-56 md:h-full" : "h-56" }`}>
          <img src={item.img} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">{item.category}</span>
          </div>
          <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-[11px] font-medium text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full">
            Tap to see contents
          </div>
        </div>
        <div className={`p-6 ${ featured ? "md:w-1/2 flex flex-col justify-center overflow-y-auto" : "" }`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.name}</h3>
            <span className="text-[12px] font-semibold text-saffron bg-saffron/5 px-2.5 py-1 rounded-full">{item.cal}</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[14px]">{item.desc}</p>
          <AnimatePresence>
            {expanded === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-saffron mb-3">What's inside</p>
                  <div className="grid grid-cols-2 gap-2">
                    {item.contents.map((c) => (
                      <div key={c} className="flex items-center gap-2 text-[13px] text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 dark:bg-emerald-500 shrink-0" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
}

/* PRICING */
function Pricing() {
  return (
    <section id="pricing" className="relative">
      <div className="relative z-10">
        <Pricing1 />
      </div>
    </section>
  );
}

/* TESTIMONIALS */
const testimonials = [
  {
    text: "Kitchens by K changed our entire lunch culture. The food is fresh, the delivery is punctual, and my team actually looks forward to lunch now.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Priya Nair",
    role: "Product Lead, BKC",
  },
  {
    text: "We tried 5 different services before this. Nothing comes close. The quality is restaurant-grade and the consistency is unmatched.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Arjun Deshmukh",
    role: "Engineering Manager",
  },
  {
    text: "Employee satisfaction scores around meals went up 35%. It practically pays for itself in productivity.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Sneha Kapoor",
    role: "HR Director",
  },
  {
    text: "The variety keeps everyone happy — from regional thalis to continental options. Best corporate food service in Mumbai.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Rahul Mehta",
    role: "CEO, TechVentures",
  },
  {
    text: "Our team used to skip lunch or order junk. Now there's a proper meal waiting every day. The nutrition focus is a game-changer.",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    name: "Ananya Sharma",
    role: "Wellness Lead",
  },
  {
    text: "Onboarding was effortless — they handled everything from menu planning to delivery logistics. Zero friction.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    name: "Vikram Patel",
    role: "Operations Head",
  },
  {
    text: "The packaging is sustainable, the portions are generous, and the taste is consistently excellent. 10/10.",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    name: "Meera Joshi",
    role: "Sustainability Officer",
  },
  {
    text: "We switched from a canteen model to Kitchens by K. Saved costs and improved food quality simultaneously.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Karan Singh",
    role: "Finance Director",
  },
  {
    text: "My team literally applauded when I announced we were subscribing. That tells you everything about the food quality.",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    name: "Divya Reddy",
    role: "Team Lead, Andheri",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

function Testimonials() {
  return (
    <section className="py-28 px-6 relative">
      <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-saffron/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-saffron bg-saffron/[0.06] border border-saffron/10 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
            Social Proof
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white mt-5 text-center">
            Loved across Mumbai.
          </h2>
          <p className="text-center mt-4 text-slate-500 text-[15px]">
            See what teams across the city have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}

/* FLOATING FOOD EMOJIS */
function FloatingEmojis() {
  const emojis = [
    { emoji: "🍱", x: "10%", duration: 4, delay: 0 },
    { emoji: "🥗", x: "25%", duration: 5, delay: 0.5 },
    { emoji: "🍛", x: "45%", duration: 4.5, delay: 0.2 },
    { emoji: "🥘", x: "65%", duration: 5.5, delay: 0.8 },
    { emoji: "🍜", x: "80%", duration: 4, delay: 0.3 },
    { emoji: "🥙", x: "90%", duration: 5, delay: 0.1 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {emojis.map((e, i) => (
        <motion.span
          key={i}
          className="absolute text-4xl select-none"
          style={{ left: e.x, bottom: "-10%" }}
          animate={{ y: ["-10%", "-110%"], rotate: [0, 15, -15, 0], opacity: [0, 0.4, 0.4, 0] }}
          transition={{ duration: e.duration, delay: e.delay, repeat: Infinity, ease: "linear" }}
        >
          {e.emoji}
        </motion.span>
      ))}
    </div>
  );
}

/* SPOTLIGHT CTA SECTION */
function SplineShowcase() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="w-full rounded-3xl relative overflow-hidden border border-slate-800/50 bg-slate-900">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(5, 150, 105, 0.25)" />
          <FloatingEmojis />
          <div className="flex flex-col md:flex-row min-h-[420px]">
            {/* Left content */}
            <div className="flex-1 p-10 md:p-14 relative z-10 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-saffron mb-6 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                Limited Spots Available
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300 leading-tight">
                Your Team Deserves<br />Better Lunch.
              </h2>
              <p className="mt-5 text-slate-400 max-w-md leading-relaxed text-[15px]">
                Join Mumbai&apos;s top companies — from startups to MNCs — who&apos;ve made the switch to chef-crafted daily meals. No more sad desk lunches.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <motion.a href="mailto:hello@kitchensbyk.com" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-dark text-white font-semibold px-7 py-3.5 rounded-2xl text-[14px] shadow-lg shadow-saffron/20 transition-colors w-fit">
                  Book a Tasting <ArrowRight size={16} />
                </motion.a>
                <a href="tel:+919876543210" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium px-4 py-3.5 text-[14px] transition-colors">
                  <Phone size={15} /> Or call us
                </a>
              </div>
            </div>
            {/* Right image */}
            <div className="flex-1 relative min-h-[280px] md:min-h-0">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&q=80"
                alt="Fresh gourmet food spread"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ASK AI CONCIERGE */
const quickResponses = {
  "View this week's menu": "This week we're serving: Mon — Punjabi Thali, Tue — Grilled Paneer Bowl, Wed — Hyderabadi Biryani Special, Thu — Mediterranean Bowl, Fri — South Indian Thali. All freshly prepared every morning! 🍱",
  "Pricing for 50+ employees": "For teams of 50+, our Enterprise plan offers custom pricing, dedicated chef allocation, and a free on-site tasting session before launch. Drop us an email at hello@kitchensbyk.com and we'll get back within 24 hours with a tailored quote! 📋",
  "Delivery areas": "We currently deliver across Mumbai — BKC, Andheri, Powai, Lower Parel, Nariman Point, Goregaon, Malad, and more. If your area isn't listed, reach out and we'll check feasibility! 🚚",
  "Share feedback": "We'd love to hear from you! You can reach us at hello@kitchensbyk.com or WhatsApp us at +91 98765 43210. Your feedback helps us serve you better every day. 💬",
};

function AskSection() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (value) => {
    const res = quickResponses[value];
    setResponse(res || "Thanks for your question! Our team will get back to you shortly at hello@kitchensbyk.com 😊");
    setInputValue("");
  };

  const handleQuickAction = (q) => {
    setInputValue(q);
    setResponse("");
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] bg-orange-200/[0.08] dark:bg-emerald-900/[0.1] rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-saffron mb-4">AI Concierge</p>
        </Reveal>
        <Reveal custom={1}>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-4">
            Have a question?
          </h2>
        </Reveal>
        <Reveal custom={2}>
          <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-lg mx-auto">
            Ask about our menus, pricing, delivery areas, or anything else. Our AI assistant is here to help.
          </p>
        </Reveal>
        <Reveal custom={3}>
          <PromptInput
            placeholder="Ask about menus, pricing, delivery..."
            onSubmit={handleSubmit}
            externalValue={inputValue}
          />
        </Reveal>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 max-w-2xl mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm text-slate-600 dark:text-slate-300 text-left shadow-sm"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-saffron mb-2">Kitchens by K</p>
            {response}
          </motion.div>
        )}
        <Reveal custom={4}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-slate-400 dark:text-slate-500">Quick actions:</span>
            {["View this week's menu", "Pricing for 50+ employees", "Delivery areas", "Share feedback"].map((q) => (
              <button
                key={q}
                onClick={() => handleQuickAction(q)}
                className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-orange-50 hover:border-orange-200 dark:hover:bg-emerald-900/20 dark:hover:border-emerald-700 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* FOOTER */
function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-6 rounded-t-[3rem]">
      <div className="max-w-6xl mx-auto">
        {/* CTA */}
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
          <p className="text-[12px] text-slate-600">By continuing past this page, you agree to our <a href="#" className="hover:text-slate-400 underline">Terms of Service</a>, <a href="#" className="hover:text-slate-400 underline">Privacy Policy</a> and <a href="#" className="hover:text-slate-400 underline">Cookie Policy</a>.</p>
          <p className="text-[12px] text-slate-600 shrink-0">{new Date().getFullYear()} &copy; Kitchens by K&trade;. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* APP */
export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden antialiased transition-colors duration-300">
      <Navbar />
      <Hero />
      <FoodShowcase />
      <HowItWorks />
      <MenuSection />
      <Pricing />
      <Testimonials />
      <SplineShowcase />
      <AskSection />
      <Footer />
    </div>
  );
}
