import { GS } from "@/db/db";
import { Leaderboard } from "@/types/types";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  try {
    const data = await GS.getSheetData("leaderboard");
    const sheet = await data.getRows();

    const leaderboard: Leaderboard[] = sheet.map((row) => {
      return {
        id: row.get("id"),
        departmentId: row.get("departmentId"),
        category: row.get("category"),
        wins: row.get("wins"),
        losses: row.get("losses"),
        draws: row.get("draws"),
        points: row.get("points"),
        createdOn: row.get("createdOn"),
        updatedOn: row.get("updatedOn"),
      };
    });
    return NextResponse.json(
      { message: "Fetched leaderboard successfully!", leaderboard },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const reqData = (await req.json()) as Leaderboard;
    const { id } = reqData;

    const data = await GS.getSheetData("leaderboard");
    const rows = await data.getRows();
    const rowIndex = rows.findIndex((row) => row.get("id") === id);

    rows[rowIndex].assign(reqData);
    await rows[rowIndex].save();

    return NextResponse.json({
      message: "Row updated successfully!",
      updatedRow: reqData,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
