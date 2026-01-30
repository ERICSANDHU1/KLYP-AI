"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-background -z-10" />

            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Start building viral content <br /> on autopilot
                    </h2>
                    <p className="text-xl text-white/70 mb-10">
                        Let AI create, schedule, and distribute your content — while you focus on growth.
                    </p>
                    <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-indigo-900 hover:bg-white/90">
                        Start Free Trial
                        <ArrowRight className="ml-2" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
