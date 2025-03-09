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
      matchDate: match.get("matchDate"),
      team1Id: match.get("team1Id"),
      team1Name: match.get("team1Name"),
      team2Id: match.get("team2Id"),
      team2Name: match.get("team2Name"),
      category: match.get("category"),
      scoreTeam1: match.get("scoreTeam1"),
      scoreTeam2: match.get("scoreTeam2"),
      status: match.get("status"),
      createdOn: match.get("createdOn"),
      updatedOn: match.get("updatedOn"),
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
