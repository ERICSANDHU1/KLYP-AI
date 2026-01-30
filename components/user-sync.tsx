"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function UserSync() {
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (isLoaded && user) {
            const syncUser = async () => {
                try {
                    // Check if user exists
                    const { data, error } = await supabase
                        .from("users")
                        .select("id")
                        .eq("id", user.id)
                        .single();

                    if (!data) {
                        // User doesn't exist, insert them
                        const { error: insertError } = await supabase.from("users").insert({
                            id: user.id,
                            email: user.primaryEmailAddress?.emailAddress,
                            full_name: user.fullName || "",
                            avatar_url: user.imageUrl,
                            created_at: new Date().toISOString(),
                        });

                        if (insertError) {
                            console.error("Error syncing user to Supabase:", insertError);
                        } else {
                            console.log("User synced to Supabase successfully");
                        }
                    }
                } catch (err) {
                    console.error("Sync error:", err);
                }
            };

            syncUser();
        }
    }, [user, isLoaded]);

    return null; // This component doesn't render anything
}
