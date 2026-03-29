"use client";
import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
    text: string;
    image?: string;
    name: string;
    role?: string;
};

function getInitials(name: string) {
    const clean = name.replace(/^\/u\//, "");
    const parts = clean.split(/[_\-.]/).filter(Boolean);

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[1][0]).toUpperCase();
}


export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                style={{ willChange: "transform" }}
                className="flex flex-col gap-4 pb-4"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, name }, i) => (
                                <div
                                    className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] max-w-xs w-full"
                                    key={i}
                                >
                                    <p className="text-[13px] text-white/40 leading-relaxed mb-3">
                                        "{text}"
                                    </p>
                                    <div className="flex items-center gap-2.5">
                                        <div
                                            className="h-7 w-7 rounded-full flex items-center justify-center
                                            bg-white/[0.06]
                                            text-[10px] font-semibold text-white/50 select-none"
                                        >
                                            {getInitials(name)}
                                        </div>
                                        <span className="text-[12px] font-medium text-white/50">{name}</span>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};
