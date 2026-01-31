"use client";

import { cn } from "@/lib/utils";

export interface Niche {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
}

interface NicheCardProps {
    niche: Niche;
    isSelected: boolean;
    onSelect: (niche: Niche) => void;
}

export function NicheCard({ niche, isSelected, onSelect }: NicheCardProps) {
    const Icon = niche.icon;

    return (
        <div
            onClick={() => onSelect(niche)}
            className={cn(
                "relative cursor-pointer rounded-xl border p-5 transition-all duration-200 flex items-start gap-4",
                "hover:border-primary/50 hover:bg-muted/50",
                isSelected
                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                    : "border-border bg-card"
            )}
        >
            <div className={cn(
                "p-2 rounded-lg",
                isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
            )}>
                <Icon className="size-6" />
            </div>
            <div>
                <h3 className={cn("font-bold text-lg mb-1", isSelected ? "text-primary" : "text-foreground")}>
                    {niche.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {niche.description}
                </p>
            </div>
        </div>
    );
}
