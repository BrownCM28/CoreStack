import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const CATEGORIES = [
  { label: "Data Center Construction", count: 0, icon: "🏗️", slug: "DATA_CENTER_CONSTRUCTION" },
  { label: "Data Center Operations", count: 0, icon: "⚡", slug: "DATA_CENTER_OPERATIONS" },
  { label: "Network Engineering", count: 0, icon: "🔌", slug: "NETWORK_ENGINEERING" },
  { label: "AI / ML Infrastructure", count: 0, icon: "🤖", slug: "AI_ML_INFRASTRUCTURE" },
  { label: "Power Systems", count: 0, icon: "🔋", slug: "POWER_SYSTEMS" },
  { label: "Cooling & HVAC", count: 0, icon: "❄️", slug: "COOLING_HVAC" },
  { label: "Site Reliability", count: 0, icon: "🛡️", slug: "SITE_RELIABILITY" },
  { label: "Cloud Engineering", count: 0, icon: "☁️", slug: "CLOUD_ENGINEERING" },
];

const WHY_ITEMS = [
  {
    title: "Niche by design",
    body: "We only list jobs in data center construction, operations, and AI infrastructure. No noise — every posting is relevant.",
  },
  {
    title: "Industry-first taxonomy",
    body: "Filter by job category, facility type, clearance requirements, and shift — not just keywords.",
  },
  {
    title: "Built for ops people",
    body: "Fast, no-clutter, dark by default. Works on-site from a phone as well as it does at a desk.",
  },
  {
    title: "Direct employer connections",
    body: "Apply directly to hyperscalers, colos, and contractors. No recruiter spam, no mystery middlemen.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section
          style={{
            padding: "5rem 1.5rem 4rem",
            borderBottom: "1px solid #1E2128",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background grid */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(62,207,142,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(62,207,142,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
            }}
          />

          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.35rem 0.9rem",
                border: "1.5px solid rgba(62, 207, 142, 0.3)",
                borderRadius: "100px",
                marginBottom: "2rem",
                background: "rgba(62, 207, 142, 0.06)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#3ECF8E",
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "0.7rem",
                  color: "#3ECF8E",
                  letterSpacing: "0.06em",
                }}
              >
                THE INFRASTRUCTURE JOB BOARD
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#F1F5F9",
                marginBottom: "1.5rem",
              }}
            >
              Jobs for the people
              <br />
              <span style={{ color: "#3ECF8E" }}>powering AI.</span>
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "#64748B",
                maxWidth: "560px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.7,
              }}
            >
              CoreStack is the only job board built exclusively for data center
              construction, operations, and AI infrastructure professionals.
            </p>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/jobs" className="btn btn-primary" style={{ padding: "0.7rem 1.75rem", fontSize: "0.875rem" }}>
                Browse Jobs
              </Link>
              <Link href="/post-job" className="btn" style={{ padding: "0.7rem 1.75rem", fontSize: "0.875rem" }}>
                Post a Job →
              </Link>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: "3rem",
                justifyContent: "center",
                marginTop: "3.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { value: "—", label: "Open Roles" },
                { value: "—", label: "Companies" },
                { value: "Free", label: "To Apply" },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "#3ECF8E",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "0.7rem",
                      color: "#64748B",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginTop: "0.25rem",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
        </section>

        {/* ── Categories ── */}
        <section style={{ padding: "4rem 1.5rem", borderBottom: "1px solid #1E2128" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "2.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "0.7rem",
                  color: "#64748B",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Browse by Discipline
              </p>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "#F1F5F9",
                  letterSpacing: "-0.02em",
                }}
              >
                Every corner of the stack
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1rem",
              }}
            >
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/jobs?category=${cat.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <CategoryCard cat={cat} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why CoreStack ── */}
        <section style={{ padding: "4rem 1.5rem", borderBottom: "1px solid #1E2128" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "2.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "0.7rem",
                  color: "#64748B",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Why CoreStack
              </p>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "#F1F5F9",
                  letterSpacing: "-0.02em",
                }}
              >
                Not another generic job board
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1rem",
              }}
            >
              {WHY_ITEMS.map((item) => (
                <div key={item.title} className="card" style={{ padding: "1.5rem" }}>
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#F1F5F9",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#64748B",
                      lineHeight: 1.65,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── For Employers CTA ── */}
        <section style={{ padding: "4rem 1.5rem" }}>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <div
              className="card"
              style={{
                padding: "3rem",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <div>
                <span className="badge badge-accent" style={{ marginBottom: "1rem" }}>
                  For Employers
                </span>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#F1F5F9",
                    letterSpacing: "-0.02em",
                    marginBottom: "0.75rem",
                    marginTop: "0.75rem",
                  }}
                >
                  Hire infrastructure engineers who know the work
                </h2>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#64748B",
                    lineHeight: 1.65,
                    maxWidth: "480px",
                  }}
                >
                  Post to an audience that already understands PUE, DCIM, OCP,
                  and what it takes to keep a 100MW facility online. Plans from
                  $99/month.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: "160px" }}>
                <Link href="/post-job" className="btn btn-primary" style={{ justifyContent: "center" }}>
                  Post a Job
                </Link>
                <Link href="/pricing" className="btn" style={{ justifyContent: "center" }}>
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function CategoryCard({ cat }: { cat: (typeof CATEGORIES)[number] }) {
  return (
    <div
      className="card card-hover"
      style={{ padding: "1.25rem 1.5rem", cursor: "pointer" }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          marginBottom: "0.75rem",
          lineHeight: 1,
        }}
      >
        {cat.icon}
      </div>
      <div
        style={{
          fontFamily: "var(--font-family-mono)",
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#F1F5F9",
          marginBottom: "0.25rem",
        }}
      >
        {cat.label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-family-mono)",
          fontSize: "0.7rem",
          color: "#64748B",
        }}
      >
        {cat.count > 0 ? `${cat.count} open roles` : "Coming soon"}
      </div>
    </div>
  );
}
