"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function SocialProof() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-12">Creators love KLYP</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-2xl bg-card border border-border text-left"
                        >
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star key={star} size={16} className="fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>
                            <p className="text-muted-foreground mb-6">"KLYP has completely transformed how I create content. I used to spend hours editing, now it takes minutes."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-muted/50" />
                                <div>
                                    <p className="font-bold text-sm">Creator Name</p>
                                    <p className="text-xs text-muted-foreground">Content Creator</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
