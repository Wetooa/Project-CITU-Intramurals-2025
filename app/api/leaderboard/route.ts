import { GS } from "@/db/db";
import { getLeaderboard } from "@/lib/leaderboard";
import { getCleanedRows } from "@/lib/utils";
import { GAMES } from "@/types/constant";
import { Leaderboard } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const cleanedRows = getCleanedRows(rows);
    const leaderboard: Record<string, Leaderboard[]> = {};

    GAMES.forEach((game) => {
      const filteredRows = cleanedRows.filter(
        (row) => (!game || row.category === game) && row.status === "Completed",
      );

      leaderboard[game as string] = getLeaderboard(filteredRows);
    });

    const allCompleted = cleanedRows.filter(
      (row) => row.status === "Completed",
    );
    leaderboard["Overall"] = getLeaderboard(allCompleted);

    return NextResponse.json(
      { message: "Fetched leaderboard successfully!", leaderboard },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
