import ScrollExpandMedia from "../ui/scroll-expansion-hero";

export default function FoodShowcase() {
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
      <div className="py-12 px-8">
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
