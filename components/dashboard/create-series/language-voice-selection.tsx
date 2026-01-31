"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Mic, Play, Pause, User, Bot, Radio, MessageCircle, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Language, DeepgramVoices, ElevenLabsVoices } from "@/lib/voice-data";

// Data Definitions
export interface LanguageData {
    language: string;
    countryCode: string;
    countryFlag: string;
    modelName: string;
    modelLangCode: string;
}

export interface VoiceData {
    model: string;
    modelName: string;
    preview: string;
    gender: string;
}

interface LanguageVoiceSelectionProps {
    language: LanguageData | null;
    voiceStyle: VoiceData | null;
    onLanguageChange: (lang: LanguageData) => void;
    onVoiceChange: (voice: VoiceData) => void;
}

export function LanguageVoiceSelection({
    language,
    voiceStyle,
    onLanguageChange,
    onVoiceChange,
}: LanguageVoiceSelectionProps) {
    const [playingVoice, setPlayingVoice] = useState<string | null>(null);

    // Filter voices based on selected language model
    const availableVoices = language
        ? (language.modelName === "deepgram" ? DeepgramVoices : ElevenLabsVoices)
        : [];

    const toggleAudio = (e: React.MouseEvent, previewUrl: string) => {
        e.stopPropagation();

        // Stop current audio if playing
        const audioElement = document.getElementById("voice-preview-audio") as HTMLAudioElement;

        if (playingVoice === previewUrl) {
            audioElement.pause();
            setPlayingVoice(null);
        } else {
            // Play new audio
            audioElement.src = previewUrl;
            audioElement.play().catch(err => console.error("Audio playback error:", err));
            setPlayingVoice(previewUrl);

            // Allow re-playing when finished
            audioElement.onended = () => setPlayingVoice(null);
        }
    };

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto">
            <div className="mb-8 space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Language & Voice</h2>
                <p className="text-muted-foreground">Select the language and voice style for your series.</p>
                <audio id="voice-preview-audio" className="hidden" />
            </div>

            <div className="space-y-8">
                {/* Section 1: Language */}
                <div className="space-y-3">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Language
                    </label>
                    <Select
                        value={language?.modelLangCode || ""}
                        onValueChange={(val) => {
                            const selected = Language.find(l => l.modelLangCode === val);
                            if (selected) {
                                onLanguageChange(selected);
                                onVoiceChange(null as any); // Reset voice on language change
                            }
                        }}
                    >
                        <SelectTrigger className="w-full h-12 bg-card border-border/50">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                            {Language.map((lang) => (
                                <SelectItem key={lang.modelLangCode} value={lang.modelLangCode}>
                                    <span className="mr-2 text-lg">{lang.countryFlag}</span>
                                    {lang.language}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Section 2: Voice Style */}
                <div className="space-y-3">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Voice Style
                    </label>

                    <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                        <ScrollArea className="h-[300px] w-full p-2">
                            {!language ? (
                                <div className="flex items-center justify-center h-[100px] text-muted-foreground text-sm">
                                    Please select a language first
                                </div>
                            ) : (
                                <div className="grid gap-2">
                                    {availableVoices.map((voice) => {
                                        const isSelected = voiceStyle?.modelName === voice.modelName;
                                        const isPlaying = playingVoice === voice.preview;

                                        return (
                                            <div
                                                key={voice.modelName}
                                                onClick={() => onVoiceChange(voice)}
                                                className={cn(
                                                    "relative flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-200 border",
                                                    isSelected
                                                        ? "bg-primary/10 border-primary shadow-sm"
                                                        : "bg-background border-transparent hover:bg-muted/50 hover:border-border/50"
                                                )}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 shrink-0"
                                                        onClick={(e) => toggleAudio(e, voice.preview)}
                                                    >
                                                        {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                                                    </Button>

                                                    <div>
                                                        <div className={cn("font-medium", isSelected ? "text-primary" : "text-foreground")}>
                                                            {voice.modelName}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground capitalize">
                                                            {voice.gender} • {voice.model}
                                                        </div>
                                                    </div>
                                                </div>

                                                {isSelected && (
                                                    <Check className="h-4 w-4 text-primary" />
                                                )}
                                            </div>
                                        );
                                    })}

                                    {availableVoices.length === 0 && (
                                        <div className="flex items-center justify-center h-[100px] text-muted-foreground text-sm">
                                            No voices available for this language
                                        </div>
                                    )}
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
}
