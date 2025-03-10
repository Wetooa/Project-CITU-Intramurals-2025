import { ALL_TEAMS } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLeaderboard(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: GoogleSpreadsheetRow<Record<string, any>>[],
) {
  const teamsPoints: Record<string, number> = {};

  ALL_TEAMS.forEach((team) => {
    teamsPoints[team] = 0;
  });

  rows.forEach((row) => {
    const team1Id = row.get("team1Id");
    const team2Id = row.get("team2Id");
    const scoreTeam1 = row.get("scoreTeam1");
    const scoreTeam2 = row.get("scoreTeam2");

    if (scoreTeam1 === null || scoreTeam2 === null) return;

    if (scoreTeam1 === scoreTeam2) {
      teamsPoints[team1Id] += 0.5;
      teamsPoints[team2Id] += 0.5;
    } else if (scoreTeam1 > scoreTeam2) {
      teamsPoints[team1Id] += 1;
    } else {
      teamsPoints[team2Id] += 1;
    }
  });

  const leaderboard = Object.entries(teamsPoints).sort((a, b) => b[1] - a[1]);
  return leaderboard;
}
