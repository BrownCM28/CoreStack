import Link from "next/link";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1.5px solid #000000",
        background: "#0D0F12",
        padding: "3rem 1.5rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#F1F5F9",
                marginBottom: "0.75rem",
              }}
            >
              <span style={{ color: "#3ECF8E" }}>Core</span>Stack
            </div>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#64748B",
                lineHeight: 1.7,
                maxWidth: "280px",
              }}
            >
              The job board built for data center construction, operations, and
              AI infrastructure professionals.
            </p>
          </div>

          {/* For Job Seekers */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "#64748B",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Job Seekers
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
            >
              <FooterLink href="/jobs">Browse Jobs</FooterLink>
              <FooterLink href="/jobs?type=FULL_TIME">Full-Time</FooterLink>
              <FooterLink href="/jobs?type=CONTRACT">Contract</FooterLink>
              <FooterLink href="/jobs?remote=true">Remote Jobs</FooterLink>
            </div>
          </div>

          {/* For Employers */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "#64748B",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Employers
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
            >
              <FooterLink href="/post-job">Post a Job</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/dashboard">Dashboard</FooterLink>
              <FooterLink href="/companies">Company Profile</FooterLink>
            </div>
          </div>

          {/* Company */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "#64748B",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Company
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
            >
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #1E2128",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "0.7rem",
              color: "#64748B",
            }}
          >
            © {new Date().getFullYear()} CoreStack. Built for the infrastructure
            industry.
          </p>
          <p
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "0.7rem",
              color: "#64748B",
            }}
          >
            Powering the data centers that power the world.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
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
        fontSize: "0.8rem",
        color: "#64748B",
        transition: "color 0.15s ease",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#3ECF8E")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
    >
      {children}
    </Link>
  );
}
