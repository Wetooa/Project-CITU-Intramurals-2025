import { GS } from "@/db/db";
import { getLeaderboard } from "@/lib/utils";
import { GAMES } from "@/types/constant";
import { Leaderboard, MatchStatus } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();

    const leaderboard: Record<string, Leaderboard[]> = {};

    GAMES.forEach((game) => {
      const filteredRows = rows.filter(
        (row) =>
          (!game || row.get("category") === game) &&
          (row.get("status") as MatchStatus) == "Completed",
      );
      leaderboard[game as string] = getLeaderboard(filteredRows);
    });

    leaderboard["Overall"] = getLeaderboard(rows);

    return NextResponse.json(
      { message: "Fetched leaderboard successfully!", leaderboard },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
