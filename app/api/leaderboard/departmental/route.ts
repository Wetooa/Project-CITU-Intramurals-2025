import { GS } from "@/db/db";
import { getLeaderboard } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const leaderboard = getLeaderboard(rows);

    return NextResponse.json(
      { message: "Fetched leaderboard successfully!", leaderboard },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
