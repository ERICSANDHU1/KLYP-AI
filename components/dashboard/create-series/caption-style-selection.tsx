"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CaptionStyle, CaptionStyles } from "@/lib/caption-data";
import { Check } from "lucide-react";

interface CaptionStyleSelectionProps {
    selectedCaption: CaptionStyle | null;
    onSelectCaption: (style: CaptionStyle) => void;
}

// Internal component to render the animated preview
function CaptionPreview({ style }: { style: CaptionStyle }) {
    const text = "This story will change everything";
    const words = text.split(" ");

    // Animation state for continuous looping
    const [animationKey, setAnimationKey] = useState(0);

    // Reset animation every few seconds to loop it
    useEffect(() => {
        const duration = 4000; // 4 seconds loop
        const interval = setInterval(() => {
            setAnimationKey(prev => prev + 1);
        }, duration);
        return () => clearInterval(interval);
    }, []);

    // Render logic based on animation type
    const renderContent = () => {
        const baseClasses = cn(
            style.typography.fontSize || "text-xl",
            style.typography.fontWeight === "800" ? "font-extrabold" :
                style.typography.fontWeight === "700" ? "font-bold" :
                    style.typography.fontWeight === "600" ? "font-semibold" : "font-medium",
            style.typography.textTransform === "uppercase" ? "uppercase" : "",
            style.colors.text,
            style.colors.shadow,
            style.textClassName,
            "text-center relative z-10"
        );

        if (style.animation.type === "karaoke") {
            return (
                <div className={cn(baseClasses, "flex flex-wrap justify-center gap-1.5")}>
                    {words.map((word, i) => (
                        <span
                            key={i}
                            className={cn(
                                "transition-colors duration-200",
                                // Simple mock timing logic for karaoke highlight
                                // We cycle roughly through 5 words in 2.5s -> 0.5s per word
                            )}
                            style={{
                                color: (i === Math.floor(((Date.now() / 500) % words.length)))
                                    ? "#facc15" // yellow-400 hardcoded matching config for safe render
                                    : "currentColor"
                            }}
                        >
                            {word}
                        </span>
                    ))}
                    {/* Note: The above inline style hack is imperfect in React state updates, 
                        so let's use a CSS animation approx instead for stability in preview */}
                    <style jsx>{`
                        @keyframes karaoke-${style.id} {
                            0%, 100% { color: inherit; }
                            50% { color: #facc15; }
                        }
                    `}</style>
                </div>
            );
        }

        if (style.animation.type === "typewriter") {
            return (
                <div className={cn(baseClasses, "font-mono")}>
                    <span className="animate-typewriter overflow-hidden whitespace-nowrap border-r-4 border-green-400 pr-1">
                        {text}
                    </span>
                    <style jsx>{`
                        .animate-typewriter {
                            animation: typing 2s steps(40, end), blink-caret .75s step-end infinite;
                        }
                        @keyframes typing {
                            from { width: 0 }
                            to { width: 100% }
                        }
                        @keyframes blink-caret {
                            from, to { border-color: transparent }
                            50% { border-color: #4ade80; }
                        }
                    `}</style>
                </div>
            );
        }

        if (style.animation.type === "neon") {
            return (
                <div key={animationKey} className={cn(baseClasses, "animate-pulse")}>
                    {text}
                </div>
            );
        }

        if (style.animation.type === "scale") {
            return (
                <div key={animationKey} className={cn(baseClasses, "animate-pop-in")}>
                    {text}
                    <style jsx>{`
                        .animate-pop-in {
                            animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                        }
                        @keyframes popIn {
                            0% { transform: scale(0.5); opacity: 0; }
                            100% { transform: scale(1); opacity: 1; }
                        }
                    `}</style>
                </div>
            );
        }

        if (style.animation.type === "slide") {
            return (
                <div key={animationKey} className={cn(baseClasses, style.colors.background, "animate-slide-up")}>
                    {text}
                    <style jsx>{`
                       .animate-slide-up {
                           animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                       }
                       @keyframes slideUp {
                           0% { transform: translateY(20px); opacity: 0; }
                           100% { transform: translateY(0); opacity: 1; }
                       }
                   `}</style>
                </div>
            );
        }

        if (style.animation.type === "fade") {
            return (
                <div key={animationKey} className={cn(baseClasses, "animate-fade-in")}>
                    {text}
                    <style jsx>{`
                        .animate-fade-in {
                            animation: fadeIn 1s ease-in-out infinite alternate;
                        }
                        @keyframes fadeIn {
                            0% { opacity: 0.3; }
                            100% { opacity: 1; }
                        }
                    `}</style>
                </div>
            );
        }

        // Default fallback
        return <div className={baseClasses}>{text}</div>
    }

    return (
        <div className={cn(
            "w-full h-full flex flex-col justify-center bg-black/40 p-4 overflow-hidden select-none",
            style.containerClassName
        )}>
            {renderContent()}
        </div>
    )
}


export function CaptionStyleSelection({
    selectedCaption,
    onSelectCaption,
}: CaptionStyleSelectionProps) {

    return (
        <div className="flex flex-col h-full max-w-5xl mx-auto">
            <div className="mb-8 space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Caption Style</h2>
                <p className="text-muted-foreground">Choose how captions animate and appear in your videos.</p>
            </div>

            <ScrollArea className="h-[450px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                    {CaptionStyles.map((style) => {
                        const isSelected = selectedCaption?.id === style.id;
                        return (
                            <div
                                key={style.id}
                                onClick={() => onSelectCaption(style)}
                                className={cn(
                                    "group relative flex flex-col h-[180px] rounded-xl border border-border/50 bg-card overflow-hidden cursor-pointer transition-all duration-300",
                                    isSelected
                                        ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                                        : "hover:border-primary/50 hover:bg-muted/30"
                                )}
                            >
                                {/* Preview Area */}
                                <div className="flex-1 relative">
                                    {/* Mock Video Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-slate-900/40 z-0" />

                                    <CaptionPreview style={style} />
                                </div>

                                {/* Header/Footer of Card */}
                                <div className="h-12 flex items-center justify-between px-4 border-t border-border/30 bg-card/80 backdrop-blur-sm">
                                    <div className="flex flex-col justify-center">
                                        <span className={cn("text-sm font-semibold", isSelected ? "text-primary" : "text-foreground")}>
                                            {style.name}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground">
                                            {style.description}
                                        </span>
                                    </div>

                                    {isSelected && (
                                        <div className="rounded-full bg-primary p-1 text-primary-foreground">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
}
