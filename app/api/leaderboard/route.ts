import { GS } from "@/db/db";
import { getLeaderboard } from "@/lib/utils";
import { MatchStatus } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";

    if (!category) {
      return NextResponse.json(
        { error: "Missing category field" },
        { status: 500 },
      );
    }

    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const filteredRows = rows.filter(
      (row) =>
        row.get("category") === category &&
        (row.get("status") as MatchStatus) == "Completed",
    );

    const leaderboard = getLeaderboard(filteredRows);

    return NextResponse.json(
      { message: "Fetched leaderboard successfully!", leaderboard },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
