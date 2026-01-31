"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NicheCard, Niche } from "./niche-card";
import { cn } from "@/lib/utils";

import { Ghost, Sparkles, Fingerprint, History, Lightbulb } from "lucide-react";

const INITIAL_NICHES: Niche[] = [
    {
        id: "scary-stories",
        title: "Scary Stories",
        description: "Short horror stories designed to give viewers goosebumps",
        icon: Ghost
    },
    {
        id: "motivational",
        title: "Motivational",
        description: "Inspirational stories and speeches to boost mindset",
        icon: Sparkles
    },
    {
        id: "true-crime",
        title: "True Crime",
        description: "Real crime stories told in a gripping narrative",
        icon: Fingerprint
    },
    {
        id: "history",
        title: "History",
        description: "Engaging historical events explained simply",
        icon: History
    },
    {
        id: "facts",
        title: "Facts / Did You Know",
        description: "Short, surprising facts for quick engagement",
        icon: Lightbulb
    },
];

interface NicheSelectionProps {
    selectedNiche: Niche | null;
    onSelectNiche: (niche: Niche) => void;
}

export function NicheSelection({ selectedNiche, onSelectNiche }: NicheSelectionProps) {
    const [tab, setTab] = useState<"available" | "custom">("available");

    return (
        <div className="flex flex-col h-full">
            <div className="mb-6 space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Choose format & Niche</h2>
                <p className="text-muted-foreground">Select a niche to get started with your automated series.</p>
            </div>

            <Tabs
                defaultValue="available"
                value={tab}
                onValueChange={(val) => setTab(val as "available" | "custom")}
                className="w-full h-full flex flex-col"
            >
                <div className="mb-6">
                    <TabsList className="grid w-[400px] grid-cols-2">
                        <TabsTrigger value="available">Available Niches</TabsTrigger>
                        <TabsTrigger value="custom">Custom Niche</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="available" className="flex-1 mt-0">
                    <ScrollArea className="h-[400px] pr-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                            {INITIAL_NICHES.map((niche) => (
                                <NicheCard
                                    key={niche.id}
                                    niche={niche}
                                    isSelected={selectedNiche?.id === niche.id}
                                    onSelect={onSelectNiche}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="custom" className="flex-1 mt-0">
                    <div className="space-y-6 max-w-xl">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Custom Niche Name
                            </label>
                            <Input placeholder="e.g. Space Facts, Daily Meditations..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Description (Optional)
                            </label>
                            <Textarea placeholder="Describe the type of content you want to generate..." className="min-h-[100px]" />
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg border border-border/50 text-sm text-muted-foreground">
                            <p>Custom niches allow you to define your own topics. Our AI will adapt to your description.</p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
