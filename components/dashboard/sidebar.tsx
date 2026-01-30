"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Video,
    Layers,
    Calendar,
    Rocket,
    BarChart2,
    Plug,
    BookOpen,
    Settings,
    CreditCard,
    Plus,
    HardDrive
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Videos", href: "/dashboard/videos", icon: Video },
    { name: "Series", href: "/dashboard/series", icon: Layers },
    { name: "Scheduler", href: "/dashboard/scheduler", icon: Calendar },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: Rocket },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
    { name: "Integrations", href: "/dashboard/integrations", icon: Plug },
    { name: "Guides", href: "/dashboard/guides", icon: BookOpen },
];

const bottomItems = [
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen fixed left-0 top-0 border-r border-border/40 bg-card/50 backdrop-blur-xl flex flex-col z-40 hidden md:flex">
            {/* Branding */}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                    <div className="size-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
                        K
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">KLYP</span>
                </div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider pl-1">AI Video Automation</p>
            </div>

            {/* Primary CTA */}
            <div className="px-4 mb-6">
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 border-t border-white/10">
                    <Plus size={16} className="mr-2" />
                    Create New AI Video
                </Button>
            </div>

            <div className="px-4 mb-2">
                <p className="text-xs font-semibold text-muted-foreground px-4 mb-2 uppercase tracking-wider">Platform</p>
            </div>

            {/* Nav Menu */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                                isActive
                                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                            )}
                        >
                            <item.icon size={18} className={cn("transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                            {item.name}
                        </Link>
                    );
                })}

                <div className="pt-6 pb-2">
                    <p className="text-xs font-semibold text-muted-foreground px-4 mb-2 uppercase tracking-wider">System</p>
                </div>
                {bottomItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                            pathname === item.href
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        )}
                    >
                        <item.icon size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* User / Storage */}
            <div className="p-4 border-t border-border/40 bg-background/20">
                <div className="mb-4">
                    <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-muted-foreground flex items-center gap-1"><HardDrive size={10} /> Storage</span>
                        <span className="font-medium">75 GB / 100 GB</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                    </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-card border border-border/50">
                    <div className="size-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Pro Plan</p>
                        <p className="text-[10px] text-muted-foreground">Manage Subscription</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
