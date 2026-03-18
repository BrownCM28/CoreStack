import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
  // Verify auth
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "EMPLOYER" && session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Only employers can post jobs" },
      { status: 403 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { company: true },
  });

  if (!user?.company) {
    return NextResponse.json(
      { error: "Please create a company profile first" },
      { status: 400 },
    );
  }

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
  } = body;

  // Basic validation
  if (!title || !category || !type || !location || !description) {
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
      companyId: user.company.id,
      active: true,
    },
  });

  return NextResponse.json(job, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const remote = searchParams.get("remote");
  const q = searchParams.get("q");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20", 10));

  const where = {
    active: true,
    ...(category && { category: category as never }),
    ...(type && { type: type as never }),
    ...(remote === "true" && { isRemote: true }),
    ...(q && {
      OR: [
        { title: { contains: q, mode: "insensitive" as const } },
        { description: { contains: q, mode: "insensitive" as const } },
      ],
    }),
  };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      include: { company: { select: { name: true, slug: true, logo: true } } },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: limit,
      skip: (page - 1) * limit,
    }),
    prisma.job.count({ where }),
  ]);

  return NextResponse.json({ jobs, total, page, pages: Math.ceil(total / limit) });
}
