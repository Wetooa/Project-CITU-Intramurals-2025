import { GS } from "@/db/db";
import { GAMES } from "@/types/constant";
import { Matches } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();

    const matches: Record<string, Matches> = {};

    GAMES.forEach((game) => {
      const filteredRows = rows.filter((row) => row.get("category") === game);

      const brackets = {
        rounds: [],
      } as Matches;

      filteredRows.forEach((row) => {
        const team1Id = row.get("team1Id");
        const team2Id = row.get("team2Id");
        const round = row.get("round");
        const game = row.get("game");
        const scoreTeam1 = row.get("scoreTeam1");
        const scoreTeam2 = row.get("scoreTeam2");
        const winnerId = row.get("winnerId");

        const roundInt = parseInt(round) - 1;

        if (!brackets.rounds[roundInt]) {
          brackets.rounds[roundInt] = {
            roundId: round,
            seeds: [],
          };
        }

        brackets.rounds[roundInt].seeds.push({
          gameNo: game,
          team1Id: team1Id,
          team2Id: team2Id,
          scoreTeam1: scoreTeam1,
          scoreTeam2: scoreTeam2,
          winner: winnerId,
        });
      });

      matches[game] = brackets;
    });

    return NextResponse.json({ matches }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
