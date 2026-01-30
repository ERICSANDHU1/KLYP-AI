"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "How it Works", href: "#how-it-works" },
        { name: "Pricing", href: "#pricing" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${isScrolled ? "pt-4" : "pt-0"
                    }`}
            >
                <div
                    className={`transition-all duration-300 relative flex items-center justify-between px-6 ${isScrolled
                        ? "w-[90%] md:w-[80%] max-w-5xl rounded-full bg-background/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-indigo-500/10 py-3"
                        : "w-full bg-transparent py-6 container mx-auto"
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group z-10">
                        <div className="size-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:rotate-3 transition-transform duration-300">
                            K
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">KLYP</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {hoveredIndex === index && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-secondary/80 rounded-full -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4 z-10">
                        <Link href="/login">
                            <Button variant="ghost" className="text-sm font-medium hover:bg-transparent hover:text-primary">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-lg shadow-indigo-500/25 relative overflow-hidden group">
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started <Sparkles size={14} />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed inset-x-4 top-24 z-40 rounded-2xl bg-card/95 backdrop-blur-xl border border-white/10 p-6 shadow-2xl md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-border my-2" />
                            <Button variant="ghost" className="w-full justify-start">
                                Sign In
                            </Button>
                            <Button className="w-full bg-primary text-primary-foreground">
                                Get Started
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
