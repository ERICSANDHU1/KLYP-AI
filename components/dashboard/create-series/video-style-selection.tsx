"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { VideoStyle, VideoStyles } from "@/lib/video-style-data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface VideoStyleSelectionProps {
    selectedStyle: VideoStyle | null;
    onStyleSelect: (style: VideoStyle) => void;
}

export function VideoStyleSelection({
    selectedStyle,
    onStyleSelect,
}: VideoStyleSelectionProps) {
    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            <div className="mb-8 space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Video Style</h2>
                <p className="text-muted-foreground">Select the visual style for your video generation.</p>
            </div>

            <div className="relative">
                <ScrollArea className="w-full whitespace-nowrap rounded-xl border border-border/50 bg-card/50 p-4">
                    <div className="flex w-max space-x-4 pb-4">
                        {VideoStyles.map((style) => {
                            const isSelected = selectedStyle?.id === style.id;

                            return (
                                <div
                                    key={style.id}
                                    onClick={() => onStyleSelect(style)}
                                    className={cn(
                                        "group relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300",
                                        "w-[200px] aspect-[9/16]", // 9:16 aspect ratio
                                        isSelected
                                            ? "border-primary ring-2 ring-primary/20 ring-offset-2 scale-[1.02]"
                                            : "border-transparent hover:border-primary/50 hover:scale-[1.01]"
                                    )}
                                >
                                    <Image
                                        src={style.image}
                                        alt={style.name}
                                        fill
                                        className={cn(
                                            "object-cover transition-transform duration-500",
                                            isSelected ? "scale-110" : "group-hover:scale-105"
                                        )}
                                        sizes="200px"
                                    />

                                    {/* Overlay */}
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity",
                                        isSelected ? "opacity-100" : "opacity-60 group-hover:opacity-80"
                                    )} />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-white drop-shadow-md">
                                                {style.name}
                                            </span>
                                            {isSelected && (
                                                <div className="rounded-full bg-primary p-1 text-primary-foreground shadow-lg">
                                                    <Check size={14} strokeWidth={3} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
}
