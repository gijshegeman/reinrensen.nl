// app/api/arts/route.ts
import data from "./data.json";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    type ArtType = {
      id: number;
      volgorde: number;
      title: string;
      typeArt: string;
      src: string;
      y: number;
      x: number;
      price: string;
      sizeCM: string;
      dateMade: string;
      dateAdded: string;
      publish: boolean;
      subtitle?: string;
    };

    const artsData: ArtType[] = data.arts as ArtType[];

    // Filter the arts to get only the published ones
    const arts: ArtType[] = artsData.filter((art: ArtType) => art.publish);

    return NextResponse.json(arts, { status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read data file" });
  }
}
