import { GS } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await GS.getSheetData("schedule");
    const sheet = await data.getRows();

    const match = sheet.find((row) => row.get("id") === id);
    if (!match) {
      return NextResponse.json({ message: "Match not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: match.get("id"),
      matchDate: match.get("match_date"),
      team1Id: match.get("team1_id"),
      team2Id: match.get("team2_id"),
      category: match.get("category"),
      scoreTeam1: match.get("score_team1"),
      scoreTeam2: match.get("score_team2"),
      status: match.get("status"),
      createdOn: match.get("created_on"),
      updatedOn: match.get("updated_on"),
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
