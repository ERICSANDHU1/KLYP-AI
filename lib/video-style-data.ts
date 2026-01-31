export interface VideoStyle {
    id: string;
    name: string;
    image: string;
}

export const VideoStyles: VideoStyle[] = [
    {
        id: "realistic",
        name: "Realistic",
        image: "/video-style/realistic.png"
    },
    {
        id: "anime",
        name: "Anime",
        image: "/video-style/anime.png"
    },
    {
        id: "cyberpunk",
        name: "Cyberpunk",
        image: "/video-style/cyberpunk.png"
    },
    {
        id: "gta",
        name: "GTA Style",
        image: "/video-style/gta.png"
    },
    {
        id: "3d-render",
        name: "3D Cloud Render",
        image: "/video-style/3d-render.png"
    },
    {
        id: "cinematic",
        name: "Cinematic",
        image: "/video-style/cinematic.png"
    }
];
