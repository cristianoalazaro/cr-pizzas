import { hasEmail } from "@/services/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) return NextResponse.json({ exists: false });

  const emailsExists = await hasEmail(email);
  if (!emailsExists) return NextResponse.json({ exists: false });

  return NextResponse.json({ exists: true });
}
