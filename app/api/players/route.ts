import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: "Useless route..." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
