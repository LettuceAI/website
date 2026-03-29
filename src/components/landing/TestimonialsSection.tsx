import {
    TestimonialsColumn,
    type Testimonial,
} from "@/components/ui/testimonials-columns";
import { motion } from "framer-motion";

const testimonials: Testimonial[] = [
    { text: "been using this for some weeks now and it didnt forget important stuff which is rare", name: "abrasive_carcass" },
    { text: "first day was confusing but after you understand how memory works its actually good", name: "TheObeseBoardroom" },
    { text: "characters feel more consistent here. they dont randomly change personality", name: "lastingequation" },
    { text: "not perfect english on my side but conversation flows better than expected", name: "gullible_basin" },
    { text: "i was expecting another hype app but its actually usable long term", name: "RuddySetup" },
    { text: "feels like it pays attention instead of repeating same stuff", name: "RevolvingSquid" },
    { text: "setup took time but after that i stopped thinking about the app and just use it", name: "KaleidoscopicMeans" },
    { text: "way less random replies compared to what i used before", name: "violent_curator" },
    { text: "feels less repetitive than most ai chats i tried", name: "spottediceberg" },
    { text: "i keep coming back to same character and it still makes sense", name: "RevolvingSquid" },
    { text: "better long chats. short chats feel same everywhere anyway", name: "gleamingsharpness7" },
    { text: "feels more thought put into replies not just filler text", name: "violent_curator" },
    { text: "i stopped noticing the app and just talk which is good sign", name: "SleepyBadger" },
    { text: "memory doesnt feel forced. it comes up when it makes sense", name: "KaleidoscopicMeans" },
];

// Distribute evenly across 5 columns by round-robin
const columns: Testimonial[][] = [[], [], [], [], []];
testimonials.forEach((t, i) => columns[i % 5].push(t));
const [col1, col2, col3, col4, col5] = columns;

export function TestimonialsSection() {
    return (
        <section className="relative py-16 sm:py-20 overflow-hidden bg-[#050505] border-t border-white/[0.04]">
            <div className="relative z-10 w-full px-6 sm:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto mb-10"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-primary/40" />
                        <span className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em]">
                            Community
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        What users are saying
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="flex justify-center gap-4 mask-[linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] max-h-[440px] overflow-hidden"
                >
                    <TestimonialsColumn testimonials={col5} className="hidden 2xl:block" duration={19.6} />
                    <TestimonialsColumn testimonials={col1} className="hidden md:block" duration={20} />
                    <TestimonialsColumn testimonials={col2} duration={23} />
                    <TestimonialsColumn testimonials={col3} className="hidden lg:block" duration={20} />
                    <TestimonialsColumn testimonials={col4} className="hidden xl:block" duration={19} />
                </motion.div>
            </div>
        </section>
    );
}
