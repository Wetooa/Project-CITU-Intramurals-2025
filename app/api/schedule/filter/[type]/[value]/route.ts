import { GS } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { type: string; value: string } }
) {
  try {
    const { type, value } = context.params;
    const validFilters = ["team1Id", "team2Id", "team1Name", "team2Name", "matchDate", "category"];
    
    if (!validFilters.includes(type)) {
      return NextResponse.json({ message: "Invalid filter type" }, { status: 400 });
    }

    const data = await GS.getSheetData("schedule");
    const sheet = await data.getRows();
    console.log("Type: ", type);
    console.log("Value: ", value);
    const matches = sheet.filter((row) => row.get(type) == value);
    if (matches.length === 0) {
      return NextResponse.json({ message: "No matches found" }, { status: 404 });
    }

    // Sort by matchDate (latest to earliest)
    matches.sort((a, b) => new Date(b.get("matchDate")).getTime() - new Date(a.get("matchDate")).getTime());

    /*
    // Sort by matchDate (earliest to latest)
    matches.sort((a, b) => new Date(a.get("matchDate")).getTime() - new Date(b.get("matchDate")).getTime());
    */

    return NextResponse.json(
        matches.map((row) => ({
          id: row.get("id"),
          matchDate: row.get("matchDate"),
          team1Id: row.get("team1Id"),
          team1Name: row.get("team1Name"),
          team2Id: row.get("team2Id"),
          team2Name: row.get("team2Name"),
          category: row.get("category"),
          scoreTeam1: row.get("scoreTeam1"),
          scoreTeam2: row.get("scoreTeam2"),
          status: row.get("status"),
          createdOn: row.get("createdOn"),
          updatedOn: row.get("updatedOn"),
        }))
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
