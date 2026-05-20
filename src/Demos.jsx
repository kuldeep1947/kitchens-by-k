import { BackgroundPaths } from "@/components/ui/background-paths";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Pricing1 } from "@/components/ui/pricing-1";
import { Calendar, Code, FileText, User, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const timelineData = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Feb 2024",
    content: "UI/UX design and system architecture.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and testing.",
    category: "Development",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 60,
  },
  {
    id: 4,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing and bug fixes.",
    category: "Testing",
    icon: User,
    relatedIds: [3, 5],
    status: "pending",
    energy: 30,
  },
  {
    id: 5,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and release.",
    category: "Release",
    icon: Clock,
    relatedIds: [4],
    status: "pending",
    energy: 10,
  },
];

export default function Demos() {
  return (
    <div>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold text-slate-900">← Back to Home</Link>
        <span className="text-xs text-slate-500 font-mono">Component Demos</span>
      </nav>

      {/* 1. Background Paths Hero */}
      <section id="background-paths">
        <BackgroundPaths title="Background Paths" />
      </section>

      {/* 2. Radial Orbital Timeline */}
      <section id="timeline">
        <RadialOrbitalTimeline timelineData={timelineData} />
      </section>

      {/* 3. Pricing */}
      <section id="pricing">
        <Pricing1 />
      </section>
    </div>
  );
}
