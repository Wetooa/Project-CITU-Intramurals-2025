import { GS } from "@/db/db";
import { getLeaderboard } from "@/lib/utils";
import { MatchStatus } from "@/types/types";
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
    const filteredRows = rows.filter(
      (row) => (row.get("status") as MatchStatus) == "Completed",
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
