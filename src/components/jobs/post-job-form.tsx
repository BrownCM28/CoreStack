"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { value: "DATA_CENTER_CONSTRUCTION", label: "Data Center Construction" },
  { value: "DATA_CENTER_OPERATIONS", label: "Data Center Operations" },
  { value: "NETWORK_ENGINEERING", label: "Network Engineering" },
  { value: "AI_ML_INFRASTRUCTURE", label: "AI / ML Infrastructure" },
  { value: "POWER_SYSTEMS", label: "Power Systems" },
  { value: "COOLING_HVAC", label: "Cooling & HVAC" },
  { value: "PHYSICAL_SECURITY", label: "Physical Security" },
  { value: "SITE_RELIABILITY", label: "Site Reliability" },
  { value: "CLOUD_ENGINEERING", label: "Cloud Engineering" },
  { value: "PROJECT_MANAGEMENT", label: "Project Management" },
  { value: "SALES_BUSINESS_DEV", label: "Sales & Business Development" },
  { value: "OTHER", label: "Other" },
];

const JOB_TYPES = [
  { value: "FULL_TIME", label: "Full-Time" },
  { value: "PART_TIME", label: "Part-Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "TEMPORARY", label: "Temporary" },
  { value: "INTERNSHIP", label: "Internship" },
];

export function PostJobForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Failed to post job. Please try again.");
      setLoading(false);
      return;
    }

    const job = await res.json();
    router.push(`/jobs/${job.slug}`);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Section: Role */}
      <FormSection title="Role Details">
        <FormGroup label="Job Title" htmlFor="title" required>
          <input
            id="title"
            name="title"
            className="input"
            type="text"
            placeholder="e.g. Senior Data Center Technician"
            required
          />
        </FormGroup>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <FormGroup label="Category" htmlFor="category" required>
            <select id="category" name="category" className="input" required style={{ cursor: "pointer" }}>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </FormGroup>

          <FormGroup label="Job Type" htmlFor="type" required>
            <select id="type" name="type" className="input" required style={{ cursor: "pointer" }}>
              {JOB_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </FormGroup>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <FormGroup label="Location" htmlFor="location" required>
            <input
              id="location"
              name="location"
              className="input"
              type="text"
              placeholder="e.g. Ashburn, VA"
              required
            />
          </FormGroup>

          <FormGroup label="Experience Level" htmlFor="experience">
            <input
              id="experience"
              name="experience"
              className="input"
              type="text"
              placeholder="e.g. 3–5 years"
            />
          </FormGroup>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <input
            id="isRemote"
            name="isRemote"
            type="checkbox"
            value="true"
            style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#3ECF8E" }}
          />
          <label
            htmlFor="isRemote"
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "0.8rem",
              color: "#F1F5F9",
              cursor: "pointer",
            }}
          >
            This role can be performed remotely
          </label>
        </div>
      </FormSection>

      {/* Section: Compensation */}
      <FormSection title="Compensation">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <FormGroup label="Salary Min (USD/yr)" htmlFor="salaryMin">
            <input
              id="salaryMin"
              name="salaryMin"
              className="input"
              type="number"
              placeholder="e.g. 80000"
              min={0}
            />
          </FormGroup>
          <FormGroup label="Salary Max (USD/yr)" htmlFor="salaryMax">
            <input
              id="salaryMax"
              name="salaryMax"
              className="input"
              type="number"
              placeholder="e.g. 120000"
              min={0}
            />
          </FormGroup>
        </div>
      </FormSection>

      {/* Section: Description */}
      <FormSection title="Job Details">
        <FormGroup label="Job Description" htmlFor="description" required>
          <textarea
            id="description"
            name="description"
            className="input"
            placeholder="Describe the role, responsibilities, team, and what makes this a great opportunity..."
            required
            rows={8}
            style={{ resize: "vertical", fontFamily: "inherit" }}
          />
        </FormGroup>

        <FormGroup label="Requirements" htmlFor="requirements">
          <textarea
            id="requirements"
            name="requirements"
            className="input"
            placeholder="List required skills, certifications, clearances, and qualifications..."
            rows={5}
            style={{ resize: "vertical", fontFamily: "inherit" }}
          />
        </FormGroup>
      </FormSection>

      {error && (
        <p
          style={{
            fontFamily: "var(--font-family-mono)",
            fontSize: "0.75rem",
            color: "#ef4444",
            padding: "0.75rem",
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "6px",
          }}
        >
          {error}
        </p>
      )}

      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
        <button type="button" className="btn" onClick={() => router.back()}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ minWidth: "140px", justifyContent: "center" }}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </div>
    </form>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card" style={{ padding: "1.75rem" }}>
      <h2
        style={{
          fontFamily: "var(--font-family-mono)",
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "#64748B",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "1.25rem",
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {children}
      </div>
    </div>
  );
}

function FormGroup({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        style={{
          display: "block",
          fontFamily: "var(--font-family-mono)",
          fontSize: "0.72rem",
          color: "#64748B",
          marginBottom: "0.4rem",
          letterSpacing: "0.04em",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#3ECF8E", marginLeft: "0.2rem" }}>*</span>
        )}
      </label>
      {children}
    </div>
  );
}
