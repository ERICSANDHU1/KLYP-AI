"use client";

import { VideoStyle } from "@/lib/video-style-data";
import { format } from "date-fns";
import { MoreVertical, Edit, Trash2, Play, Pause, Video, Sparkles, FolderEdit } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export interface Series {
    id: string;
    name: string;
    created_at: string;
    status: string;
    video_style_config: VideoStyle | null;
    publish_platforms: string[];
    // Add other fields as needed based on schema
}

interface SeriesCardProps {
    series: Series;
    onEdit: (series: Series) => void;
    onDelete: (series: Series) => void;
    onToggleStatus: (series: Series) => void;
    onGenerate: (series: Series) => void;
}

export function SeriesCard({ series, onEdit, onDelete, onToggleStatus, onGenerate }: SeriesCardProps) {
    // Fallback image if video style changes or is missing
    const thumbnail = series.video_style_config?.image || "/placeholder-image.jpg";
    const isPaused = series.status === 'paused';

    return (
        <div className="group relative flex flex-col rounded-xl border border-border/50 bg-card overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
            {/* Thumbnail Section */}
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                    src={thumbnail}
                    alt={series.name}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isPaused ? 'grayscale' : ''}`}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                {/* Top Right Actions */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
                        onClick={() => onEdit(series)}
                    >
                        <Edit size={14} />
                    </Button>
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1">
                    {series.status === 'active' && (
                        <Badge variant="secondary" className="bg-green-500/20 text-green-500 border-green-500/30 text-[10px] h-5 px-1.5">
                            ACTIVE
                        </Badge>
                    )}
                    {isPaused && (
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-[10px] h-5 px-1.5">
                            PAUSED
                        </Badge>
                    )}
                    <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm text-white border-white/10 text-[10px] h-5 px-1.5">
                        {series.video_style_config?.name || 'No Style'}
                    </Badge>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                        <h3 className="font-semibold text-base line-clamp-1" title={series.name}>
                            {series.name}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            {format(new Date(series.created_at), "MMM d, yyyy")}
                        </p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground">
                                <MoreVertical size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => onEdit(series)}>
                                <FolderEdit className="mr-2 h-4 w-4" />
                                Edit Series
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onToggleStatus(series)}>
                                {isPaused ? (
                                    <>
                                        <Play className="mr-2 h-4 w-4" />
                                        Resume
                                    </>
                                ) : (
                                    <>
                                        <Pause className="mr-2 h-4 w-4" />
                                        Pause
                                    </>
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600 focus:text-red-600 focus:bg-red-100/10"
                                onClick={() => onDelete(series)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="mt-auto pt-4 flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-8 text-xs border-dashed"
                        onClick={() => window.location.href = `/dashboard/series/${series.id}`}
                    >
                        <Video size={14} className="mr-2" />
                        View Videos
                    </Button>
                    <Button
                        size="sm"
                        className="flex-1 h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-0"
                        onClick={() => onGenerate(series)}
                    >
                        <Sparkles size={14} className="mr-2" />
                        Generate
                    </Button>
                </div>
            </div>
        </div>
    );
}
