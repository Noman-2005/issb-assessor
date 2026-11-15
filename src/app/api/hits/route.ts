import { NextResponse } from "next/server";

const REDIS_URL =
  process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REDIS_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const KEY = "issb:total-hits";

// undefined = database not configured, otherwise the Redis result
async function redis(command: string[]): Promise<unknown> {
  if (!REDIS_URL || !REDIS_TOKEN) return undefined;

  try {
    const res = await fetch(REDIS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      cache: "no-store",
    });

    if (!res.ok) return undefined;
    const data = await res.json();
    return data.result ?? null;
  } catch {
    return undefined;
  }
}

// Read the total
export async function GET() {
  const value = await redis(["GET", KEY]);
  if (value === undefined) return NextResponse.json({ hits: null });
  return NextResponse.json({ hits: Number(value ?? 0) });
}

// Add one hit
export async function POST() {
  const value = await redis(["INCR", KEY]);
  if (value === undefined) return NextResponse.json({ hits: null });
  return NextResponse.json({ hits: Number(value) });
}