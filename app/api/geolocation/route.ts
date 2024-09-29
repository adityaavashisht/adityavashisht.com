import { geolocation } from "@vercel/functions";
import { NextResponse, NextRequest } from "next/server";

export function GET(NextRequest: NextRequest) {
  return NextResponse.json(geolocation(NextRequest));
}
