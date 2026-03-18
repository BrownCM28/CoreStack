import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JobFilters } from "@/components/jobs/job-filters";
import { JobList } from "@/components/jobs/job-list";

export const metadata = {
  title: "Browse Jobs",
  description:
    "Find data center construction, operations, and AI infrastructure jobs.",
};

interface JobsPageProps {
  searchParams: {
    category?: string;
    type?: string;
    remote?: string;
    q?: string;
    page?: string;
  };
}

function FiltersSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            height: "32px",
            background: "#111318",
            border: "1.5px solid #1E2128",
            borderRadius: "6px",
            opacity: 1 - i * 0.12,
          }}
        />
      ))}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            height: "100px",
            background: "#111318",
            border: "1.5px solid #1E2128",
            borderRadius: "8px",
            opacity: 1 - i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

export default function JobsPage({ searchParams }: JobsPageProps) {
  return (
    <>
      <Navbar />

      <main style={{ minHeight: "calc(100vh - 60px)" }}>
        {/* Page header */}
        <div
          style={{
            borderBottom: "1px solid #1E2128",
            padding: "2.5rem 1.5rem 2rem",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              Browse Jobs
            </h1>
            <p style={{ fontSize: "0.875rem", color: "#64748B" }}>
              Data center construction, operations &amp; AI infrastructure roles
            </p>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "2rem 1.5rem",
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          <Suspense fallback={<FiltersSkeleton />}>
            <JobFilters searchParams={searchParams} />
          </Suspense>
          <Suspense fallback={<ListSkeleton />}>
            <JobList searchParams={searchParams} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
