"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Play, Pause, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BgMusic, BackgroundMusic } from "@/lib/music-data";
import { Checkbox } from "@/components/ui/checkbox";

interface BackgroundMusicSelectionProps {
    selectedMusic: BgMusic[];
    onMusicChange: (music: BgMusic[]) => void;
}

export function BackgroundMusicSelection({
    selectedMusic,
    onMusicChange,
}: BackgroundMusicSelectionProps) {
    const [playingUrl, setPlayingUrl] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio element only once
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.onended = () => setPlayingUrl(null);
        audioRef.current.onerror = () => {
            console.error("Audio playback error");
            setPlayingUrl(null);
        };

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        }
    }, []);

    const toggleAudio = (e: React.MouseEvent, url: string) => {
        e.stopPropagation();

        if (!audioRef.current) return;

        if (playingUrl === url) {
            audioRef.current.pause();
            setPlayingUrl(null);
        } else {
            audioRef.current.src = url;
            audioRef.current.play().catch(err => console.error("Playback failed:", err));
            setPlayingUrl(url);
        }
    };

    const toggleSelection = (music: BgMusic) => {
        const isSelected = selectedMusic.some(m => m.id === music.id);
        if (isSelected) {
            onMusicChange(selectedMusic.filter(m => m.id !== music.id));
        } else {
            onMusicChange([...selectedMusic, music]);
        }
    };

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto">
            <div className="mb-8 space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Background Music</h2>
                <p className="text-muted-foreground">Select background music tracks for your series (Multiple allowed).</p>
            </div>

            <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                <ScrollArea className="h-[400px] w-full p-2">
                    <div className="grid gap-2">
                        {BackgroundMusic.map((music) => {
                            const isSelected = selectedMusic.some(m => m.id === music.id);
                            const isPlaying = playingUrl === music.url;

                            return (
                                <div
                                    key={music.id}
                                    onClick={() => toggleSelection(music)}
                                    className={cn(
                                        "relative flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-200 border",
                                        isSelected
                                            ? "bg-primary/10 border-primary shadow-sm"
                                            : "bg-background border-transparent hover:bg-muted/50 hover:border-border/50"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={() => toggleSelection(music)}
                                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        />

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 shrink-0"
                                            onClick={(e) => toggleAudio(e, music.url)}
                                        >
                                            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                                        </Button>

                                        <div className="flex flex-col">
                                            <span className={cn("font-medium", isSelected ? "text-primary" : "text-foreground")}>
                                                {music.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground truncate max-w-[200px] md:max-w-[300px]">
                                                {music.url.split('/').pop()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={cn(
                                        "p-2 rounded-full transition-opacity",
                                        isSelected ? "opacity-100 text-primary bg-primary/20" : "opacity-0"
                                    )}>
                                        <Music size={16} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
