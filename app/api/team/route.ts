import { GS } from "@/db/db";
import { Team } from "@/types/types";
import { NextResponse } from "next/server";

// GET: Fetches all team details
export async function GET() {
  try {
    const data = await GS.getSheetData("team");
    const rows = await data.getRows();
    const teams = rows.map((row) => {
      return {
        id: row.get("id"),
        color: row.get("color"),
        district: row.get("district"),
      } as Team;
    });

    return NextResponse.json(
      { message: "Fetched teams successfully!", teams },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
