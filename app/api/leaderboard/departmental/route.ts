import { GS } from "@/db/db";
import { NextResponse } from "next/server";

import { getLeaderboard } from "@/lib/leaderboard";
import { getCleanedRows } from "@/lib/utils";

export async function GET() {
  try {
    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const cleanedData = getCleanedRows(rows);
    const filteredRows = cleanedData.filter((row) => row.status == "Completed");
    const leaderboard = getLeaderboard(filteredRows);

    return NextResponse.json(
      { message: "Fetched leaderboard successfully!", leaderboard },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
