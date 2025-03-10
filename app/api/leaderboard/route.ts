import { GS } from "@/db/db";
import { ALL_TEAMS } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";

    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const filteredRows = category
      ? rows.filter((row) => row.get("category") === category)
      : rows;

    const teamsPoints: Record<string, number> = {};

    ALL_TEAMS.forEach((team) => {
      teamsPoints[team] = 0;
    });

    console.log("Category:", category, filteredRows);

    filteredRows.forEach((row) => {
      const team1Id = row.get("team1Id");
      const team2Id = row.get("team2Id");
      const scoreTeam1 = row.get("scoreTeam1");
      const scoreTeam2 = row.get("scoreTeam2");

      if (scoreTeam1 === null || scoreTeam2 === null) return;

      if (scoreTeam1 === scoreTeam2) {
        teamsPoints[team1Id] += 0.5;
        teamsPoints[team2Id] += 0.5;
      } else if (scoreTeam1 > scoreTeam2) {
        teamsPoints[team1Id] += 1;
      } else {
        teamsPoints[team2Id] += 1;
      }
    });

    const leaderboard = Object.entries(teamsPoints).sort((a, b) => b[1] - a[1]);

    return NextResponse.json(
      { message: "Fetched leaderboard successfully!", leaderboard },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
