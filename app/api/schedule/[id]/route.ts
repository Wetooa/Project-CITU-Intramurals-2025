import { GS } from "@/db/db";
import { Schedule } from "@/types/types";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_: Request, props: Props) {
  try {
    const params = await props.params;
    const id = params.id;

    const data = await GS.getSheetData("schedule");
    const sheet = await data.getRows();

    const match = sheet.find((row) => row.get("id") === id);

    if (!match) {
      return NextResponse.json({ message: "Match not found" }, { status: 404 });
    }

    const cleanedMatch: Schedule = {
      id: match.get("id"),
      team1Id: match.get("team1Id"),
      team2Id: match.get("team2Id"),

      matchDate: match.get("matchDate"),
      matchTime: match.get("matchTime"),

      category: match.get("category"),
      venue: match.get("venue"),
      round: match.get("round"),
      game: match.get("game"),

      status: match.get("status"),

      scoreTeam1: match.get("scoreTeam1"),
      scoreTeam2: match.get("scoreTeam2"),

      createdOn: new Date(match.get("createdOn")),
      updatedOn: new Date(match.get("updatedOn")),
    };

    return NextResponse.json({
      message: "Match fetched sccessfully!",
      match: cleanedMatch,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req: Request, props: Props) {
  try {
    const params = await props.params;
    const id = params.id;
    const reqData = (await req.json()) as Schedule;

    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const rowIndex = rows.findIndex((row) => row.get("id") === id);

    if (rowIndex === -1) {
      return NextResponse.json(
        { message: "Schedule not found" },
        { status: 404 },
      );
    }

    rows[rowIndex].assign(reqData);
    await rows[rowIndex].save();

    return NextResponse.json(
      { message: "Schedule updated successfully!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(_: Request, props: Props) {
  try {
    const params = await props.params;
    const id = params.id;

    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const rowIndex = rows.findIndex((row) => row.get("id") === id);

    if (rowIndex === -1) {
      return NextResponse.json(
        { message: "Schedule not found" },
        { status: 404 },
      );
    }

    await rows[rowIndex].delete();

    return NextResponse.json(
      { message: "Schedule deleted successfully!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
