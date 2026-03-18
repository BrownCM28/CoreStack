import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Job, Company, JobType, JobCategory } from "@prisma/client";

interface JobListProps {
  searchParams: {
    category?: string;
    type?: string;
    remote?: string;
    q?: string;
    page?: string;
  };
}

type JobWithCompany = Job & { company: Company };

const PAGE_SIZE = 20;

const JOB_TYPE_LABELS: Record<JobType, string> = {
  FULL_TIME: "Full-Time",
  PART_TIME: "Part-Time",
  CONTRACT: "Contract",
  TEMPORARY: "Temporary",
  INTERNSHIP: "Internship",
};

const CATEGORY_LABELS: Record<JobCategory, string> = {
  DATA_CENTER_CONSTRUCTION: "DC Construction",
  DATA_CENTER_OPERATIONS: "DC Operations",
  NETWORK_ENGINEERING: "Network Eng.",
  AI_ML_INFRASTRUCTURE: "AI / ML Infra",
  POWER_SYSTEMS: "Power Systems",
  COOLING_HVAC: "Cooling & HVAC",
  PHYSICAL_SECURITY: "Physical Security",
  SITE_RELIABILITY: "Site Reliability",
  CLOUD_ENGINEERING: "Cloud Engineering",
  PROJECT_MANAGEMENT: "Project Mgmt",
  SALES_BUSINESS_DEV: "Sales & BD",
  OTHER: "Other",
};

async function getJobs(searchParams: JobListProps["searchParams"]) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));
  const skip = (page - 1) * PAGE_SIZE;

  const where = {
    active: true,
    ...(searchParams.category && { category: searchParams.category as JobCategory }),
    ...(searchParams.type && { type: searchParams.type as JobType }),
    ...(searchParams.remote === "true" && { isRemote: true }),
    ...(searchParams.q && {
      OR: [
        { title: { contains: searchParams.q, mode: "insensitive" as const } },
        { description: { contains: searchParams.q, mode: "insensitive" as const } },
        { company: { name: { contains: searchParams.q, mode: "insensitive" as const } } },
      ],
    }),
  };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      include: { company: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: PAGE_SIZE,
      skip,
    }),
    prisma.job.count({ where }),
  ]);

  return { jobs, total, page, totalPages: Math.ceil(total / PAGE_SIZE) };
}

export async function JobList({ searchParams }: JobListProps) {
  const { jobs, total, page, totalPages } = await getJobs(searchParams);

  if (jobs.length === 0) {
    return (
      <div>
        <div
          style={{
            padding: "4rem 2rem",
            textAlign: "center",
            border: "1.5px solid #1E2128",
            borderRadius: "8px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "0.875rem",
              color: "#64748B",
              marginBottom: "0.5rem",
            }}
          >
            No jobs found
          </p>
          <p style={{ fontSize: "0.8rem", color: "#64748B" }}>
            Try adjusting your filters or check back soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Count */}
      <p
        style={{
          fontFamily: "var(--font-family-mono)",
          fontSize: "0.75rem",
          color: "#64748B",
          marginBottom: "1rem",
        }}
      >
        {total} {total === 1 ? "job" : "jobs"} found
      </p>

      {/* Job cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job as JobWithCompany} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/jobs?${new URLSearchParams({ ...searchParams, page: String(p) })}`}
              style={{
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-family-mono)",
                fontSize: "0.8rem",
                border: `1.5px solid ${p === page ? "rgba(62,207,142,0.4)" : "#1E2128"}`,
                borderRadius: "6px",
                color: p === page ? "#3ECF8E" : "#64748B",
                background: p === page ? "rgba(62,207,142,0.08)" : "transparent",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function JobCard({ job }: { job: JobWithCompany }) {
  const ageMs = Date.now() - job.createdAt.getTime();
  const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
  const ageLabel =
    ageDays === 0 ? "Today" : ageDays === 1 ? "Yesterday" : `${ageDays}d ago`;

  return (
    <Link href={`/jobs/${job.slug}`} style={{ textDecoration: "none" }}>
      <article
        className="card card-hover"
        style={{ padding: "1.25rem 1.5rem" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Featured indicator */}
            {job.featured && (
              <span className="badge badge-accent" style={{ marginBottom: "0.5rem" }}>
                Featured
              </span>
            )}

            <h3
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#F1F5F9",
                marginBottom: "0.3rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {job.title}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "0.8rem",
                color: "#64748B",
                marginBottom: "0.75rem",
              }}
            >
              {job.company.name}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              <span className="badge">{job.location}</span>
              <span className="badge">{JOB_TYPE_LABELS[job.type]}</span>
              <span className="badge">{CATEGORY_LABELS[job.category]}</span>
              {job.isRemote && <span className="badge badge-accent">Remote</span>}
              {(job.salaryMin || job.salaryMax) && (
                <span className="badge">
                  {job.salaryMin && job.salaryMax
                    ? `$${(job.salaryMin / 1000).toFixed(0)}k–$${(job.salaryMax / 1000).toFixed(0)}k`
                    : job.salaryMin
                      ? `$${(job.salaryMin / 1000).toFixed(0)}k+`
                      : `Up to $${(job.salaryMax! / 1000).toFixed(0)}k`}
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "0.7rem",
              color: "#64748B",
              flexShrink: 0,
              paddingTop: "0.1rem",
            }}
          >
            {ageLabel}
          </div>
        </div>
      </article>
    </Link>
  );
}
