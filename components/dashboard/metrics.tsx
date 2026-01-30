"use client";

import { motion } from "framer-motion";
import {
    Video,
    TrendingUp,
    Clock,
    Calendar
} from "lucide-react";

const metrics = [
    {
        title: "AI Videos Generated",
        value: "142",
        trend: "+12%",
        icon: Video,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10"
    },
    {
        title: "Engagement Growth",
        value: "24.5k",
        trend: "+8.2%",
        icon: TrendingUp,
        color: "text-green-500",
        bg: "bg-green-500/10"
    },
    {
        title: "Automation Hours Saved",
        value: "38h",
        trend: "+2h",
        icon: Clock,
        color: "text-orange-500",
        bg: "bg-orange-500/10"
    },
    {
        title: "Scheduled Posts",
        value: "12",
        trend: "Next: 2h",
        icon: Calendar,
        color: "text-cyan-500",
        bg: "bg-cyan-500/10"
    }
];

export function TopMetrics() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl ${metric.bg} ${metric.color} group-hover:scale-110 transition-transform duration-300`}>
                            <metric.icon size={22} />
                        </div>
                        <div className="px-2 py-1 rounded-full bg-secondary/50 text-xs font-medium text-green-500 border border-green-500/20">
                            {metric.trend}
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-1">{metric.value}</h3>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                </motion.div>
            ))}
        </div>
    );
}
