import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
  const filePath = path.resolve("public/data.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const rawData = JSON.parse(fileContent);

  const data = rawData.arts.filter((art: { publish: boolean }) => art.publish);

  return NextResponse.json(data);
}
