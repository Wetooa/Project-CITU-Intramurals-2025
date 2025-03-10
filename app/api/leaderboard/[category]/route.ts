import { GS } from "@/db/db";
import { getLeaderboard } from "@/lib/utils";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function GET(req: Request, props: Props) {
  try {
    const params = await props.params;
    const category = params.category;

    const data = await GS.getSheetData("schedule");
    const rows = await data.getRows();

    const filteredRows = rows.filter(
      (row) => row.get("categoryId") === category,
    );

    const leaderboard = getLeaderboard(filteredRows);

    return NextResponse.json(
      {
        message: `Fetched leaderboard for category ${category} successfully!`,
        leaderboard,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
