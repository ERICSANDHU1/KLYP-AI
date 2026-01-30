"use client";

import { Bell, Search, Settings } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="h-16 flex items-center justify-between px-8 bg-card/50 backdrop-blur-md border-b border-border/40 sticky top-0 z-30 ml-64">
            {/* Left: Breadcrumb/Welcome */}
            <div>
                <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
                <p className="text-xs text-muted-foreground">Overview</p>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-xl mx-8 relative">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search videos, campaigns, series, ideas..."
                        className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all rounded-full h-10"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Bell size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Settings size={20} />
                </Button>
                <div className="h-8 w-px bg-border/50 mx-2" />
                <UserButton />
            </div>

            {/* Premium accent line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        </header>
    );
}
