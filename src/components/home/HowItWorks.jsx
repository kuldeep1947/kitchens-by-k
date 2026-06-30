import { Truck, Calendar, UtensilsCrossed, Repeat, Star } from "lucide-react";
import JourneyPath from "../ui/journey-path";

const journeySteps = [
  {
    id: 1,
    title: "Pick Your Plan",
    description: "Choose weekly, monthly or enterprise — sized to your team and set up in just a few minutes.",
    icon: Calendar,
  },
  {
    id: 2,
    title: "Customize Your Menu",
    description: "Set dietary preferences — veg, vegan, gluten-free, low-spice — and swap in the dishes your team loves.",
    icon: UtensilsCrossed,
  },
  {
    id: 3,
    title: "Delivered to Your Desk",
    description: "Hot, sealed meals arrive before lunch — on time, every day, right across Mumbai.",
    icon: Truck,
  },
  {
    id: 4,
    title: "Rate & Personalize",
    description: "Rate each meal and we fine-tune future menus to match your team's taste over time.",
    icon: Star,
  },
  {
    id: 5,
    title: "Flex Anytime",
    description: "Pause, skip a day, or cancel whenever you need — no contracts, no lock-in.",
    icon: Repeat,
  },
];

export default function HowItWorks() {
  return <JourneyPath steps={journeySteps} />;
}
