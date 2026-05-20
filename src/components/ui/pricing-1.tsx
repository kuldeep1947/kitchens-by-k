import { CheckIcon, X, ChevronRight, CreditCard, UtensilsCrossed, Users, Building2, CalendarDays } from "lucide-react";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const Pricing1 = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [activeDot, setActiveDot] = useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const index = Math.round((scrollLeft / (scrollWidth - clientWidth)) * (pricingPlans.length - 1));
    setActiveDot(index);
  };

  // Pricing plan data
  const pricingPlans = [
    {
      title: "Weekly",
      popular: false,
      description:
        "Perfect for trying us out. Fresh meals delivered every weekday to your office.",
      price: "₹1,499",
      priceSuffix: "/week",
      features: [
        "5 freshly cooked meals",
        "Free delivery across Mumbai",
        "Flexible skip days",
        "WhatsApp menu updates",
        "Cancel anytime",
      ],
      details: {
        includes: ["Mon–Fri lunch delivery", "Choose from 3 daily options", "Eco-friendly packaging", "Real-time tracking"],
        ideal: "Small teams of 5–15 trying corporate tiffin for the first time",
      },
    },
    {
      title: "Monthly",
      popular: true,
      description:
        "Our most popular plan. Best value for teams who want consistent, quality meals.",
      price: "₹4,999",
      priceSuffix: "/month",
      savingsBadge: "Save ₹1,000 vs weekly",
      features: [
        "22 freshly cooked meals",
        "Priority delivery",
        "Weekend bonus meals",
        "Dedicated account manager",
        "Custom dietary preferences",
        "Cancel anytime",
      ],
      details: {
        includes: ["22 weekday meals + 4 weekend meals", "Priority delivery before 12:30 PM", "Personalized menu preferences", "Monthly feedback sessions", "Dedicated WhatsApp support"],
        ideal: "Teams of 15–50 who want reliable, daily meals with customization",
      },
    },
    {
      title: "Enterprise",
      popular: false,
      description:
        "For large teams and offices. Custom menus, bulk pricing, and dedicated support.",
      price: "Custom",
      priceSuffix: "",
      features: [
        "Unlimited team members",
        "Custom menu planning",
        "Dedicated chef allocation",
        "24/7 support",
        "Onboarding & tasting session",
        "Cancel anytime",
      ],
      details: {
        includes: ["Unlimited headcount", "Custom menu designed with your team", "Dedicated chef & kitchen allocation", "On-site tasting before launch", "Festival & event catering included", "Monthly review meetings"],
        ideal: "Companies with 50+ employees or multiple office locations",
      },
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-16 w-full max-w-6xl mx-auto py-32 px-6 relative">
      {/* Ambient background */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-100/20 dark:bg-emerald-100/20 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="flex flex-col items-center gap-4 w-full relative z-10">
        <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-orange-600 dark:text-emerald-400">Pricing</p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white text-center">
          Simple, transparent pricing.
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md text-center">No hidden fees. No contracts. Cancel anytime.</p>
      </div>

      <div ref={scrollRef} onScroll={handleScroll} className="flex md:grid md:grid-cols-3 gap-5 w-full max-w-5xl relative z-10 pt-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-3xl border backdrop-blur-md transition-all duration-300 shrink-0 w-[80vw] md:w-auto snap-center ${
              plan.popular
                ? "bg-white/80 dark:bg-white/10 border-orange-200 dark:border-emerald-500/30 shadow-xl shadow-orange-100/50 dark:shadow-emerald-500/10 ring-2 ring-orange-500/20 dark:ring-emerald-500/20 backdrop-blur-xl"
                : "bg-white/60 dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-sm hover:shadow-lg backdrop-blur-xl"
            }`}
          >
            {plan.popular && (
              <div className="pt-8 px-8 md:px-9">
                <span className="text-[11px] font-bold tracking-wider uppercase bg-gradient-to-r from-orange-500 to-orange-400 dark:from-emerald-500 dark:to-emerald-400 text-white px-4 py-1 rounded-full shadow-md shadow-orange-500/20 dark:shadow-emerald-500/20">
                  Most Popular
                </span>
              </div>
            )}
            <div className={`${plan.popular ? 'p-8 pt-4 md:px-9' : 'p-8 md:p-9'} flex flex-col h-full gap-6 justify-between`}>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white">{plan.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-[14px] leading-relaxed">
                    {plan.description}
                  </p>
                  <div className="flex flex-wrap items-baseline gap-1 mt-1">
                    <span className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm text-slate-400">{plan.priceSuffix}</span>
                  </div>
                  {plan.savingsBadge && (
                    <span className="inline-block mt-2 text-[11px] font-bold text-orange-600 dark:text-emerald-400 bg-orange-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">
                      {plan.savingsBadge}
                    </span>
                  )}
                </div>

                <div className="w-full h-px bg-slate-100 dark:bg-white/10" />

                <div className="flex flex-col gap-3.5">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-3"
                    >
                      <CheckIcon className="w-4 h-4 text-orange-500 dark:text-emerald-500 shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300 text-[14px]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => setSelectedPlan(index)}
                className={`w-full py-4 rounded-2xl font-semibold text-[14px] cursor-pointer transition-all ${
                  plan.popular
                    ? "bg-orange-600 hover:bg-orange-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-lg shadow-orange-600/20 dark:shadow-emerald-600/20"
                    : "border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white hover:border-orange-600 dark:hover:border-emerald-400 hover:text-orange-600 dark:hover:text-emerald-400"
                }`}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Swipe dots — mobile only */}
      <div className="flex md:hidden items-center justify-center gap-2 mt-2 relative z-10">
        {pricingPlans.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!scrollRef.current) return;
              const cardWidth = scrollRef.current.scrollWidth / pricingPlans.length;
              scrollRef.current.scrollTo({ left: cardWidth * i, behavior: "smooth" });
              setActiveDot(i);
            }}
            className={`rounded-full transition-all duration-300 ${
              activeDot === i
                ? "w-5 h-2 bg-orange-500 dark:bg-emerald-500"
                : "w-2 h-2 bg-slate-300 dark:bg-slate-600"
            }`}
          />
        ))}
      </div>

      {/* Plan details modal */}
      <AnimatePresence>
        {selectedPlan !== null && (
          <PlanModal
            plan={pricingPlans[selectedPlan]}
            onClose={() => setSelectedPlan(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

/* PLAN MODAL — Meal Selection, Customization & Payment */
const mealOptions = [
  { id: "thali", name: "Executive Thali", cal: "650 kcal", subs: [
    { id: "thali-punjabi", name: "Punjabi Thali", desc: "Dal makhani, paneer butter masala, tandoori roti, jeera rice & gulab jamun" },
    { id: "thali-south", name: "South Indian Thali", desc: "Sambar, rasam, kootu, rice, papad, pickle & payasam" },
    { id: "thali-gujarati", name: "Gujarati Thali", desc: "Dal, kadhi, sabzi, roti, rice, farsan & shrikhand" },
    { id: "thali-rajasthani", name: "Rajasthani Thali", desc: "Dal baati churma, gatte ki sabzi, bajra roti & lassi" },
  ]},
  { id: "protein", name: "High-Protein Bowl", cal: "580 kcal", subs: [
    { id: "protein-paneer", name: "Grilled Paneer Bowl", desc: "Grilled paneer tikka, quinoa pilaf, sautéed greens & beetroot hummus" },
    { id: "protein-tofu", name: "Tofu & Tempeh Bowl", desc: "Marinated tofu, tempeh, brown rice, edamame & miso dressing" },
    { id: "protein-egg", name: "Egg White & Chickpea Bowl", desc: "Egg white bhurji, roasted chickpeas, multigrain base & avocado", extra: 20 },
    { id: "protein-soya", name: "Soya Chunks & Sprouts Bowl", desc: "Soya chunks curry, mixed sprouts, millet base & cucumber raita" },
  ]},
  { id: "regional", name: "Regional Special", cal: "600 kcal", subs: [
    { id: "regional-hyderabadi", name: "Hyderabadi Special", desc: "Dum biryani, mirchi ka salan, raita, papad & phirni" },
    { id: "regional-bengali", name: "Bengali Special", desc: "Shorshe begun, cholar dal, luchi, mishti doi & sandesh" },
    { id: "regional-maharashtrian", name: "Maharashtrian Special", desc: "Puran poli, varan bhaat, bharli vangi & sol kadhi" },
    { id: "regional-kerala", name: "Kerala Special", desc: "Kerala sadya — avial, olan, thoran, sambar, rice & payasam" },
  ]},
  { id: "light", name: "Light & Green", cal: "420 kcal", subs: [
    { id: "light-mediterranean", name: "Mediterranean Bowl", desc: "Roasted pumpkin soup, grain bowl, multigrain sourdough & avocado" },
    { id: "light-soup", name: "Soup & Sandwich Combo", desc: "Tomato basil soup, whole wheat veggie sandwich & green detox juice" },
    { id: "light-poke", name: "Veggie Poke Bowl", desc: "Sushi rice, edamame, cucumber, avocado & ponzu", extra: 40 },
    { id: "light-smoothie", name: "Smoothie Bowl & Granola", desc: "Acai smoothie base, seasonal fruits, granola & chia seeds", extra: 25 },
  ]},
];

const customizations = [
  { id: "no-spice", label: "Low spice", extra: 0 },
  { id: "no-onion", label: "No onion/garlic", extra: 0 },
  { id: "extra-protein", label: "Extra protein", extra: 49 },
  { id: "gluten-free", label: "Gluten-free", extra: 29 },
  { id: "vegan", label: "Vegan only", extra: 0 },
  { id: "no-dairy", label: "No dairy", extra: 0 },
];

function MealCategory({ cat, selectedMeals, toggleMeal }: { cat: any; selectedMeals: string[]; toggleMeal: (id: string) => void }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
      >
        <div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{cat.name}</span>
          <span className="ml-2 text-[11px] font-medium text-orange-600 dark:text-emerald-400 bg-orange-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">{cat.cal}</span>
          {selectedMeals.some((id) => cat.subs.find((s: any) => s.id === id)) && (
            <span className="ml-2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ {selectedMeals.filter((id) => cat.subs.find((s: any) => s.id === id)).length} selected
            </span>
          )}
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight size={16} className="text-slate-400 rotate-90" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-2 border-t border-slate-100 dark:border-slate-700 pt-3">
              {cat.subs.map((sub: any) => (
                <button
                  key={sub.id}
                  onClick={() => toggleMeal(sub.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    selectedMeals.includes(sub.id)
                      ? "border-orange-300 dark:border-emerald-600 bg-orange-50 dark:bg-emerald-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                    selectedMeals.includes(sub.id)
                      ? "border-orange-500 bg-orange-500 dark:border-emerald-500 dark:bg-emerald-500"
                      : "border-slate-300 dark:border-slate-600"
                  }`}>
                    {selectedMeals.includes(sub.id) && <CheckIcon size={10} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{sub.name}</span>
                      {sub.extra && <span className="text-[10px] font-medium text-amber-600 shrink-0">+₹{sub.extra}/meal</span>}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{sub.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlanModal({ plan, onClose }: { plan: any; onClose: () => void }) {
  const isEnterprise = plan.title === "Enterprise";
  const steps = isEnterprise
    ? (["details", "meals", "customize", "payment"] as const)
    : (["meals", "customize", "payment"] as const);
  type StepType = typeof steps[number];
  const [step, setStep] = useState<StepType>(steps[0]);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);

  // Enterprise-specific fields
  const [employeeCount, setEmployeeCount] = useState("");
  const [officeLocations, setOfficeLocations] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("12:00-13:00");
  const [companyName, setCompanyName] = useState("");

  // Billing fields (all plans)
  const [billingName, setBillingName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  const toggleMeal = (subId: string) => {
    setSelectedMeals((prev) => {
      if (prev.includes(subId)) return prev.filter((m) => m !== subId);
      if (!isEnterprise && prev.length >= getMealCount()) return prev;
      return [...prev, subId];
    });
  };

  const toggleCustomization = (id: string) => {
    setSelectedCustomizations((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  // Calculate extras
  const getMealCount = () => {
    if (plan.title === "Weekly") return 5;
    if (plan.title === "Monthly") return 22;
    return 1; // Enterprise — per meal basis until quote
  };

  const getBasePrice = () => {
    const numStr = plan.price.replace(/[^\d]/g, "");
    return numStr ? parseInt(numStr) : 0;
  };

  const getVariantExtras = () => {
    let total = 0;
    selectedMeals.forEach((subId) => {
      mealOptions.forEach((cat) => {
        const sub = cat.subs.find((s) => s.id === subId);
        if (sub?.extra) total += sub.extra;
      });
    });
    return total;
  };

  const getCustomizationExtras = () => {
    return selectedCustomizations.reduce((sum, id) => {
      const c = customizations.find((x) => x.id === id);
      return sum + (c?.extra || 0);
    }, 0);
  };

  const mealCount = getMealCount();
  const extrasPerMeal = getVariantExtras() + getCustomizationExtras();
  const totalExtras = extrasPerMeal * mealCount;
  const basePrice = getBasePrice();
  const finalPrice = basePrice + totalExtras;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-lg max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {plan.title} Plan
                </h3>
                {plan.popular && (
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-orange-500 dark:bg-emerald-500 text-white px-2.5 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {plan.price}<span className="text-slate-400">{plan.priceSuffix}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={18} className="text-slate-400" />
            </button>
          </div>
          {/* Step indicators */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto">
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <button
                  onClick={() => {
                    const currentIdx = steps.indexOf(step);
                    const targetIdx = steps.indexOf(s);
                    if (targetIdx <= currentIdx) setStep(s);
                    if (s === "meals" && isEnterprise && !employeeCount) return;
                    if ((s === "customize" || s === "payment") && selectedMeals.length === 0) return;
                  }}
                  className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full transition-colors whitespace-nowrap ${
                    step === s
                      ? "bg-orange-100 dark:bg-emerald-900/40 text-orange-700 dark:text-emerald-400"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {i + 1}. {s === "details" ? "Details" : s === "meals" ? "Meals" : s === "customize" ? "Customize" : "Payment"}
                </button>
                {i < steps.length - 1 && <ChevronRight size={12} className="text-slate-300 dark:text-slate-600 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 min-h-0">
          <AnimatePresence mode="wait">
            {step === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <p className="text-[11px] font-semibold tracking-wider uppercase text-orange-600 dark:text-emerald-400 mb-1">
                  Company Details
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
                  Help us tailor the perfect plan for your organization
                </p>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                    <Building2 size={12} className="inline mr-1.5 text-slate-400" />Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., McKinsey & Company"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                    <Users size={12} className="inline mr-1.5 text-slate-400" />Number of Employees
                  </label>
                  <select
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-emerald-800 appearance-none cursor-pointer"
                  >
                    <option value="">Select headcount</option>
                    <option value="50-100">50–100 employees</option>
                    <option value="100-200">100–200 employees</option>
                    <option value="200-500">200–500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                    Office Location(s)
                  </label>
                  <input
                    type="text"
                    value={officeLocations}
                    onChange={(e) => setOfficeLocations(e.target.value)}
                    placeholder="e.g., BKC, Andheri East, Powai"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                    <CalendarDays size={12} className="inline mr-1.5 text-slate-400" />Preferred Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-emerald-800 [appearance:textfield]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                    Delivery Window
                  </label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-emerald-800 appearance-none cursor-pointer"
                  >
                      <option value="11:30-12:30">11:30 AM – 12:30 PM</option>
                      <option value="12:00-13:00">12:00 PM – 1:00 PM</option>
                      <option value="12:30-13:30">12:30 PM – 1:30 PM</option>
                      <option value="13:00-14:00">1:00 PM – 2:00 PM</option>
                    </select>
                </div>
              </motion.div>
            )}

            {step === "meals" && (
              <motion.div
                key="meals"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                <p className="text-[11px] font-semibold tracking-wider uppercase text-orange-600 dark:text-emerald-400 mb-3">
                  Select your preferred meals
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
                  {isEnterprise ? "Pick as many as you'd like — we'll plan your menu accordingly" : `Pick up to ${getMealCount()} — we'll rotate them through the week`}
                  {!isEnterprise && <span className="ml-2 font-semibold text-slate-600 dark:text-slate-300">{selectedMeals.length}/{getMealCount()} selected</span>}
                </p>
                {mealOptions.map((cat) => (
                  <MealCategory key={cat.id} cat={cat} selectedMeals={selectedMeals} toggleMeal={toggleMeal} />
                ))}
              </motion.div>
            )}

            {step === "customize" && (
              <motion.div
                key="customize"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <p className="text-[11px] font-semibold tracking-wider uppercase text-orange-600 dark:text-emerald-400 mb-1">
                  Customize your meals
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
                  Select any dietary preferences — we'll adapt all your meals accordingly
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {customizations.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => toggleCustomization(c.id)}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left text-[13px] transition-all ${
                        selectedCustomizations.includes(c.id)
                          ? "border-orange-300 dark:border-emerald-600 bg-orange-50 dark:bg-emerald-900/20 text-orange-800 dark:text-emerald-300 font-medium"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        selectedCustomizations.includes(c.id)
                          ? "border-orange-500 bg-orange-500 dark:border-emerald-500 dark:bg-emerald-500"
                          : "border-slate-300 dark:border-slate-600"
                      }`}>
                        {selectedCustomizations.includes(c.id) && <CheckIcon size={10} className="text-white" />}
                      </div>
                      <span className="flex-1">{c.label}</span>
                      {c.extra > 0 && (
                        <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">+₹{c.extra}</span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 block mb-2">
                    Additional notes
                  </label>
                  <textarea
                    placeholder="E.g., allergic to peanuts, prefer less oil..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-emerald-800 resize-none h-20"
                  />
                </div>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <p className="text-[11px] font-semibold tracking-wider uppercase text-orange-600 dark:text-emerald-400 mb-1">
                  Order Summary
                </p>
                {/* Summary */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Plan</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{plan.title} — {plan.price}</span>
                  </div>
                  {isEnterprise && employeeCount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Employees</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{employeeCount}</span>
                    </div>
                  )}
                  {isEnterprise && officeLocations && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Locations</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300 text-right max-w-[200px]">{officeLocations}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Meals selected</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300 text-right max-w-[200px]">
                      {selectedMeals.map((subId) => {
                        for (const cat of mealOptions) {
                          const sub = cat.subs.find((s) => s.id === subId);
                          if (sub) return sub.name;
                        }
                      }).join(", ")}
                    </span>
                  </div>
                  {getVariantExtras() > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Meal upgrades</span>
                      <span className="font-medium text-amber-600 dark:text-amber-400">+₹{getVariantExtras()}/meal × {mealCount} = ₹{getVariantExtras() * mealCount}</span>
                    </div>
                  )}
                  {selectedCustomizations.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Preferences</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300 text-right max-w-[200px]">
                        {selectedCustomizations.map((id) => customizations.find((c) => c.id === id)?.label).join(", ")}
                      </span>
                    </div>
                  )}
                  {getCustomizationExtras() > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Customization add-ons</span>
                      <span className="font-medium text-amber-600 dark:text-amber-400">+₹{getCustomizationExtras()}/meal × {mealCount} = ₹{getCustomizationExtras() * mealCount}</span>
                    </div>
                  )}
                  {isEnterprise && deliveryTime && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Delivery window</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{deliveryTime}</span>
                    </div>
                  )}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-center">
                    <span className="font-semibold text-slate-900 dark:text-white">Total</span>
                    <div className="text-right">
                      <span className="font-bold text-lg text-slate-900 dark:text-white">
                        {basePrice > 0 ? `₹${finalPrice.toLocaleString("en-IN")}` : "Custom quote"}
                      </span>
                      {totalExtras > 0 && (
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                          ₹{basePrice.toLocaleString("en-IN")} + ₹{extrasPerMeal}/meal × {mealCount} meals
                        </p>
                      )}
                      {isEnterprise && (
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                          We'll share a quote within 24 hours
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Billing Details */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">Billing Details</p>
                    {localStorage.getItem("kbk_auth") && (
                      <button
                        type="button"
                        onClick={() => {
                          const stored = localStorage.getItem("kbk_user");
                          const user = stored ? JSON.parse(stored) : null;
                          if (billingName && billingEmail && billingPhone) {
                            setBillingName("");
                            setBillingEmail("");
                            setBillingPhone("");
                          } else if (user) {
                            setBillingName(user.firstName + " " + user.lastName);
                            setBillingEmail(user.email);
                            setBillingPhone(user.mobile);
                          }
                        }}
                        className="flex items-center gap-1.5 text-[11px] font-medium text-orange-600 dark:text-emerald-400 hover:text-orange-700 dark:hover:text-emerald-300 transition-colors"
                      >
                        <div className="w-3.5 h-3.5 rounded border border-orange-400 dark:border-emerald-500 flex items-center justify-center">
                          {billingName && billingEmail && billingPhone && (
                            <CheckIcon size={8} className="text-orange-600 dark:text-emerald-400" />
                          )}
                        </div>
                        Use profile details
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={billingName}
                        onChange={(e) => setBillingName(e.target.value)}
                        placeholder="Full name"
                        className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-emerald-800"
                      />
                      <input
                        type="tel"
                        value={billingPhone}
                        onChange={(e) => setBillingPhone(e.target.value)}
                        placeholder="Phone number"
                        className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-emerald-800"
                      />
                    </div>
                    <input
                      type="email"
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      placeholder="Billing email"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-emerald-800"
                    />
                    <input
                      type="text"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      placeholder="GST Number (optional)"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-emerald-800"
                    />
                  </div>
                </div>

                {/* Payment method — only for non-Enterprise */}
                {!isEnterprise && (
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-3">Payment method</p>
                    <div className="space-y-2">
                      {[
                        { id: "upi", label: "UPI / Google Pay / PhonePe", icon: "📱" },
                        { id: "card", label: "Credit / Debit Card", icon: "💳" },
                        { id: "netbanking", label: "Net Banking", icon: "🏦" },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-emerald-600 cursor-pointer transition-colors"
                        >
                          <input type="radio" name="payment" className="accent-orange-600 dark:accent-emerald-600" defaultChecked={method.id === "upi"} />
                          <span className="text-lg">{method.icon}</span>
                          <span className="text-sm text-slate-700 dark:text-slate-300">{method.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
          {step === "details" && (
            <button
              onClick={() => employeeCount && companyName ? setStep("meals") : undefined}
              disabled={!employeeCount || !companyName}
              className={`w-full py-3 rounded-2xl font-semibold text-[14px] transition-all cursor-pointer flex items-center justify-center gap-2 ${
                employeeCount && companyName
                  ? "bg-gradient-to-b from-slate-700 to-slate-900 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 shadow hover:brightness-105"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
              }`}
            >
              Continue to Meals <ChevronRight size={16} />
            </button>
          )}
          {step === "meals" && (
            <div className="flex gap-3">
              {isEnterprise && (
                <button
                  onClick={() => setStep("details")}
                  className="px-5 py-3 rounded-2xl text-[14px] font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => selectedMeals.length > 0 && setStep("customize")}
                disabled={selectedMeals.length === 0}
                className={`flex-1 py-3 rounded-2xl font-semibold text-[14px] transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  selectedMeals.length > 0
                    ? "bg-gradient-to-b from-slate-700 to-slate-900 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 shadow hover:brightness-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                }`}
              >
                Continue to Customize <ChevronRight size={16} />
              </button>
            </div>
          )}
          {step === "customize" && (
            <div className="flex gap-3">
              <button
                onClick={() => setStep("meals")}
                className="px-5 py-3 rounded-2xl text-[14px] font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep("payment")}
                className="flex-1 py-3 rounded-2xl font-semibold text-[14px] bg-gradient-to-b from-slate-700 to-slate-900 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 shadow hover:brightness-105 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Continue to Payment <ChevronRight size={16} />
              </button>
            </div>
          )}
          {step === "payment" && (
            <div className="flex gap-3">
              <button
                onClick={() => setStep("customize")}
                className="px-5 py-3 rounded-2xl text-[14px] font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (isEnterprise) {
                    alert(`Request submitted! We'll send a custom quote for ${companyName} (${employeeCount} employees) within 24 hours. 🎉`);
                  } else {
                    localStorage.setItem("kbk_active_plan", JSON.stringify({
                      title: plan.title,
                      price: plan.price,
                      priceSuffix: plan.priceSuffix,
                      meals: plan.title === "Weekly" ? "5 meals/week" : "22 meals/month",
                    }));
                    alert(`Payment successful! Your ${plan.title} plan is now active. 🎉`);
                  }
                  onClose();
                }}
                disabled={!billingName || !billingEmail || !billingPhone}
                className={`flex-1 py-3 rounded-2xl font-semibold text-[14px] transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  billingName && billingEmail && billingPhone
                    ? "bg-orange-600 hover:bg-orange-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-lg shadow-orange-600/20 dark:shadow-emerald-600/20"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                }`}
              >
                <CreditCard size={16} /> {isEnterprise ? "Request Quote" : `Pay ${basePrice > 0 ? `₹${finalPrice.toLocaleString("en-IN")}` : plan.price}`}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export { Pricing1 };