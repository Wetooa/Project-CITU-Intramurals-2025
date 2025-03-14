import { GS } from "@/db/db";
import { getLeaderboard } from "@/lib/leaderboard";
import { getCleanedRows } from "@/lib/utils";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{
    int: string;
  }>;
};

export async function GET(_: Request, props: Props) {
  try {
    const params = await props.params;
    const int = parseInt(params.int || "1");

    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();
    const cleanedData = getCleanedRows(rows);
    const filteredRows = cleanedData.filter(
      (row) => row.status === "Completed",
    );

    const leaderboard = getLeaderboard(filteredRows)[int];
    return NextResponse.json(
      { message: "Fetched leaderboard successfully!", leaderboard },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
