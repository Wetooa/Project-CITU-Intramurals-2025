import { GS } from "@/db/db";
import {
  getBestESports,
  getBestMover,
  getBestSports,
  getBiggestLoser,
  getBiggestWinner,
} from "@/lib/leaderboard";
import { getCleanedRows } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const cleanedData = getCleanedRows(rows);

    return NextResponse.json(
      {
        message: "Fetched leaderboard highlights successfully!",
        bestMover: getBestMover(cleanedData),
        biggestWinner: getBiggestWinner(cleanedData),
        biggestLoser: getBiggestLoser(cleanedData),
        bestSports: getBestSports(cleanedData),
        getBestESports: getBestESports(cleanedData),
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
