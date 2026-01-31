"use client";

import { cn } from "@/lib/utils";

interface CreateStepperProps {
    currentStep: number;
    totalSteps?: number;
}

export function CreateStepper({ currentStep, totalSteps = 6 }: CreateStepperProps) {
    return (
        <div className="flex w-full gap-2 mb-8">
            {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;

                return (
                    <div
                        key={index}
                        className={cn(
                            "h-1.5 flex-1 rounded-full transition-colors duration-300",
                            isActive ? "bg-primary" : isCompleted ? "bg-primary/50" : "bg-secondary"
                        )}
                    />
                );
            })}
        </div>
    );
}
