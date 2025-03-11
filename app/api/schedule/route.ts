import { GS } from "@/db/db";
import { Schedule } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    const data = await GS.getSheetData("schedule");
    const sheet = await data.getRows();
    const total = sheet.length;

    // Sort by matchDate (latest to earliest)
    sheet.sort(
      (a, b) =>
        new Date(b.get("matchDate")).getTime() -
        new Date(a.get("matchDate")).getTime(),
    );

    // Sort by matchDate (earliest to latest)
    // sheet.sort((a, b) => new Date(a.get("matchDate")).getTime() - new Date(b.get("matchDate")).getTime());

    const schedule: Schedule[] = sheet
      .slice(offset, offset + limit)
      .map((row) => {
        return {
          id: row.get("id"),
          team1Id: row.get("team1Id"),
          team2Id: row.get("team2Id"),

          matchDate: row.get("matchDate"),
          matchTime: row.get("matchTime"),

          category: row.get("category"),
          venue: row.get("venue"),
          round: row.get("round"),
          game: row.get("game"),

          status: row.get("status"),
          winner: row.get("winner"),

          scoreTeam1: row.get("scoreTeam1"),
          scoreTeam2: row.get("scoreTeam2"),

          createdOn: new Date(row.get("createdOn")),
          updatedOn: new Date(row.get("updatedOn")),
        };
      });

    return NextResponse.json({
      message: "Schedule fetched successfully!",
      schedule,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const reqData = (await req.json()) as Schedule;
    const data = await GS.getSheetData("schedule");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rowData: Record<string, any> = reqData;

    Object.keys(rowData).forEach((key) => {
      if (rowData[key] === null) {
        rowData[key] = "";
      }
    });

    await data.addRow(rowData);

    return NextResponse.json(
      { message: "Schedule added successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
