import { GS } from "@/db/db";
import { Schedule } from "@/types/types";
import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  try {
    const data = await GS.getSheetData("schedule");
    const sheet = await data.getRows();

    const schedule: Schedule[] = sheet.map((row) => {
      return {
        id: row.get("id"),
        matchDate: row.get("match_date"),
        team1Id: row.get("team1_id"),
        team2Id: row.get("team2_id"),
        category: row.get("category"),
        scoreTeam1: row.get("score_team1"),
        scoreTeam2: row.get("score_team2"),
        status: row.get("status"),
        createdOn: row.get("created_on"),
        updatedOn: row.get("updated_on"),
      };
    });
    return NextResponse.json({ schedule }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const reqData = (await req.json()) as Schedule;
    const data = await GS.getSheetData("schedule");

    const rowData: Record<string, any> = { ...reqData };
    Object.keys(rowData).forEach((key) => {
      if (rowData[key] === null) {
        rowData[key] = "";
      }
    });

    await data.addRow(rowData);

    return NextResponse.json({ message: "Schedule added successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const reqData = (await req.json()) as Schedule;
    const { id } = reqData;

    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const rowIndex = rows.findIndex((row) => row.get("id") === id);

    if (rowIndex === -1) {
      return NextResponse.json({ message: "Schedule not found" }, { status: 404 });
    }

    rows[rowIndex].assign(reqData);
    await rows[rowIndex].save();

    return NextResponse.json({ message: "Schedule updated successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const rowIndex = rows.findIndex((row) => row.get("id") === id);

    if (rowIndex === -1) {
      return NextResponse.json({ message: "Schedule not found" }, { status: 404 });
    }

    await rows[rowIndex].delete();

    return NextResponse.json({ message: "Schedule deleted successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
