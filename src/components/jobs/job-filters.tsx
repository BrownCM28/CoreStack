"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CATEGORIES = [
  { value: "DATA_CENTER_CONSTRUCTION", label: "DC Construction" },
  { value: "DATA_CENTER_OPERATIONS", label: "DC Operations" },
  { value: "NETWORK_ENGINEERING", label: "Network Engineering" },
  { value: "AI_ML_INFRASTRUCTURE", label: "AI / ML Infra" },
  { value: "POWER_SYSTEMS", label: "Power Systems" },
  { value: "COOLING_HVAC", label: "Cooling & HVAC" },
  { value: "PHYSICAL_SECURITY", label: "Physical Security" },
  { value: "SITE_RELIABILITY", label: "Site Reliability" },
  { value: "CLOUD_ENGINEERING", label: "Cloud Engineering" },
  { value: "PROJECT_MANAGEMENT", label: "Project Management" },
  { value: "SALES_BUSINESS_DEV", label: "Sales & BD" },
  { value: "OTHER", label: "Other" },
];

const JOB_TYPES = [
  { value: "FULL_TIME", label: "Full-Time" },
  { value: "PART_TIME", label: "Part-Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "TEMPORARY", label: "Temporary" },
  { value: "INTERNSHIP", label: "Internship" },
];

interface JobFiltersProps {
  searchParams: {
    category?: string;
    type?: string;
    remote?: string;
    q?: string;
  };
}

export function JobFilters({ searchParams }: JobFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params.toString());
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      next.delete("page");
      router.push(`${pathname}?${next.toString()}`);
    },
    [params, pathname, router],
  );

  const toggleParam = useCallback(
    (key: string, value: string) => {
      const current = params.get(key);
      setParam(key, current === value ? null : value);
    },
    [params, setParam],
  );

  const clearAll = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  const hasFilters = !!(
    searchParams.category ||
    searchParams.type ||
    searchParams.remote
  );

  return (
    <aside style={{ position: "sticky", top: "80px" }}>
      {/* Search */}
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          className="input"
          type="search"
          placeholder="Search jobs..."
          defaultValue={searchParams.q ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            const timer = setTimeout(() => setParam("q", val || null), 400);
            return () => clearTimeout(timer);
          }}
        />
      </div>

      {/* Clear */}
      {hasFilters && (
        <button
          onClick={clearAll}
          style={{
            width: "100%",
            marginBottom: "1.5rem",
            fontFamily: "var(--font-family-mono)",
            fontSize: "0.72rem",
            color: "#64748B",
            background: "transparent",
            border: "1px solid #1E2128",
            borderRadius: "6px",
            padding: "0.45rem",
            cursor: "pointer",
            transition: "color 0.15s, border-color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#3ECF8E";
            e.currentTarget.style.borderColor = "#3ECF8E";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#64748B";
            e.currentTarget.style.borderColor = "#1E2128";
          }}
        >
          Clear filters
        </button>
      )}

      {/* Remote toggle */}
      <div style={{ marginBottom: "1.5rem" }}>
        <FilterLabel>Work Style</FilterLabel>
        <FilterChip
          active={searchParams.remote === "true"}
          onClick={() => toggleParam("remote", "true")}
        >
          Remote Only
        </FilterChip>
      </div>

      {/* Job type */}
      <div style={{ marginBottom: "1.5rem" }}>
        <FilterLabel>Job Type</FilterLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {JOB_TYPES.map((t) => (
            <FilterChip
              key={t.value}
              active={searchParams.type === t.value}
              onClick={() => toggleParam("type", t.value)}
            >
              {t.label}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <FilterLabel>Category</FilterLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {CATEGORIES.map((c) => (
            <FilterChip
              key={c.value}
              active={searchParams.category === c.value}
              onClick={() => toggleParam("category", c.value)}
            >
              {c.label}
            </FilterChip>
          ))}
        </div>
      </div>
    </aside>
  );
}

function FilterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-family-mono)",
        fontSize: "0.65rem",
        fontWeight: 600,
        color: "#64748B",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginBottom: "0.6rem",
      }}
    >
      {children}
    </p>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.4rem 0.6rem",
        fontFamily: "var(--font-family-mono)",
        fontSize: "0.75rem",
        background: active ? "rgba(62, 207, 142, 0.08)" : "transparent",
        border: `1.5px solid ${active ? "rgba(62, 207, 142, 0.4)" : "#1E2128"}`,
        borderRadius: "6px",
        color: active ? "#3ECF8E" : "#64748B",
        cursor: "pointer",
        transition: "all 0.15s ease",
        textAlign: "left",
        width: "100%",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.color = "#F1F5F9";
          e.currentTarget.style.borderColor = "#2D3340";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.color = "#64748B";
          e.currentTarget.style.borderColor = "#1E2128";
        }
      }}
    >
      <span
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          border: `1.5px solid ${active ? "#3ECF8E" : "#2D3340"}`,
          background: active ? "#3ECF8E" : "transparent",
          flexShrink: 0,
          transition: "all 0.15s ease",
        }}
      />
      {children}
    </button>
  );
}
