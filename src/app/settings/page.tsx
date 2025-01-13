import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import PlaidLink from "@/components/PlaidLink";
import { useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import supabase from "@/config/supabaseclient";
import Link from "next/link";

export default function SettingsPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null); 
    };
    fetchSession();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <>
              <div>
                <Label>Email</Label>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div>
                <Label>Password</Label>
                <p className="text-sm text-muted-foreground">********</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
              <div className="pt-4">
                <h3 className="text-lg font-medium">Bank Account</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Link your bank account for automatic transaction tracking
                </p>
                <Button>
                  <PlaidLink user={user} variant="primary" /> Link Bank Account
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Please log in to manage your account settings.
              </p>
              <Button asChild>
                <Link href="/login">Login / Signup</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
