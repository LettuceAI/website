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
                className="flex flex-col gap-6 pb-6"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <div
                                    className="p-6 sm:p-8 rounded-2xl bg-card/20 border border-border/30 max-w-xs w-full backdrop-blur-sm"
                                    key={i}
                                >
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        "{text}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="h-12 w-12 rounded-full flex items-center justify-center
                                            bg-border/20 ring-2 ring-border/30
                                            text-sm font-semibold text-white/80 select-none"
                                        >
                                            {getInitials(name)}
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="font-semibold text-white">{name}</div>
                                            <div className="text-sm text-muted-foreground">{role}</div>
                                        </div>
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
