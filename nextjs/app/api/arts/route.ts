// app/api/arts/route.ts
import data from "./data.json";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Ensure proper type definition if needed
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
}
