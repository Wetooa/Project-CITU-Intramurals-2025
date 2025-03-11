import { GS } from "@/db/db";
import { Schedule } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const team1Id = searchParams.get("team1Id") || "";
    const team2Id = searchParams.get("team2Id") || "";
    const matchDate = searchParams.get("matchDate") || "";
    const category = searchParams.get("category") || "";
    const venue = searchParams.get("veneu") || "";
    const status = searchParams.get("status") || "";

    const data = await GS.getSheetData("schedule");
    const sheet = await data.getRows();

    const matches = sheet.filter((row) => {
      const teams = [row.get("team1Id"), row.get("team2Id")];

      return (
        (team1Id === "" || teams.includes(team1Id)) &&
        (team2Id === "" || teams.includes(team2Id)) &&
        (team2Id === "" ||
          team1Id === "" ||
          (teams.includes(team1Id) && teams.includes(team2Id))) &&
        (matchDate === "" || row.get("matchDate") === matchDate) &&
        (category === "" || row.get("category") === category) &&
        (venue === "" || row.get("venue") === venue) &&
        (status === "" || row.get("status") === status)
      );
    });

    if (matches.length === 0) {
      return NextResponse.json(
        { message: "No matches found" },
        { status: 404 },
      );
    }

    // Sort by matchDate (latest to earliest)
    matches.sort(
      (a, b) =>
        new Date(b.get("matchDate")).getTime() -
        new Date(a.get("matchDate")).getTime(),
    );

    const returnMatches: Schedule[] = matches.map((row) => {
      return {
        id: row.get("id"),
        team1Id: row.get("team1Id"),
        team2Id: row.get("team2Id"),

        matchDate: new Date(row.get("matchDate")),
        category: row.get("category"),
        venue: row.get("venue"),
        round: row.get("round"),

        status: row.get("status"),
        winner: row.get("winner"),

        scoreTeam1: row.get("scoreTeam1"),
        scoreTeam2: row.get("scoreTeam2"),
        createdOn: new Date(row.get("createdOn")),
        updatedOn: new Date(row.get("updatedOn")),
      };
    });

    return NextResponse.json({
      message: "Matches fetched successfully!",
      matches: returnMatches,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
