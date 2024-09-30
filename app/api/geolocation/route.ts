import { geolocation } from "@vercel/functions";
import { NextResponse, NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const geo = geolocation(request);
  return NextResponse.json({
    ...geo,
    city: decodeURIComponent(geo.city || ""),
  });
}
