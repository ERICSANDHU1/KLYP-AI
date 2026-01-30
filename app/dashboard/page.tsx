"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, User } from "lucide-react";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
            } else {
                setUser(session.user);
            }
        };
        checkUser();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="border-b border-border/50 bg-card/50 backdrop-blur-md">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">K</div>
                        <span className="font-bold text-lg">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{user.email}</span>
                        <Button variant="ghost" size="icon" onClick={handleLogout}>
                            <LogOut size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-xl bg-card border border-border/50 shadow-sm">
                        <div className="flex items-center gap-3 mb-4 text-primary">
                            <LayoutDashboard size={24} />
                            <h2 className="text-xl font-bold text-foreground">Projects</h2>
                        </div>
                        <p className="text-muted-foreground">You have 0 active projects.</p>
                        <Button className="mt-4 w-full bg-primary/10 text-primary hover:bg-primary/20">Create New</Button>
                    </div>

                    <div className="p-6 rounded-xl bg-card border border-border/50 shadow-sm">
                        <div className="flex items-center gap-3 mb-4 text-indigo-400">
                            <User size={24} />
                            <h2 className="text-xl font-bold text-foreground">Profile</h2>
                        </div>
                        <p className="text-muted-foreground">Manage your account settings.</p>
                        <Button variant="outline" className="mt-4 w-full">Edit Profile</Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
