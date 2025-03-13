import { GS } from "@/db/db";
import {
  getBestESports,
  getBestMover,
  getBestSports,
  getBiggestWinner,
} from "@/lib/utils";
import { Schedule } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();

    const cleanedData: Schedule[] = rows.map((row) => {
      return {
        id: row.get("id"),
        team1Id: row.get("team1Id"),
        team2Id: row.get("team2Id"),
        matchDate: row.get("matchDate"),
        matchTime: row.get("matchTime"),
        category: row.get("category"),
        venue: row.get("venue"),
        round: row.get("round"),
        game: row.get("game"),
        status: row.get("status"),
        winner: row.get("winner"),
        scoreTeam1: row.get("scoreTeam1"),
        scoreTeam2: row.get("scoreTeam2"),
        createdOn: new Date(row.get("createdOn")),
        updatedOn: new Date(row.get("updatedOn")),
      };
    });

    return NextResponse.json(
      {
        message: "Fetched leaderboard highlights successfully!",
        bestMover: getBestMover(cleanedData),
        biggestWinner: getBiggestWinner(cleanedData),
        biggestLoser: getBiggestWinner(cleanedData),
        bestSports: getBestSports(cleanedData),
        getBestESports: getBestESports(cleanedData),
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
