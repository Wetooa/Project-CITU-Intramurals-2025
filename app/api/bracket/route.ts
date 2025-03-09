import { auth } from "@/auth";
import { GS } from "@/db/db";
import { NextResponse } from "next/server";

// GET: Fetch all bracket details
export async function GET() {
  try {
    const data = await GS.getSheetData("bracket");
    const sheet = await data.getRows();

    const brackets = sheet.map((row) => {
      return {
        id: row.get("id"),
        round: row.get("round"),
        matchId: row.get("matchId"),
        winnerId: row.get("winnerId") || null,
        createdOn: row.get("createdOn"),
        updatedOn: row.get("updatedOn"),
      };
    });
    return NextResponse.json({ brackets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// POST: Create or update tournament bracket
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const reqData = await req.json();
    const { id, round, matchId, winnerId } = reqData;

    const data = await GS.getSheetData("bracket");
    const rows = await data.getRows();
    const rowIndex = rows.findIndex((row) => row.get("id") === id);

    if (rowIndex !== -1) {
      // Update existing bracket
      rows[rowIndex].assign({ round, matchId, winnerId: winnerId || "" });
      await rows[rowIndex].save();
      return NextResponse.json({ message: "Bracket updated successfully!" });
    } else {
      // Add new bracket entry
      await data.addRow({
        id,
        round,
        matchId,
        winnerId: winnerId || "",
        createdOn: new Date().toISOString(),
        updatedOn: new Date().toISOString(),
      });
      return NextResponse.json({ message: "Bracket added successfully!" });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
