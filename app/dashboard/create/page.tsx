"use client";

import { useState } from "react";
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
    const [currentStep, setCurrentStep] = useState(1);

    // Unified state for the entire multi-step form
    const [formState, setFormState] = useState<CreateSeriesState>({
        niche: null,
        language: null,
        voice: null,
        bgMusic: [],
        videoStyle: null,
        captionStyle: null,
        seriesDetails: {
            name: "",
            duration: "",
            platforms: [],
            publishTime: "12:00",
        },
    });

    const handleContinue = () => {
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
                console.log("Submitting Final Series Config:", formState);
                alert("Series Created! (Mock)");
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
            <CreateStepper currentStep={currentStep} />

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
