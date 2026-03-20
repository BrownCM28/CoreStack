import { notFound } from "next/navigation";
import Link from "next/link";
import { getMockJobBySlug } from "@/lib/mock-data";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";

interface JobPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const job = getMockJobBySlug(params.id);
  if (!job) return { title: "Job Not Found" };
  return {
    title: `${job.title} at ${job.company.name}`,
    description: job.description.slice(0, 160),
  };
}

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full-Time",
  PART_TIME: "Part-Time",
  CONTRACT: "Contract",
  TEMPORARY: "Temporary",
  INTERNSHIP: "Internship",
};

export default async function JobPage({ params }: JobPageProps) {
  const job = getMockJobBySlug(params.id);

  if (!job) notFound();

  const postedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(job.createdAt);

  return (
    <>
      <Navbar />
      <main>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "2.5rem 1.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Main content */}
          <div>
            {/* Breadcrumb */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <Link
                href="/jobs"
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "0.75rem",
                  color: "#64748B",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#3ECF8E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
              >
                Jobs
              </Link>
              <span
                style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.75rem", color: "#1E2128" }}
              >
                /
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "0.75rem",
                  color: "#64748B",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "300px",
                }}
              >
                {job.title}
              </span>
            </div>

            {/* Header */}
            <div className="card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
              {job.featured && (
                <span className="badge badge-accent" style={{ marginBottom: "1rem" }}>
                  Featured
                </span>
              )}
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem",
                }}
              >
                {job.title}
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "0.875rem",
                  color: "#64748B",
                  marginBottom: "1.25rem",
                }}
              >
                {job.company.name}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <span className="badge">{job.location}</span>
                <span className="badge">{JOB_TYPE_LABELS[job.type] ?? job.type}</span>
                {job.isRemote && <span className="badge badge-accent">Remote</span>}
                {(job.salaryMin || job.salaryMax) && (
                  <span className="badge">
                    {job.salaryMin && job.salaryMax
                      ? `$${(job.salaryMin / 1000).toFixed(0)}k – $${(job.salaryMax / 1000).toFixed(0)}k`
                      : job.salaryMin
                        ? `$${(job.salaryMin / 1000).toFixed(0)}k+`
                        : `Up to $${(job.salaryMax! / 1000).toFixed(0)}k`}
                  </span>
                )}
                {job.experience && <span className="badge">{job.experience}</span>}
              </div>

              <div
                style={{
                  marginTop: "1.25rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid #1E2128",
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "0.7rem",
                  color: "#64748B",
                }}
              >
                Posted {postedDate}
                {job.expiresAt && (
                  <span>
                    {" · "}Closes{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                    }).format(job.expiresAt)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
              <SectionTitle>About the role</SectionTitle>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#F1F5F9",
                  lineHeight: 1.75,
                  whiteSpace: "pre-wrap",
                }}
              >
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="card" style={{ padding: "2rem" }}>
                <SectionTitle>Requirements</SectionTitle>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "#F1F5F9",
                    lineHeight: 1.75,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {job.requirements}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: "80px" }}>
            {/* Apply card */}
            <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
              <Link
                href={`/jobs/${job.slug}/apply`}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "0.75rem",
                  fontSize: "0.875rem",
                  marginBottom: "0.75rem",
                }}
              >
                Apply Now
              </Link>
              <button
                className="btn"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "0.625rem",
                  fontSize: "0.8rem",
                }}
              >
                Save Job
              </button>
            </div>

            {/* Company card */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <SectionTitle>About the company</SectionTitle>
              <p
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#F1F5F9",
                  marginBottom: "0.5rem",
                }}
              >
                {job.company.name}
              </p>
              {job.company.description && (
                <p style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.65 }}>
                  {job.company.description}
                </p>
              )}
              {job.company.website && (
                <a
                  href={job.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "0.75rem",
                    color: "#3ECF8E",
                    marginTop: "0.75rem",
                    textDecoration: "none",
                  }}
                >
                  Visit website ↗
                </a>
              )}
              <div style={{ marginTop: "1.25rem" }}>
                <Link
                  href={`/companies/${job.company.slug}`}
                  className="btn"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    padding: "0.5rem",
                  }}
                >
                  All jobs at {job.company.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-family-mono)",
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "#64748B",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginBottom: "1rem",
      }}
    >
      {children}
    </h2>
  );
}
