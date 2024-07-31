import data from "./data.json";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const arts = [
    ...new Set(
      [].concat(
        ...data.arts.filter((art) => art.publish == true).map((work) => work)
      )
    ),
  ];

  return NextResponse.json(arts, { status: 200 });
}
