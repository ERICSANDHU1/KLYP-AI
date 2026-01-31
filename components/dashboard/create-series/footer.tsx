"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateSeriesFooterProps {
    onBack?: () => void;
    onContinue: () => void;
    isBackDisabled?: boolean;
    isContinueDisabled?: boolean;
    currentStep: number;
    className?: string;
}

export function CreateSeriesFooter({
    onBack,
    onContinue,
    isBackDisabled,
    isContinueDisabled,
    currentStep,
    className,
}: CreateSeriesFooterProps) {
    return (
        <div className={cn(
            "flex justify-between mt-8 pt-4 border-t border-border/10 sticky bottom-0 bg-background/95 backdrop-blur z-10 py-4",
            className
        )}>
            {/* Back Button - Only show if not on first step */}
            <div className="flex-1">
                {currentStep > 1 && (
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        disabled={isBackDisabled}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="mr-2 size-4" />
                        Back
                    </Button>
                )}
            </div>

            {/* Continue Button */}
            <div className="flex-1 flex justify-end">
                <Button
                    size="lg"
                    onClick={onContinue}
                    disabled={isContinueDisabled}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-semibold px-8"
                >
                    {currentStep === 6 ? "Schedule" : "Continue"}
                    {currentStep !== 6 && <ArrowRight className="size-4" />}
                </Button>
            </div>
        </div>
    );
}
