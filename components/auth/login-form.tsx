"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function LoginForm() {
  const router = useRouter();
  const [userId, setUserId] = useState("anthony012");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password })
      });

      const data = (await response.json()) as { ok: boolean; redirectTo?: string; error?: string };

      if (!response.ok || !data.ok || !data.redirectTo) {
        throw new Error(data.error ?? "Login failed");
      }

      router.push(data.redirectTo);
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-sm animate-scaleIn overflow-hidden border-[#2a2e42]">
      <CardHeader className="space-y-3 bg-gradient-to-br from-brand-700 via-brand-800 to-surface-darker text-white">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
          <ShieldCheck className="h-5 w-5 text-gold-400" />
        </div>
        <div>
          <CardTitle className="text-lg text-white">Iris Connect</CardTitle>
          <CardDescription className="text-xs text-white/60">
            A polished school ERP prototype for Iris Crown School.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-5">
        <form className="space-y-3" onSubmit={onSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#9498ab]">User ID</label>
            <Input value={userId} onChange={(event) => setUserId(event.target.value)} placeholder="anthony012" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#9498ab]">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error ? (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>
          ) : null}
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="rounded-lg border border-[#2a2e42] bg-[#1a1d2b] p-3 text-xs text-[#9498ab]">
          <p className="font-medium text-[#f1f3f7]">Demo accounts</p>
          <div className="mt-2 space-y-0.5">
            <p>Admin: <span className="font-medium text-gold-400">anthony012 / admin123</span></p>
            <p>Teacher: <span className="font-medium text-gold-400">avantika012 / teacher123</span></p>
            <p>Student: <span className="font-medium text-gold-400">shantam012 / student123</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
