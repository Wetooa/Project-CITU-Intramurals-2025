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
      console.log(game, filteredRows.length);
      leaderboard[game as string] = getLeaderboard(filteredRows);
    });

    console.log(leaderboard);

    const allCompleted = rows.filter(
      (row) => (row.get("status") as MatchStatus) == "Completed",
    );
    console.log(allCompleted);
    console.log(leaderboard["Overall"]);
    leaderboard["Overall"] = getLeaderboard(allCompleted);

    return NextResponse.json(
      { message: "Fetched leaderboard successfully!", leaderboard },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
