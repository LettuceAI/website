import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns";
import { motion } from "framer-motion";

const testimonials: Testimonial[] = [
  {
    text: "been using this for some weeks now and it didnt forget important stuff which is rare",
    name: "abrasive_carcass",
  },
  {
    text: "first day was confusing but after you understand how memory works its actually good",
    name: "TheObeseBoardroom",
  },
  {
    text: "been using this for some weeks now and it didnt forget important stuff which is rare",
    name: "abrasive_carcass",
  },
  {
    text: "first day was confusing but after you understand how memory works its actually good",
    name: "TheObeseBoardroom",
  },
  {
    text: "characters feel more consistent here. they dont randomly change personality",
    name: "lastingequation",
  },
  {
    text: "not perfect english on my side but conversation flows better than expected",
    name: "gullible_basin",
  },
  {
    text: "ui could be cleaner but the chat quality makes up for it",
    name: "spottediceberg",
  },
  {
    text: "characters feel more consistent here. they dont randomly change personality",
    name: "lastingequation",
  },
  {
    text: "not perfect english on my side but conversation flows better than expected",
    name: "gullible_basin",
  },
  {
    text: "ui could be cleaner but the chat quality makes up for it",
    name: "spottediceberg",
  },
  {
    text: "i was expecting another hype app but its actually usable long term",
    name: "RuddySetup",
  },
  {
    text: "sometimes slow sometimes weird but overall less frustrating than others",
    name: "SleepyBadger",
  },
  {
    text: "feels like it pays attention instead of repeating same stuff",
    name: "RevolvingSquid",
  },
  {
    text: "i dont use all features but even basic chat feels solid",
    name: "KindSuburb",
  },
  {
    text: "setup took time but after that i stopped thinking about the app and just use it",
    name: "KaleidoscopicMeans",
  },
  {
    text: "way less random replies compared to what i used before",
    name: "violent_curator",
  },
  {
    text: "not mindblowing but reliable which matters more",
    name: "SpiritedGlamour",
  },
    {
    text: "way less random replies compared to what i used before",
    name: "violent_curator",
  },
  {
    text: "not mindblowing but reliable which matters more",
    name: "SpiritedGlamour",
  },
    {
    text: "feels less repetitive than most ai chats i tried",
    name: "spottediceberg",
  },
  {
    text: "i keep coming back to same character and it still makes sense",
    name: "RevolvingSquid",
  },
  {
    text: "sometimes it says weird stuff but overall conversation stays on track",
    name: "cruelexclamation388",
  },
  {
    text: "better long chats. short chats feel same everywhere anyway",
    name: "gleamingsharpness7",
  },
  {
    text: "not flashy but it works which i prefer",
    name: "KindSuburb",
  },
  {
    text: "feels more thought put into replies not just filler text",
    name: "violent_curator",
  },
  {
    text: "i stopped noticing the app and just talk which is good sign",
    name: "SleepyBadger",
  },
  {
    text: "memory doesnt feel forced. it comes up when it makes sense",
    name: "KaleidoscopicMeans",
  },
];

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(4, 6);
const fourthColumn = testimonials.slice(6, 8);
const fifthColumn = testimonials.slice(0, 3); // Reuse first testimonials for 5th column

export function TestimonialsSection() {
    return (
        <section className="relative py-24 sm:py-32 overflow-hidden bg-[#050505]">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute left-1/2 top-0 -translate-x-1/2 w-150 h-100 rounded-full opacity-10 blur-[120px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(136, 192, 87, 0.4) 0%, transparent 70%)',
                    }}
                />
            </div>

            <div className="relative z-10 w-full px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
                        Loved by the <span className="text-primary">Community</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        See what our users are saying about LettuceAI
                    </p>
                </motion.div>

                {/* Testimonials Columns */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center gap-6 mask-[linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-175 overflow-hidden"
                >
                    <TestimonialsColumn testimonials={fifthColumn} className="hidden 2xl:block" duration={19.6} />
                    <TestimonialsColumn testimonials={firstColumn} className="hidden md:block" duration={20} />
                    <TestimonialsColumn testimonials={secondColumn} duration={23} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
                    <TestimonialsColumn testimonials={fourthColumn} className="hidden xl:block" duration={19} />
                </motion.div>
            </div>
        </section>
    );
}
