// Auth temporarily disabled
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ error: "Auth coming soon" }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ error: "Auth coming soon" }, { status: 501 });
}
