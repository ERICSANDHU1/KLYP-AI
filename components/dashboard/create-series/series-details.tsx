"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
    Instagram,
    Youtube,
    Clock,
    Check,
    Mail
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Custom TikTok Icon since it's not in Lucide by default
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="1em"
        width="1em"
        className={className}
    >
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
);

interface SeriesDetailsData {
    name: string;
    duration: string;
    platforms: string[];
    publishTime: string;
}

interface SeriesDetailsProps {
    data: SeriesDetailsData;
    onUpdate: (data: Partial<SeriesDetailsData>) => void;
}

export function SeriesDetails({ data, onUpdate }: SeriesDetailsProps) {
    const platforms = [
        { id: "tiktok", name: "TikTok", icon: TikTokIcon },
        { id: "instagram", name: "Instagram", icon: Instagram },
        { id: "youtube", name: "YouTube", icon: Youtube },
        { id: "email", name: "Email", icon: Mail },
    ];

    const togglePlatform = (id: string) => {
        const current = data.platforms || [];
        const updated = current.includes(id)
            ? current.filter(p => p !== id)
            : [...current, id];
        onUpdate({ platforms: updated });
    };

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto">
            <div className="mb-8 space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Series Details</h2>
                <p className="text-muted-foreground">Finalize your series settings and publishing schedule.</p>
            </div>

            <div className="space-y-8 bg-card/50 p-6 rounded-xl border border-border/50">

                {/* Name Section */}
                <div className="space-y-3">
                    <Label htmlFor="series-name" className="text-base font-medium">Name</Label>
                    <Input
                        id="series-name"
                        placeholder="Enter series name"
                        value={data.name}
                        onChange={(e) => onUpdate({ name: e.target.value })}
                        className="bg-background/80 border-border/50 h-12 text-lg focus-visible:ring-primary/20"
                    />
                </div>

                {/* Duration Section */}
                <div className="space-y-3">
                    <Label htmlFor="series-duration" className="text-base font-medium">Duration</Label>
                    <Select
                        value={data.duration}
                        onValueChange={(val) => onUpdate({ duration: val })}
                    >
                        <SelectTrigger className="bg-background/80 border-border/50 h-12 text-lg focus:ring-primary/20">
                            <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="15">15 Seconds</SelectItem>
                            <SelectItem value="30">30 Seconds</SelectItem>
                            <SelectItem value="60">60 Seconds</SelectItem>
                            <SelectItem value="90">90 Seconds</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Publish On Section */}
                <div className="space-y-3">
                    <Label className="text-base font-medium">Publish On</Label>
                    <div className="flex gap-4">
                        {platforms.map((platform) => {
                            const isSelected = data.platforms.includes(platform.id);
                            return (
                                <button
                                    key={platform.id}
                                    onClick={() => togglePlatform(platform.id)}
                                    className={cn(
                                        "relative flex items-center justify-center w-16 h-16 rounded-xl border-2 transition-all duration-200",
                                        isSelected
                                            ? "border-primary bg-primary/10 text-primary shadow-sm scale-105"
                                            : "border-border/50 bg-background/50 text-muted-foreground hover:bg-muted hover:border-border"
                                    )}
                                    type="button"
                                    aria-pressed={isSelected}
                                >
                                    <platform.icon className="w-8 h-8" />
                                    {isSelected && (
                                        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-0.5 shadow-md">
                                            <Check size={10} strokeWidth={4} />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Publish Time Section */}
                <div className="space-y-3">
                    <Label className="text-base font-medium">Publish Time</Label>
                    <div className="relative max-w-[200px]">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                            <Clock size={16} />
                        </div>
                        <Input
                            type="time"
                            value={data.publishTime}
                            onChange={(e) => onUpdate({ publishTime: e.target.value })}
                            className="bg-background/80 border-border/50 h-12 pl-10 text-lg focus-visible:ring-primary/20"
                        />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                        Video will generate 3-6 hours before video publish
                    </p>
                </div>
            </div>
        </div>
    );
}
