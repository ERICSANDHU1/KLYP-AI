"use client";

import { motion } from "framer-motion";
import { Users, Rocket, Building2, Megaphone, Trophy, Star } from "lucide-react";

const useCases = [
    {
        icon: Users,
        role: "Creators",
        action: "Build daily content fast",
    },
    {
        icon: Rocket,
        role: "Startups",
        action: "Grow brand presence",
    },
    {
        icon: Building2,
        role: "Agencies",
        action: "Scale client content",
    },
    {
        icon: Megaphone,
        role: "Marketers",
        action: "Automate campaigns",
    },
    {
        icon: Trophy,
        role: "Coaches",
        action: "Build authority",
    },
    {
        icon: Star,
        role: "Influencers",
        action: "Multiply reach",
    },
];

export function UseCases() {
    return (
        <section className="py-24 bg-secondary/10">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Built for Growth</h2>
                    <p className="text-muted-foreground text-lg">Who is KLYP for?</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {useCases.map((item, index) => (
                        <motion.div
                            key={item.role}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group p-6 bg-background rounded-xl border border-border hover:border-indigo-500/30 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{item.role}</h3>
                                    <p className="text-muted-foreground text-sm">{item.action}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
