import { GS } from "@/db/db";
import { Category } from "@/types/types";
import { NextResponse } from "next/server";

// GET: Fetchees all team details
export async function GET() {
  try {
    const data = await GS.getSheetData("category");
    const rows = await data.getRows();
    const category = rows.map((row) => {
      return {
        id: row.get("id"),
        venue: row.get("venue"),
      } as Category;
    });

    return NextResponse.json(
      { message: "Fetched category successfully!", teams: category },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
