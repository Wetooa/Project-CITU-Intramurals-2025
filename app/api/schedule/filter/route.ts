import { GS } from "@/db/db";
import { getCleanedRows } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const team1Id = searchParams.get("team1Id") || "";
    const team2Id = searchParams.get("team2Id") || "";

    const matchDate = searchParams.get("matchDate") || "";

    const category = searchParams.get("category") || "";
    const venue = searchParams.get("venue") || "";
    const status = searchParams.get("status") || "";

    const round = searchParams.get("round") || "";
    const winner = searchParams.get("winner") || "";

    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const cleanedRows = getCleanedRows(rows);

    const matches = cleanedRows.filter((row) => {
      const teams = [row.team1Id, row.team2Id];

      const condition =
        (team1Id === "" || teams.includes(team1Id)) &&
        (team2Id === "" || teams.includes(team2Id)) &&
        (matchDate === "" || row.matchDate === matchDate) &&
        (category === "" || row.category === category) &&
        (venue === "" || row.venue === venue) &&
        (status === "" || row.status === status) &&
        (round === "" || row.round === round) &&
        (winner === "" || row.winner === winner);

      return condition;
    });

    matches.sort(
      (a, b) =>
        new Date(b.matchDate + " " + b.matchTime).getTime() -
        new Date(a.matchDate + " " + a.matchTime).getTime(),
    );

    return NextResponse.json({
      message: "Matches fetched successfully!",
      schedule: matches,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
