
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);

    const onUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Placeholder for future password update logic
        // This requires a separate API route which we can build if requested
        await new Promise(r => setTimeout(r, 1000));
        alert("Password update functionality requires strict security implementation. currently disabled for safety demo.");
        setLoading(false);
    };

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold uppercase tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your admin preferences.</p>
            </div>

            <Card className="rounded-none border-gray-200">
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Update your personal account information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input disabled value="userme782.dev@gmail.com" />
                        <p className="text-[10px] text-muted-foreground">Contact support to change email.</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-none border-gray-200">
                <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Change your password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onUpdatePassword} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current">Current Password</Label>
                            <Input id="current" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new">New Password</Label>
                            <Input id="new" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm">Confirm New Password</Label>
                            <Input id="confirm" type="password" required />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full bg-black hover:bg-neutral-800">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
