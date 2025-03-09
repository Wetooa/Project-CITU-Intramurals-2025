import { auth } from "@/auth";
import { GS } from "@/db/db";
import { AdminUser } from "@/types/types";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(req: Request, props: Props) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const params = await props.params;
    const id = params.id;

    const reqData = (await req.json()) as AdminUser;
    const data = await GS.getSheetData("adminUser");
    const rows = await data.getRows();
    const rowIndex = rows.findIndex((row) => row.get("id") === id);

    await rows[rowIndex].delete();

    return NextResponse.json(
      { message: "Added new admin user successfully!", reqData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
