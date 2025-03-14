import { GS } from "@/db/db";
import { getCleanedRows } from "@/lib/utils";
import { Schedule } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // const { searchParams } = new URL(req.url);
    // const page = parseInt(searchParams.get("page") || "1", 10);
    // const limit = parseInt(searchParams.get("limit") || "10", 10);
    // const offset = (page - 1) * limit;

    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const cleanedRows = getCleanedRows(rows);

    // Sort by matchDate (latest to earliest)
    cleanedRows.sort(
      (a, b) =>
        new Date(b.matchDate + " " + b.matchTime).getTime() -
        new Date(a.matchDate + " " + a.matchTime).getTime(),
    );

    // Sort by matchDate (earliest to latest)
    // sheet.sort((a, b) => new Date(a.get("matchDate")).getTime() - new Date(b.get("matchDate")).getTime());

    return NextResponse.json({
      message: "Schedule fetched successfully!",
      cleanedRows,
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
