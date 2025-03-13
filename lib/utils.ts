import { Schedule } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateToday() {
  const date = new Date();
  date.setUTCHours(date.getUTCHours() + 8);
  return date.toISOString().split("T")[0];
}

export function getCleanedRows(
  rows: GoogleSpreadsheetRow<Record<string, unknown>>[],
) {
  const cleanedData: Schedule[] = rows.map((row) => {
    return {
      id: row.get("id"),
      team1Id: row.get("team1Id"),
      team2Id: row.get("team2Id"),
      matchDate: row.get("matchDate"),
      matchTime: row.get("matchTime"),
      category: row.get("category"),
      venue: row.get("venue"),
      round: row.get("round"),
      game: row.get("game"),
      status: row.get("status"),
      winner: row.get("winner"),
      scoreTeam1: row.get("scoreTeam1"),
      scoreTeam2: row.get("scoreTeam2"),
      createdOn: new Date(row.get("createdOn")),
      updatedOn: new Date(row.get("updatedOn")),
    };
  });

  return cleanedData;
}
