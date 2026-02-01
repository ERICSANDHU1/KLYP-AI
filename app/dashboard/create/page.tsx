"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useUser, useSession } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CreateStepper } from "@/components/dashboard/create-series/stepper";
import { NicheSelection } from "@/components/dashboard/create-series/niche-selection";
import { LanguageVoiceSelection, LanguageData, VoiceData } from "@/components/dashboard/create-series/language-voice-selection";
import { BackgroundMusicSelection } from "@/components/dashboard/create-series/background-music-selection";
import { VideoStyleSelection } from "@/components/dashboard/create-series/video-style-selection";
import { CaptionStyleSelection } from "@/components/dashboard/create-series/caption-style-selection";
import { SeriesDetails } from "@/components/dashboard/create-series/series-details";
import { Niche } from "@/components/dashboard/create-series/niche-card";
import { CreateSeriesFooter } from "@/components/dashboard/create-series/footer";
import { BgMusic } from "@/lib/music-data";
import { VideoStyle } from "@/lib/video-style-data";
import { CaptionStyle } from "@/lib/caption-data";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";

// Define the shape of our global form state
interface CreateSeriesState {
    niche: Niche | null;
    language: LanguageData | null;
    voice: VoiceData | null;
    bgMusic: BgMusic[];
    videoStyle: VideoStyle | null;
    captionStyle: CaptionStyle | null;
    seriesDetails: {
        name: string;
        duration: string;
        platforms: string[];
        publishTime: string;
    };
}

export default function CreateSeriesPage() {
    return (
        <CreateSeriesContent />
    );
}

function CreateSeriesContent() {
    const [currentStep, setCurrentStep] = useState(1);
    const { user } = useUser();
    const { session } = useSession(); // Get session
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initial values from query params
    const initialTopic = searchParams?.get('topic') || "";
    // Ensure platforms is an array
    const initialFormat = searchParams?.get('format') ? [searchParams.get('format')!] : [];

    // Unified state for the entire multi-step form
    const [formState, setFormState] = useState<CreateSeriesState>({
        niche: null,
        language: null,
        voice: null,
        bgMusic: [],
        videoStyle: null,
        captionStyle: null,
        seriesDetails: {
            name: initialTopic,
            duration: "",
            platforms: initialFormat,
            publishTime: "12:00",
        },
    });

    // Check for edit mode
    const editId = searchParams?.get('id');
    const isEditMode = !!editId;

    // Fetch existing series data if in edit mode
    useEffect(() => {
        const fetchSeriesData = async () => {
            if (!editId || !user || !session) return;

            try {
                const token = await session.getToken({ template: 'supabase' });
                const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
                const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
                const clientHeaders: Record<string, string> = {};
                if (token) clientHeaders.Authorization = `Bearer ${token}`;

                const client = createClient(supabaseUrl, supabaseKey, {
                    global: { headers: clientHeaders },
                });

                const { data, error } = await client
                    .from('series_v2')
                    .select('*')
                    .eq('id', editId)
                    .single();

                if (error) throw error;

                if (data) {
                    console.log("Fetched series for edit:", data);
                    setFormState({
                        niche: data.niche_config,
                        language: data.language_config,
                        voice: data.voice_config,
                        bgMusic: data.background_music_config || [],
                        videoStyle: data.video_style_config,
                        captionStyle: data.caption_style_config,
                        seriesDetails: {
                            name: data.name,
                            duration: data.duration,
                            platforms: data.publish_platforms || [],
                            publishTime: data.publish_time,
                        },
                    });
                }
            } catch (error) {
                console.error("Error fetching series for edit:", error);
                toast.error("Failed to load series for editing");
            }
        };

        fetchSeriesData();
    }, [editId, user, session]);

    const handleContinue = async () => {
        if (currentStep === 1 && formState.niche) {
            console.log("Saving Step 1 choices:", formState);
            setCurrentStep(2);
        } else if (currentStep === 2 && formState.language && formState.voice) {
            console.log("Saving Step 2 choices:", formState);
            setCurrentStep(3);
        } else if (currentStep === 3 && formState.bgMusic.length > 0) {
            console.log("Saving Step 3 choices:", formState);
            setCurrentStep(4);
        } else if (currentStep === 4 && formState.videoStyle) {
            console.log("Saving Step 4 choices:", formState);
            setCurrentStep(5);
        } else if (currentStep === 5 && formState.captionStyle) {
            console.log("Saving Step 5 choices:", formState);
            setCurrentStep(6);
        } else if (currentStep === 6) {
            if (formState.seriesDetails.name && formState.seriesDetails.duration && formState.seriesDetails.platforms.length > 0) {
                if (!user || !session) {
                    alert("You must be logged in to create/edit a series.");
                    return;
                }

                setIsSubmitting(true);
                try {
                    // 1. Get the Supabase token from Clerk
                    let token = null;
                    try {
                        token = await session.getToken({ template: 'supabase' });
                    } catch (tokenError: unknown) {
                        console.warn("Failed to get Supabase token:", tokenError);
                        if (tokenError instanceof Error && tokenError.message?.includes("No JWT template")) {
                            alert("Configuration Required: Please go to Clerk Dashboard -> JWT Templates -> Create New -> Select 'Supabase' -> Name it 'supabase'.");
                            throw new Error("Clerk JWT Template 'supabase' is missing.");
                        }
                    }

                    // 2. Create client
                    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
                    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

                    const clientHeaders: Record<string, string> = {};
                    if (token) clientHeaders.Authorization = `Bearer ${token}`;

                    const client = createClient(supabaseUrl, supabaseKey, {
                        global: { headers: clientHeaders },
                    });

                    let query;

                    const payload = {
                        user_id: user.id,
                        name: formState.seriesDetails.name,
                        duration: formState.seriesDetails.duration,
                        publish_time: formState.seriesDetails.publishTime,
                        publish_platforms: formState.seriesDetails.platforms,
                        niche_config: formState.niche,
                        language_config: formState.language,
                        voice_config: formState.voice,
                        background_music_config: formState.bgMusic,
                        video_style_config: formState.videoStyle,
                        caption_style_config: formState.captionStyle,
                        // Only set status to active on creation, or keep as is? 
                        // If editing, we might want to keep existing status or reset. 
                        // User request: "when user create series change status to active". 
                        // For edit, let's keep it simple and update fields.
                        ...(isEditMode ? {} : { status: 'active' }),
                        updated_at: new Date().toISOString(),
                    };

                    if (isEditMode) {
                        query = client
                            .from('series_v2')
                            .update(payload)
                            .eq('id', editId)
                            .select()
                            .single();
                    } else {
                        query = client
                            .from('series_v2')
                            .insert(payload)
                            .select()
                            .single();
                    }

                    const { data, error } = await query;

                    if (error) {
                        console.error("Supabase Detailed Error:", JSON.stringify(error, null, 2));
                        alert(`Supabase Error: ${error.message} (Code: ${error.code})`);
                        throw error;
                    }

                    console.log(`Series ${isEditMode ? 'Updated' : 'Created'}:`, data);
                    toast.success(`Series ${isEditMode ? 'updated' : 'created'} successfully!`, {
                        description: isEditMode ? "Your changes have been saved." : "Your video generation has started."
                    });
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 500);
                } catch (error: unknown) {
                    console.error("Error saving series:", error);
                    if (error instanceof Error && !error.message.includes("Clerk JWT")) {
                        toast.error(`Error saving series`, {
                            description: error.message || "Unknown error"
                        });
                    }
                } finally {
                    setIsSubmitting(false);
                }
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const updateNiche = (niche: Niche) => {
        setFormState((prev) => ({ ...prev, niche }));
    };

    const updateLanguage = (language: LanguageData) => {
        setFormState((prev) => ({ ...prev, language, voice: null }));
    };

    const updateVoice = (voice: VoiceData) => {
        setFormState((prev) => ({ ...prev, voice }));
    };

    const updateBgMusic = (bgMusic: BgMusic[]) => {
        setFormState((prev) => ({ ...prev, bgMusic }));
    };

    const updateVideoStyle = (videoStyle: VideoStyle) => {
        setFormState((prev) => ({ ...prev, videoStyle }));
    };

    const updateCaptionStyle = (captionStyle: CaptionStyle) => {
        setFormState((prev) => ({ ...prev, captionStyle }));
    };

    const updateSeriesDetails = (details: Partial<CreateSeriesState['seriesDetails']>) => {
        setFormState((prev) => ({
            ...prev,
            seriesDetails: { ...prev.seriesDetails, ...details }
        }));
    };

    // Helper to check if continue should be disabled
    const isContinueDisabled = () => {
        if (currentStep === 1) return !formState.niche;
        if (currentStep === 2) return !formState.language || !formState.voice;
        if (currentStep === 3) return formState.bgMusic.length === 0;
        if (currentStep === 4) return !formState.videoStyle;
        if (currentStep === 5) return !formState.captionStyle;
        if (currentStep === 6) {
            return !formState.seriesDetails.name ||
                !formState.seriesDetails.duration ||
                formState.seriesDetails.platforms.length === 0;
        }
        return false;
    };

    return (
        <div className="max-w-5xl mx-auto h-full flex flex-col">
            <div className="flex items-center mb-6 relative">
                {/* Top Left Back Button */}
                {currentStep > 1 && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBack}
                        className="absolute left-0 -ml-12 hidden lg:flex rounded-full"
                        title="Go Back"
                    >
                        <ArrowLeft className="size-5" />
                    </Button>
                )}
                {/* Mobile Back Button (inline) */}
                {currentStep > 1 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="lg:hidden mr-2"
                    >
                        <ArrowLeft className="size-4" />
                    </Button>
                )}

                <div className="flex-1">
                    <CreateStepper currentStep={currentStep} />
                </div>
            </div>

            <div className="flex-1 flex flex-col relative min-h-[600px]">
                <div className="flex-1">
                    {currentStep === 1 && (
                        <NicheSelection
                            selectedNiche={formState.niche}
                            onSelectNiche={updateNiche}
                        />
                    )}

                    {currentStep === 2 && (
                        <LanguageVoiceSelection
                            language={formState.language}
                            voiceStyle={formState.voice}
                            onLanguageChange={updateLanguage}
                            onVoiceChange={updateVoice}
                        />
                    )}

                    {currentStep === 3 && (
                        <BackgroundMusicSelection
                            selectedMusic={formState.bgMusic}
                            onMusicChange={updateBgMusic}
                        />
                    )}

                    {currentStep === 4 && (
                        <VideoStyleSelection
                            selectedStyle={formState.videoStyle}
                            onStyleSelect={updateVideoStyle}
                        />
                    )}

                    {currentStep === 5 && (
                        <CaptionStyleSelection
                            selectedCaption={formState.captionStyle}
                            onSelectCaption={updateCaptionStyle}
                        />
                    )}

                    {currentStep === 6 && (
                        <SeriesDetails
                            data={formState.seriesDetails}
                            onUpdate={updateSeriesDetails}
                        />
                    )}
                </div>

                <CreateSeriesFooter
                    currentStep={currentStep}
                    onBack={handleBack}
                    onContinue={handleContinue}
                    isContinueDisabled={isContinueDisabled()}
                />
            </div>
        </div>
    );
}
