import { GS } from "@/db/db";
import { AdminUser } from "@/types/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../[...nextauth]";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await GS.getSheetData("adminUser");
    const sheet = await data.getRows();

    const adminUsers: AdminUser[] = sheet.map((row) => {
      return {
        id: row.get("id"),
        username: row.get("username"),
        password: row.get("password"),
        createdOn: row.get("createdOn"),
        updatedOn: row.get("updatedOn"),
      };
    });

    return NextResponse.json(
      { message: "Fetched admin users successfully!", adminUsers },
      { status: 200 },
    );
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

    const reqData = (await req.json()) as AdminUser;

    const data = await GS.getSheetData("adminUser");
    await data.addRow(reqData);

    return NextResponse.json(
      { message: "Added new admin user successfully!", reqData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
