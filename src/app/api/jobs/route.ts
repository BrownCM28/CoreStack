import { NextRequest, NextResponse } from "next/server";
import { getMockJobs } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSlug(base: string): string {
  return `${base}-${Date.now().toString(36)}`;
}

export async function POST(req: NextRequest) {
  // Auth temporarily disabled
  const body = await req.json();
  const {
    title,
    category,
    type,
    location,
    experience,
    isRemote,
    salaryMin,
    salaryMax,
    description,
    requirements,
    companyId,
  } = body;

  // Basic validation
  if (!title || !category || !type || !location || !description || !companyId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const baseSlug = slugify(title);

  const job = await prisma.job.create({
    data: {
      title,
      slug: uniqueSlug(baseSlug),
      category,
      type,
      location,
      experience: experience || null,
      isRemote: isRemote === "true" || isRemote === true,
      salaryMin: salaryMin ? parseInt(salaryMin, 10) : null,
      salaryMax: salaryMax ? parseInt(salaryMax, 10) : null,
      description,
      requirements: requirements || null,
      companyId,
      active: true,
    },
  });

  return NextResponse.json(job, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const result = getMockJobs({
    category: searchParams.get("category") ?? undefined,
    type: searchParams.get("type") ?? undefined,
    remote: searchParams.get("remote") ?? undefined,
    q: searchParams.get("q") ?? undefined,
    page: searchParams.get("page") ?? undefined,
  });
  return NextResponse.json({ jobs: result.jobs, total: result.total, page: result.page, pages: result.totalPages });
}
