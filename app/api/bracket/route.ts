import { GS } from "@/db/db";
import { Bracket } from "@/types/types";
import { NextResponse } from "next/server";

// GET: Fetch all bracket details
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    if (category === null) {
      throw new Error("Category is required!");
    }

    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const filteredRows = rows.filter((row) => row.get("category") === category);

    const brackets: Bracket[] = filteredRows.map((row) => {
      return {
        team1Id: row.get("team1Id"),
        team2Id: row.get("team2Id"),
        round: row.get("round"),

        scoreTeam1: row.get("scoreTeam1"),
        scoreTeam2: row.get("scoreTeam2"),
        winnerId: row.get("winnerId"),
      };
    });

    return NextResponse.json({ brackets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
