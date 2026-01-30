"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Features() {
    const featuresList = [
        "AI Video Engine",
        "Viral Template System",
        "Auto Scheduling System",
        "Smart Content Calendar",
        "Brand Presets",
        "Multi-Format Export",
        "Platform Optimization AI",
        "Analytics Dashboard",
    ];

    return (
        <section id="features" className="py-24">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Everything you need to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                            dominate short-form video.
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground mb-10">
                        KLYP handles the heavy lifting of video production and distribution, so you can focus on creativity and strategy.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {featuresList.map((feature, index) => (
                            <motion.div
                                key={feature}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                                <span className="font-medium">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-2xl opacity-20 transform rotate-3" />
                    <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
                        <div className="text-center p-8">
                            <p className="text-muted-foreground">UI Feature Preview / Dashboard Image</p>
                            <div className="mt-4 w-32 h-32 mx-auto bg-muted/50 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
