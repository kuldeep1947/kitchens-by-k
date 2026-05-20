import { ChefHat, Truck, Calendar, UtensilsCrossed, Repeat } from "lucide-react";
import JourneyPath from "../ui/journey-path";

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

export default function HowItWorks() {
  return <JourneyPath steps={journeySteps} />;
}
