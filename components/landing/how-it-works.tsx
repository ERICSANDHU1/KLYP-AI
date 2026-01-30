"use client";

import { motion } from "framer-motion";

const steps = [
    {
        id: "01",
        title: "Enter your idea",
        description: "Simply type a topic, paste a script, or drop a URL.",
    },
    {
        id: "02",
        title: "AI Generates Video",
        description: "Our engine selects visuals, adds captions, and edits instantly.",
    },
    {
        id: "03",
        title: "Customize & Brand",
        description: "Tweak the style, colors, and voice to match your brand.",
    },
    {
        id: "04",
        title: "Auto-Schedule",
        description: "Set your posting schedule for maximum reach.",
    },
    {
        id: "05",
        title: "Grow on Autopilot",
        description: "Watch your engagement rise while you sleep.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-secondary/20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">How it Works</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        From idea to published viral video in minutes.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent -translate-y-1/2 z-0" />

                    <div className="grid md:grid-cols-5 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-12 h-12 rounded-full bg-background border-2 border-indigo-500 flex items-center justify-center text-indigo-500 font-bold mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                                    {step.id}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
