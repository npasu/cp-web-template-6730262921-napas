import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "";

  const backendUrl = "http://127.0.0.1:3000";

  try {
    const res = await fetch(`${backendUrl}/greet?name=${encodeURIComponent(name)}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Backend request failed" },
        { status: res.status }
      );
    }

    const text = await res.text();
    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Backend fetch error:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend" },
      { status: 500 }
    );
  }
}