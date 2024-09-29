import { geolocation } from "@vercel/functions";
import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export function GET(request: NextRequest) {
  const geo = geolocation(request);
  const headerList = headers();
  return NextResponse.json({
    ...geo,
    city: decodeURIComponent(geo.city || ""),
    headers: headerList,
  });
}
