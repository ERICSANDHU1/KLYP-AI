"use client";

import { motion } from "framer-motion";
import { Wand2, CalendarClock, Share2, TrendingUp } from "lucide-react";

const features = [
    {
        icon: Wand2,
        title: "AI Video Generator",
        description: "Turn text ideas into viral-ready short-form videos in seconds.",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
    },
    {
        icon: CalendarClock,
        title: "Auto Scheduler",
        description: "Smart scheduling that maximizes engagement across all platforms.",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        icon: Share2,
        title: "Multi-Platform Engine",
        description: "Publish seamlessly to Instagram, YouTube, TikTok, and more.",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        icon: TrendingUp,
        title: "Growth Automation",
        description: "Build consistent content pipelines without manual work.",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
    },
];

export function ValueProps() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        One platform. <br />
                        <span className="text-muted-foreground">Unlimited content output.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group"
                        >
                            <div
                                className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                            >
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
