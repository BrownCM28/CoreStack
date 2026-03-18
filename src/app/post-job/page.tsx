import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PostJobForm } from "@/components/jobs/post-job-form";

export const metadata = {
  title: "Post a Job",
  description: "Reach data center and AI infrastructure professionals on CoreStack.",
};

export default function PostJobPage() {
  return (
    <>
      <Navbar />
      <main>
        <div
          style={{
            borderBottom: "1px solid #1E2128",
            padding: "2.5rem 1.5rem 2rem",
          }}
        >
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              Post a Job
            </h1>
            <p style={{ fontSize: "0.875rem", color: "#64748B" }}>
              Reach the most qualified data center and AI infrastructure professionals.
            </p>
          </div>
        </div>

        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            padding: "2.5rem 1.5rem",
          }}
        >
          <PostJobForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
