import { geolocation } from "@vercel/functions";
import { NextResponse, NextRequest } from "next/server";

export function GET(NextRequest: NextRequest) {
  const { city } = geolocation(NextRequest);
  return NextResponse.json({
    city: city,
  });
}
