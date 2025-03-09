import { GS } from "@/db/db";
import { Schedule } from "@/types/types";
import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    const offset = (page - 1) * limit;

    const data = await GS.getSheetData("schedule");
    const sheet = await data.getRows();
    const total = sheet.length;

    // Sort by matchDate (latest to earliest)
    sheet.sort((a, b) => new Date(b.get("matchDate")).getTime() - new Date(a.get("matchDate")).getTime());
    
    
    // Sort by matchDate (earliest to latest)
    // sheet.sort((a, b) => new Date(a.get("matchDate")).getTime() - new Date(b.get("matchDate")).getTime());
    

    const schedule = sheet.slice(offset, offset + limit).map((row) => {
      return {
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
      };
    });

    return NextResponse.json({
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
