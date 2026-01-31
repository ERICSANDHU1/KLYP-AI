export interface CaptionAnimationConfig {
    type: "scale" | "karaoke" | "fade" | "slide" | "typewriter" | "neon";
    duration: number; // in seconds
    loop?: boolean;
}

export interface CaptionStyle {
    id: string;
    name: string;
    description: string;
    remotionPresetKey: string;
    typography: {
        fontFamily: string;
        fontWeight: string;
        textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
        fontSize?: string; // relative size like "text-2xl"
    };
    colors: {
        text: string;
        highlight?: string;
        background?: string;
        shadow?: string;
    };
    animation: CaptionAnimationConfig;
    containerClassName?: string; // Extra Tailwind classes for the container
    textClassName?: string; // Extra Tailwind classes for the text
}

export const CaptionStyles: CaptionStyle[] = [
    {
        id: "bold-pop",
        name: "Bold Pop",
        description: "Large, energetic text with pop-in animation",
        remotionPresetKey: "bold_pop",
        typography: {
            fontFamily: "Inter",
            fontWeight: "800",
            textTransform: "uppercase",
            fontSize: "text-2xl md:text-3xl",
        },
        colors: {
            text: "text-white",
            shadow: "drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
        },
        animation: { type: "scale", duration: 0.3 },
        textClassName: "tracking-tight leading-none",
    },
    {
        id: "karaoke-highlight",
        name: "Karaoke Highlight",
        description: "Word-by-word highlight for storytelling",
        remotionPresetKey: "karaoke",
        typography: {
            fontFamily: "Inter",
            fontWeight: "700",
            fontSize: "text-xl md:text-2xl",
        },
        colors: {
            text: "text-white",
            highlight: "text-yellow-400",
            shadow: "drop-shadow-md",
        },
        animation: { type: "karaoke", duration: 2.5 },
    },
    {
        id: "neon-glow",
        name: "Neon Glow",
        description: "Vibrant pulsating text for high impact",
        remotionPresetKey: "neon",
        typography: {
            fontFamily: "Outfit",
            fontWeight: "600",
            textTransform: "uppercase",
            fontSize: "text-xl md:text-2xl",
        },
        colors: {
            text: "text-cyan-400",
            shadow: "drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]",
        },
        animation: { type: "neon", duration: 1.5, loop: true },
        textClassName: "tracking-wider",
    },
    {
        id: "minimal-fade",
        name: "Minimal Fade",
        description: "Clean, professional lower-third style",
        remotionPresetKey: "minimal",
        typography: {
            fontFamily: "Inter",
            fontWeight: "500",
            fontSize: "text-lg",
        },
        colors: {
            text: "text-slate-100",
            shadow: "drop-shadow-sm",
        },
        animation: { type: "fade", duration: 0.5 },
        containerClassName: "justify-end pb-4",
    },
    {
        id: "boxed-slide",
        name: "Boxed Slide",
        description: "High contrast box used for emphasis",
        remotionPresetKey: "boxed",
        typography: {
            fontFamily: "Inter",
            fontWeight: "700",
            textTransform: "uppercase",
            fontSize: "text-lg md:text-xl",
        },
        colors: {
            text: "text-white",
            background: "bg-slate-900 border border-slate-700",
        },
        animation: { type: "slide", duration: 0.4 },
        containerClassName: "items-center",
        textClassName: "px-4 py-2 rounded-lg",
    },
    {
        id: "typewriter",
        name: "Typewriter",
        description: "Retro character reveal effect",
        remotionPresetKey: "typewriter",
        typography: {
            fontFamily: "Courier Prime, monospace",
            fontWeight: "600",
            fontSize: "text-xl",
        },
        colors: {
            text: "text-green-400",
            shadow: "drop-shadow-sm",
        },
        animation: { type: "typewriter", duration: 2.0 },
        textClassName: "tracking-normal",
    },
];
