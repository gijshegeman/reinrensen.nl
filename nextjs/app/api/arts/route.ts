// app/api/arts/route.ts
import data from "./data.json";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const arts = [
      ...new Set(
        [].concat(
          ...data.arts.filter((art) => art.publish == true).map((work) => work)
        )
      ),
    ];
    return NextResponse.json(arts, { status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read data file" });
  }
}
