import { motion } from "framer-motion";
import { TestimonialsColumn } from "../ui/testimonials-columns-1";

const testimonials = [
  { text: "Kitchens by K changed our entire lunch culture. The food is fresh, the delivery is punctual, and my team actually looks forward to lunch now.", image: "https://randomuser.me/api/portraits/women/44.jpg", name: "Priya Nair", role: "Product Lead, BKC" },
  { text: "We tried 5 different services before this. Nothing comes close. The quality is restaurant-grade and the consistency is unmatched.", image: "https://randomuser.me/api/portraits/men/32.jpg", name: "Arjun Deshmukh", role: "Engineering Manager" },
  { text: "Employee satisfaction scores around meals went up 35%. It practically pays for itself in productivity.", image: "https://randomuser.me/api/portraits/women/68.jpg", name: "Sneha Kapoor", role: "HR Director" },
  { text: "The variety keeps everyone happy — from regional thalis to continental options. Best corporate food service in Mumbai.", image: "https://randomuser.me/api/portraits/men/75.jpg", name: "Rahul Mehta", role: "CEO, TechVentures" },
  { text: "Our team used to skip lunch or order junk. Now there's a proper meal waiting every day. The nutrition focus is a game-changer.", image: "https://randomuser.me/api/portraits/women/26.jpg", name: "Ananya Sharma", role: "Wellness Lead" },
  { text: "Onboarding was effortless — they handled everything from menu planning to delivery logistics. Zero friction.", image: "https://randomuser.me/api/portraits/men/46.jpg", name: "Vikram Patel", role: "Operations Head" },
  { text: "The packaging is sustainable, the portions are generous, and the taste is consistently excellent. 10/10.", image: "https://randomuser.me/api/portraits/women/52.jpg", name: "Meera Joshi", role: "Sustainability Officer" },
  { text: "We switched from a canteen model to Kitchens by K. Saved costs and improved food quality simultaneously.", image: "https://randomuser.me/api/portraits/men/22.jpg", name: "Karan Singh", role: "Finance Director" },
  { text: "My team literally applauded when I announced we were subscribing. That tells you everything about the food quality.", image: "https://randomuser.me/api/portraits/women/89.jpg", name: "Divya Reddy", role: "Team Lead, Andheri" },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
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
          <span className="glass inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-saffron rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
            Social Proof
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white mt-5 text-center">
            Loved across <span className="text-aurora">Mumbai.</span>
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
