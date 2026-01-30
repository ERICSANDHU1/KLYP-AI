import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User } from "lucide-react";
import { UserSync } from "@/components/user-sync";

export default async function DashboardPage() {
    // Get the user from Clerk (Server Side)
    const user = await currentUser();

    if (!user) return <div>Access Denied</div>;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <UserSync />
            <div className="border-b border-border/50 bg-card/50 backdrop-blur-md">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">K</div>
                        <span className="font-bold text-lg">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Hello, {user.firstName || user.emailAddresses[0].emailAddress}</span>
                        {/* Clerk's UserButton handles account management and logout */}
                        <UserButton afterSignOutUrl="/" />
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
                        <p className="text-muted-foreground">Manage your account settings via Clerk.</p>
                        <Button variant="outline" className="mt-4 w-full" disabled>Managed by Clerk</Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
