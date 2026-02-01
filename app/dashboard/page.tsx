"use client";

import { useState, useEffect } from "react";
import { UserSync } from "@/components/user-sync";
import { TopMetrics } from "@/components/dashboard/metrics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Video, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useSession, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SeriesCard, Series } from "@/components/dashboard/series-card";

const data = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 550 },
    { name: 'Thu', value: 450 },
    { name: 'Fri', value: 650 },
    { name: 'Sat', value: 500 },
    { name: 'Sun', value: 700 },
];

export default function DashboardPage() {
    const { user } = useUser();
    const router = useRouter();
    const { session } = useSession();
    const [recentSeries, setRecentSeries] = useState<Series[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Quick Generate State
    const [quickPrompt, setQuickPrompt] = useState("");
    const [selectedFormat, setSelectedFormat] = useState("Reels (9:16)");

    const handleQuickGenerate = () => {
        if (!quickPrompt.trim()) {
            toast.error("Please enter a topic first");
            return;
        }
        // Redirect with query params
        const params = new URLSearchParams();
        params.set("topic", quickPrompt.trim());
        params.set("format", selectedFormat);
        router.push(`/dashboard/create?${params.toString()}`);
    };

    const getSupabaseClient = async () => {
        const token = await session?.getToken({ template: 'supabase' });
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        const clientHeaders: Record<string, string> = {};
        if (token) clientHeaders.Authorization = `Bearer ${token}`;

        return createClient(supabaseUrl, supabaseKey, {
            global: { headers: clientHeaders },
        });
    };

    const fetchSeries = async () => {
        if (!session || !user) return;

        try {
            const client = await getSupabaseClient();
            const { data, error } = await client
                .from('series_v2')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRecentSeries(data || []);
        } catch (error) {
            console.error("Error fetching series:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSeries();
    }, [session, user]);

    const handleEdit = (series: Series) => {
        router.push(`/dashboard/create?id=${series.id}`);
    };

    const handleDelete = async (series: Series) => {
        if (!confirm("Are you sure you want to delete this series?")) return;

        try {
            const client = await getSupabaseClient();
            const { error } = await client
                .from('series_v2')
                .delete()
                .eq('id', series.id);

            if (error) throw error;

            toast.success("Series deleted");
            setRecentSeries(prev => prev.filter(s => s.id !== series.id));
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Error deleting series: ${error.message}`);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    };

    const handleToggleStatus = async (series: Series) => {
        const newStatus = series.status === 'paused' ? 'active' : 'paused';
        try {
            const client = await getSupabaseClient();
            const { error } = await client
                .from('series_v2')
                .update({ status: newStatus })
                .eq('id', series.id);

            if (error) throw error;

            setRecentSeries(prev => prev.map(s =>
                s.id === series.id ? { ...s, status: newStatus } : s
            ));
            toast.success(`Series ${newStatus === 'paused' ? 'paused' : 'resumed'}`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Error updating status: ${error.message}`);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    };

    const handleGenerate = async (series: Series) => {
        toast.success("Triggering video generation...");
        // Call your generation API here
        try {
            // Example: await generateVideo(series.id);
        } catch (error) {
            toast.error("Failed to trigger generation");
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <UserSync />

            <TopMetrics />

            {/* AI Video Generator Panel */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles size={120} />
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Quick Generate</h2>
                        <p className="text-sm text-muted-foreground">Turn an idea into a video in seconds.</p>
                    </div>
                </div>

                <div className="space-y-4 relative z-10 max-w-4xl">
                    <div>
                        <Input
                            value={quickPrompt}
                            onChange={(e) => setQuickPrompt(e.target.value)}
                            placeholder="What's your video about? e.g. 5 tips for productivity using AI..."
                            className="bg-secondary/30 h-14 text-lg border-border/60"
                            onKeyDown={(e) => e.key === "Enter" && handleQuickGenerate()}
                        />
                    </div>

                    <div className="flex flex-wrap gap-3 items-center justify-between">
                        <div className="flex gap-2">
                            {["Reels (9:16)", "Shorts (9:16)", "Email (16:9)", "Promo (1:1)"].map((preset) => (
                                <button
                                    key={preset}
                                    onClick={() => setSelectedFormat(preset)}
                                    className={`px-4 py-2 rounded-full border text-xs font-medium transition-all ${selectedFormat === preset
                                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-sm"
                                        : "border-border/50 bg-secondary/20 hover:bg-primary/10 hover:border-primary/50 text-muted-foreground"
                                        }`}
                                >
                                    {preset}
                                </button>
                            ))}
                        </div>
                        <Button
                            onClick={handleQuickGenerate}
                            className="h-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/25 px-8"
                        >
                            <Sparkles size={18} className="mr-2" />
                            Generate Magic Video
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Recent Series Grid */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Video size={20} className="text-cyan-500" />
                        Your Series
                    </h2>
                    <Button onClick={() => router.push('/dashboard/create')}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Series
                    </Button>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-64 rounded-xl bg-secondary/20 animate-pulse" />
                        ))}
                    </div>
                ) : recentSeries.length === 0 ? (
                    <div className="text-center py-20 bg-secondary/5 rounded-2xl border border-dashed border-border/50">
                        <div className="mx-auto w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                            <Video size={32} />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No series created yet</h3>
                        <p className="text-muted-foreground mb-6">Create your first video series to get started.</p>
                        <Button onClick={() => router.push('/dashboard/create')}>Create Series</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {recentSeries.map((series) => (
                            <SeriesCard
                                key={series.id}
                                series={series}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onToggleStatus={handleToggleStatus}
                                onGenerate={handleGenerate}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Analytics Chart Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm"
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            Engagement Overview
                        </h2>
                        <p className="text-sm text-muted-foreground">Across all connected platforms</p>
                    </div>
                    <select className="bg-secondary/30 border border-border/50 rounded-lg text-sm px-3 py-1">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#18181b', borderColor: '#333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
}
