import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns";
import { motion } from "framer-motion";

const testimonials: Testimonial[] = [
    {
        text: "LettuceAI has transformed my creative writing. The memory system actually remembers my characters and story arcs perfectly.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        name: "Alex Thompson",
        role: "Writer & Creator",
    },
    {
        text: "Finally, an AI companion that respects privacy! Everything stays on my device, and I control my own data with BYOK.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        name: "Sarah Chen",
        role: "Privacy Advocate",
    },
    {
        text: "The open-source nature and dynamic memory system are impressive. It genuinely understands context across conversations.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
        name: "Marcus Rodriguez",
        role: "Software Developer",
    },
    {
        text: "I use LettuceAI for language practice. Characters remember our discussions and adapt to my learning style perfectly.",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
        name: "Emma Williams",
        role: "Language Learner",
    },
    {
        text: "The local-first approach means I can use it anywhere, even offline. My conversations stay private and personal.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        name: "David Kim",
        role: "Digital Nomad",
    },
    {
        text: "Character creation is incredibly detailed. The AI maintains consistency throughout conversations beautifully.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
        name: "Sophia Martinez",
        role: "Content Creator",
    },
    {
        text: "The memory system is a game-changer. It remembers context from weeks ago and weaves it naturally into chats.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
        name: "James Parker",
        role: "AI Enthusiast",
    },
    {
        text: "Using my own API keys saves money and gives full control. The open-source code shows exactly what's happening.",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop",
        name: "Rachel Green",
        role: "Tech Professional",
    },
    {
        text: "Perfect balance of powerful AI and privacy. The no-telemetry policy and local storage give me peace of mind.",
        image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop",
        name: "Michael Brooks",
        role: "Security Researcher",
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
