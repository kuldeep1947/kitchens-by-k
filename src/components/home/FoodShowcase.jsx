import ScrollGallery from "../ui/scroll-gallery";

// A brand-quality story (NOT the menu) — sourcing, craft, nutrition, delivery.
const story = [
  {
    title: "Sourced fresh\nat sunrise",
    caption: "Local Mumbai farms, every single morning. Nothing frozen, nothing from yesterday.",
    label: "Ingredients",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1100&h=1400&fit=crop&q=80",
  },
  {
    title: "Cooked by\nreal chefs",
    caption: "Open flames, never microwaves. Every meal is made the same day it reaches you.",
    label: "The Kitchen",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1100&h=1400&fit=crop&q=80",
  },
  {
    title: "Balanced down\nto the macro",
    caption: "Protein, carbs and fats dialed in by our nutritionists — health you don't have to think about.",
    label: "Nutrition",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1100&h=1400&fit=crop&q=80",
  },
  {
    title: "On your desk\nby noon",
    caption: "Cold-chain logistics across the city. Hot, sealed and on time — every single day.",
    label: "Delivery",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1100&h=1400&fit=crop&q=80",
  },
];

export default function FoodShowcase() {
  return (
    <ScrollGallery
      dishes={story}
      eyebrow="The Difference"
      title="Not just food.|Done right."
      subtitle="From the farm to your desk, every step is engineered for freshness. Scroll to see how."
    />
  );
}
