import { GS } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const filters = Object.fromEntries(searchParams);
    
    if (Object.keys(filters).length === 0) {
      return NextResponse.json({ message: "No filters provided" }, { status: 400 });
    }

    const validFilters = ["team1Id", "team2Id", "team1Name", "team2Name", "matchDate", "category"];
    
    for (const key in filters) {
      if (!validFilters.includes(key)) {
        return NextResponse.json({ message: `Invalid filter: ${key}` }, { status: 400 });
      }
    }

    const data = await GS.getSheetData("schedule");
    const sheet = await data.getRows();

    let matches = sheet.filter((row) => {
      return Object.entries(filters).some(([key, value]) => 
        row.get(key)?.toString().trim().toLowerCase() === value.trim().toLowerCase()
      );
    });

    // Sort by matchDate (latest to earliest)
    matches.sort((a, b) => new Date(b.get("matchDate")).getTime() - new Date(a.get("matchDate")).getTime());
    
    /*
    // Uncomment for sorting from earliest to latest
    matches.sort((a, b) => new Date(a.get("matchDate")).getTime() - new Date(b.get("matchDate")).getTime());
    */

    if (matches.length === 0) {
      return NextResponse.json({ message: "No matches found" }, { status: 404 });
    }

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
