"use client";

import { UserSync } from "@/components/user-sync";
import { TopMetrics } from "@/components/dashboard/metrics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Youtube, Instagram, Mail, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 550 },
    { name: 'Thu', value: 450 },
    { name: 'Fri', value: 650 },
    { name: 'Sat', value: 500 },
    { name: 'Sun', value: 700 },
];

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <UserSync />

            <TopMetrics />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AI Video Generator Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 p-8 rounded-2xl bg-card border border-border/50 shadow-sm relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles size={120} />
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Quick Generate</h2>
                            <p className="text-sm text-muted-foreground">Turn an idea into a video in seconds.</p>
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div>
                            <label className="text-sm font-medium mb-1.5 block">What's your video about?</label>
                            <Input placeholder="e.g. 5 tips for productivity using AI..." className="bg-secondary/30 h-12 text-lg border-border/60" />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {["Reels (9:16)", "Shorts (9:16)", "Email (16:9)", "Promo (1:1)"].map((preset) => (
                                <button key={preset} className="px-4 py-2 rounded-lg border border-border/50 bg-secondary/20 hover:bg-primary/10 hover:border-primary/50 text-xs font-medium transition-all">
                                    {preset}
                                </button>
                            ))}
                        </div>

                        <Button className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-base shadow-lg shadow-indigo-500/25 mt-2">
                            <Sparkles size={18} className="mr-2" />
                            Generate Magic Video
                        </Button>
                    </div>
                </motion.div>

                {/* Recent Activity / Pipeline */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col"
                >
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Calendar size={20} className="text-cyan-500" />
                        Upcoming Schedule
                    </h2>

                    <div className="space-y-6 flex-1">
                        {[
                            { platform: Instagram, list: "IG Reels", title: "Morning Motivation", time: "10:00 AM", color: "text-pink-500" },
                            { platform: Youtube, list: "Shorts", title: "Tech Review Teaser", time: "2:30 PM", color: "text-red-500" },
                            { platform: Mail, list: "Newsletter", title: "Weekly Digest Video", time: "Tomorrow", color: "text-blue-500" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border/50 cursor-pointer">
                                <div className={`p-2.5 rounded-full bg-secondary ${item.color}`}>
                                    <item.platform size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm truncate">{item.title}</h4>
                                    <p className="text-xs text-muted-foreground">{item.list} • {item.time}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ArrowRight size={14} className="text-muted-foreground" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <Button variant="outline" className="w-full mt-auto">View Full Calendar</Button>
                </motion.div>
            </div>

            {/* Analytics Chart Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 p-8 rounded-2xl bg-card border border-border/50 shadow-sm"
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            Engagement Overview
                        </h2>
                        <p className="text-sm text-muted-foreground">Across all connected platforms</p>
                    </div>
                    <select className="bg-secondary/30 border border-border/50 rounded-lg text-sm px-3 py-1">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#18181b', borderColor: '#333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
}
