"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      style={{
        background: "rgba(13, 15, 18, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1.5px solid #000000",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-family-mono)",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#F1F5F9",
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
        >
          <span style={{ color: "#3ECF8E" }}>Core</span>Stack
          <span
            style={{
              fontSize: "0.6rem",
              padding: "0.15rem 0.4rem",
              border: "1.5px solid rgba(62, 207, 142, 0.4)",
              borderRadius: "3px",
              color: "#3ECF8E",
              fontWeight: 500,
              letterSpacing: "0.1em",
            }}
          >
            BETA
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
          className="hidden-mobile"
        >
          <NavLink href="/jobs">Browse Jobs</NavLink>
          <NavLink href="/companies">Companies</NavLink>
          <NavLink href="/post-job">Post a Job</NavLink>
        </nav>

        {/* Desktop Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
          className="hidden-mobile"
        >
          <Link href="/auth/sign-in" className="btn">
            Sign In
          </Link>
          <Link href="/auth/sign-up" className="btn btn-primary">
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            padding: "0.5rem",
            background: "transparent",
            border: "1.5px solid #1E2128",
            borderRadius: "6px",
            color: "#F1F5F9",
            cursor: "pointer",
          }}
          aria-label="Toggle menu"
          className="show-mobile"
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M2 2L16 16M16 2L2 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M2 5H16M2 9H16M2 13H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            borderTop: "1px solid #1E2128",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <MobileNavLink href="/jobs" onClick={() => setMobileOpen(false)}>
            Browse Jobs
          </MobileNavLink>
          <MobileNavLink href="/companies" onClick={() => setMobileOpen(false)}>
            Companies
          </MobileNavLink>
          <MobileNavLink href="/post-job" onClick={() => setMobileOpen(false)}>
            Post a Job
          </MobileNavLink>
          <div
            style={{
              borderTop: "1px solid #1E2128",
              paddingTop: "0.75rem",
              marginTop: "0.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Link href="/auth/sign-in" className="btn" style={{ justifyContent: "center" }}>
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="btn btn-primary"
              style={{ justifyContent: "center" }}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-family-mono)",
        fontSize: "0.8rem",
        color: "#64748B",
        padding: "0.375rem 0.75rem",
        borderRadius: "6px",
        transition: "color 0.15s ease, background 0.15s ease",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#F1F5F9";
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#64748B";
        e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        fontFamily: "var(--font-family-mono)",
        fontSize: "0.875rem",
        color: "#64748B",
        padding: "0.625rem 0.75rem",
        borderRadius: "6px",
        transition: "color 0.15s ease",
        textDecoration: "none",
      }}
    >
      {children}
    </Link>
  );
}
