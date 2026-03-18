"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signIn.email({ email, password });
    if (result.error) {
      setError(result.error.message ?? "Invalid credentials");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  async function handleGithub() {
    await signIn.social({ provider: "github", callbackURL: "/dashboard" });
  }

  async function handleGoogle() {
    await signIn.social({ provider: "google", callbackURL: "/dashboard" });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        background: "#0D0F12",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#F1F5F9",
              textDecoration: "none",
            }}
          >
            <span style={{ color: "#3ECF8E" }}>Core</span>Stack
          </Link>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
          <h1
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "0.375rem",
            }}
          >
            Welcome back
          </h1>
          <p
            style={{
              fontSize: "0.8rem",
              color: "#64748B",
              textAlign: "center",
              marginBottom: "1.75rem",
            }}
          >
            Sign in to your CoreStack account
          </p>

          {/* Social buttons */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}
          >
            <button onClick={handleGoogle} className="btn" style={{ justifyContent: "center", gap: "0.6rem" }}>
              <GoogleIcon />
              Continue with Google
            </button>
            <button onClick={handleGithub} className="btn" style={{ justifyContent: "center", gap: "0.6rem" }}>
              <GithubIcon />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <div className="divider" style={{ flex: 1 }} />
            <span
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "0.65rem",
                color: "#64748B",
                letterSpacing: "0.08em",
              }}
            >
              OR
            </span>
            <div className="divider" style={{ flex: 1 }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "0.72rem",
                  color: "#64748B",
                  marginBottom: "0.4rem",
                  letterSpacing: "0.04em",
                }}
              >
                Email
              </label>
              <input
                id="email"
                className="input"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <label
                  htmlFor="password"
                  style={{
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "0.72rem",
                    color: "#64748B",
                    letterSpacing: "0.04em",
                  }}
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  style={{
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "0.7rem",
                    color: "#64748B",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#3ECF8E")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
                >
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                className="input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "0.75rem",
                  color: "#ef4444",
                  padding: "0.6rem 0.75rem",
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  borderRadius: "6px",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ justifyContent: "center", padding: "0.7rem" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.25rem",
            fontSize: "0.8rem",
            color: "#64748B",
          }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            style={{ color: "#3ECF8E", textDecoration: "none" }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3c-.19 1-.75 1.85-1.6 2.41v2h2.58c1.52-1.4 2.4-3.46 2.4-5.87z" fill="#4285F4" />
      <path d="M8 16c2.16 0 3.97-.71 5.3-1.95l-2.59-2c-.72.48-1.64.77-2.71.77-2.08 0-3.84-1.4-4.47-3.3H.86v2.07C2.18 14.18 4.9 16 8 16z" fill="#34A853" />
      <path d="M3.53 9.52A4.77 4.77 0 013.28 8c0-.53.09-1.04.25-1.52V4.41H.86A8 8 0 000 8c0 1.3.31 2.52.86 3.59l2.67-2.07z" fill="#FBBC05" />
      <path d="M8 3.18c1.17 0 2.22.4 3.05 1.2l2.28-2.28C11.97.8 10.16 0 8 0 4.9 0 2.18 1.82.86 4.41L3.53 6.48C4.16 4.58 5.92 3.18 8 3.18z" fill="#EA4335" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
