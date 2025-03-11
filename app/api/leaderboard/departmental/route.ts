import { GS } from "@/db/db";
import { getLeaderboard } from "@/lib/utils";
import { MatchStatus } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const filteredRows = rows.filter(
      (row) => (row.get("status") as MatchStatus) == "Completed",
    );
    const leaderboard = getLeaderboard(filteredRows);

    return NextResponse.json(
      { message: "Fetched leaderboard successfully!", leaderboard },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
