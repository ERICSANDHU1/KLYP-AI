"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, ArrowRight, Search, Bell, User, LayoutTemplate, Calendar, Home, FolderOpen } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] opacity-50" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] opacity-30" />
            </div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-secondary text-secondary-foreground text-sm font-medium mb-6 backdrop-blur-sm"
                >
                    <Sparkles size={14} className="text-indigo-500" />
                    <span>New: AI-Powered Auto Scheduling</span>
                </motion.div>

                <motion.h1
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto"
                >
                    Turn ideas into{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        viral-ready videos
                    </span>{" "}
                    <br />— automatically.
                </motion.h1>

                <motion.p
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
                >
                    AI-powered video generation + smart scheduling for Instagram, YouTube, and
                    email — all in one platform. Create once. Distribute everywhere.
                </motion.p>

                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                >
                    <Button
                        size="lg"
                        className="rounded-full px-8 h-12 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-indigo-500/25"
                    >
                        Start Creating for Free
                        <ArrowRight className="ml-2 size-4" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full px-8 h-12 text-base font-semibold bg-background/50 backdrop-blur-sm hover:bg-secondary/50"
                    >
                        <Play className="mr-2 size-4 fill-current" />
                        Watch Demo
                    </Button>
                </motion.div>

                {/* Dashboard Preview / Abstract Visual */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                    className="relative mx-auto max-w-5xl rounded-xl border border-border/50 bg-background/40 backdrop-blur-xl shadow-2xl overflow-hidden aspect-video group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />

                    {/* Mock UI Structure */}
                    <div className="absolute top-4 left-4 right-4 h-full container-type-size">
                        <div className="flex gap-4 h-full">
                            {/* Sidebar */}
                            <div className="w-48 lg:w-64 h-[90%] bg-card/95 backdrop-blur-md rounded-xl border border-border/50 p-4 flex flex-col gap-2 shadow-sm">
                                <div className="h-8 flex items-center gap-2 mb-4 px-2">
                                    <div className="size-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold">K</div>
                                    <span className="font-bold text-sm tracking-tight">KLYP</span>
                                </div>

                                <div className="space-y-1">
                                    <div className="h-9 w-full bg-primary/10 text-primary rounded-md flex items-center px-3 text-xs font-semibold gap-3 border border-primary/20 cursor-pointer hover:bg-primary/15 transition-colors">
                                        <Sparkles size={14} />
                                        <span>New Project</span>
                                    </div>
                                    <div className="group flex items-center gap-3 px-3 h-9 rounded-md hover:bg-secondary/80 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                        <Home size={14} />
                                        <span>Home</span>
                                    </div>
                                    <div className="group flex items-center gap-3 px-3 h-9 rounded-md hover:bg-secondary/80 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                        <LayoutTemplate size={14} />
                                        <span>Templates</span>
                                    </div>
                                    <div className="group flex items-center gap-3 px-3 h-9 rounded-md hover:bg-secondary/80 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                        <Calendar size={14} />
                                        <span>Scheduler</span>
                                    </div>
                                    <div className="group flex items-center gap-3 px-3 h-9 rounded-md hover:bg-secondary/80 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                        <FolderOpen size={14} />
                                        <span>Assets</span>
                                    </div>
                                </div>

                                <div className="mt-auto bg-muted/30 rounded-lg p-3 border border-border/50">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-medium text-muted-foreground">Storage</span>
                                        <span className="text-[10px] font-medium text-foreground">75%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full w-3/4 bg-primary rounded-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 h-[90%] bg-card/90 backdrop-blur-md rounded-xl border border-border/50 p-6 flex flex-col relative overflow-hidden shadow-sm">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">Recent Projects</h3>
                                        <p className="text-[10px] text-muted-foreground">Manage and track your content</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full border border-border/50 w-48">
                                            <Search size={12} className="text-muted-foreground" />
                                            <span className="text-[10px] text-muted-foreground">Search projects...</span>
                                        </div>
                                        <div className="size-8 rounded-full bg-secondary/50 flex items-center justify-center border border-border/50 text-muted-foreground hover:text-foreground cursor-pointer">
                                            <Bell size={14} />
                                        </div>
                                        <div className="size-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-background shadow-sm" />
                                    </div>
                                </div>

                                {/* Content Grid */}
                                <div className="grid grid-cols-3 gap-4 w-full h-full">
                                    {[
                                        { title: "Tech Breakdown", date: "Just now", views: "2.4M", score: "98", color: "from-blue-600 to-indigo-600" },
                                        { title: "Day in Life", date: "2h ago", views: "850K", score: "92", color: "from-fuchsia-600 to-pink-600" },
                                        { title: "Product Launch", date: "5h ago", views: "1.2M", score: "95", color: "from-orange-500 to-red-500" }
                                    ].map((item, i) => (
                                        <div key={i} className="h-full rounded-xl overflow-hidden relative border border-border/50 bg-secondary/20 group/card cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary/20 hover:-translate-y-1">
                                            {/* Video Placeholder Gradient */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-[0.15] group-hover/card:opacity-[0.25] transition-all duration-500`} />

                                            {/* Top Badge */}
                                            <div className="absolute top-3 right-3 z-10">
                                                <div className="bg-background/80 backdrop-blur-md text-[10px] font-bold text-foreground px-2 py-1 rounded-full border border-border/50 flex items-center gap-1 shadow-sm">
                                                    <span className={`size-1.5 rounded-full ${i === 0 ? 'bg-green-500' : 'bg-emerald-500'}`} />
                                                    Score: {item.score}
                                                </div>
                                            </div>

                                            {/* Center Play Button */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform scale-90 group-hover/card:scale-100">
                                                <div className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl shadow-primary/30">
                                                    <Play size={20} className="ml-0.5 fill-current" />
                                                </div>
                                            </div>

                                            {/* Bottom Info */}
                                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                                <div className="bg-background/80 backdrop-blur-md p-3 rounded-lg border border-border/50 shadow-sm">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="font-semibold text-xs text-foreground line-clamp-1">{item.title}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                                                        <span>{item.date}</span>
                                                        <span className="flex items-center gap-1 text-xs font-medium text-foreground">
                                                            <Play size={8} className="fill-current" /> {item.views}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-12 text-sm text-muted-foreground"
                >
                    <p className="mb-4">Trusted by creators from</p>
                    <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simple text placeholders for logos for now */}
                        <span className="font-bold text-lg">YouTube</span>
                        <span className="font-bold text-lg">Instagram</span>
                        <span className="font-bold text-lg">TikTok</span>
                        <span className="font-bold text-lg">Twitch</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
