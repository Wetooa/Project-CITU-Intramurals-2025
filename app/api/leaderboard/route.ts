import { GS } from "@/db/db";
import { getLeaderboard } from "@/lib/utils";
import { GAMES } from "@/types/constant";
import { Games, Leaderboard, MatchStatus } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();

    const leaderboard: Record<Games, Leaderboard[]> = {};
    GAMES.forEach((game) => {
      const filteredRows = rows.filter(
        (row) =>
          (!category ||
            category === "Overall" ||
            row.get("category") === category) &&
          (row.get("status") as MatchStatus) == "Completed",
      );
    });

    return NextResponse.json(
      { message: "Fetched leaderboard successfully!", leaderboard },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
