import { GS } from "@/db/db";
import { getDateToday, getLeaderboard } from "@/lib/utils";
import { TEAMS } from "@/types/constant";
import { MatchStatus } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dateToday = getDateToday();

    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();

    const previousRows = rows.filter(
      (row) =>
        new Date(row.get("matchDate")).getDate() <
          new Date(dateToday).getDate() &&
        (row.get("status") as MatchStatus) == "Completed",
    );
    const todaysRows = rows.filter(
      (row) =>
        row.get("matchDate") === dateToday &&
        (row.get("status") as MatchStatus) == "Completed",
    );

    const previousLeaderboard = getLeaderboard(previousRows);
    const todaysLeaderboard = getLeaderboard(todaysRows);

    const todaysLeaderboardByLoser = getLeaderboard(todaysRows, true);

    const previousRanking: Record<string, number> = {};
    const todaysRanking: Record<string, number> = {};

    previousLeaderboard.forEach((player, index) => {
      previousRanking[player.teamId] =
        dateToday === "2025-03-12" ? 8 : index + 1;
    });

    todaysLeaderboard.forEach((player, index) => {
      todaysRanking[player.teamId] = index + 1;
    });

    const rankDifference: Record<string, [number, number]> = {};

    TEAMS.forEach((team) => {
      rankDifference[team] = [previousRanking[team], todaysRanking[team]];
    });

    const bestMover = Object.entries(rankDifference).reduce((team, best) => {
      const [a, b] = team[1];
      const [x, y] = best[1];
      return b - a < y - x ? team : best;
    });

    const biggestWinner = todaysLeaderboard[0];
    const biggestLoser = todaysLeaderboardByLoser[0];

    return NextResponse.json(
      {
        message: "Fetched leaderboard highlights successfully!",
        bestMover: bestMover,
        biggestWinner: biggestWinner,
        biggestLoser: biggestLoser,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
