import { TEAMS } from "@/types/constant";
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

export function getLeaderboard(
  rows: GoogleSpreadsheetRow<Record<string, unknown>>[],
  byLosses: boolean = false,
) {
  const teamsPoints: Record<string, number> = {};

  TEAMS.forEach((team) => {
    teamsPoints[team] = 0;
  });

  rows.forEach((row) => {
    const team1Id = row.get("team1Id");
    const team2Id = row.get("team2Id");
    const scoreTeam1 = row.get("scoreTeam1");
    const scoreTeam2 = row.get("scoreTeam2");

    if (scoreTeam1 === null || scoreTeam2 === null) return;

    if (!byLosses) {
      if (scoreTeam1 === scoreTeam2) {
        teamsPoints[team1Id] += 0.5;
        teamsPoints[team2Id] += 0.5;
      } else if (scoreTeam1 > scoreTeam2) {
        teamsPoints[team1Id] += 1;
      } else {
        teamsPoints[team2Id] += 1;
      }
    } else {
      teamsPoints[team1Id] += 1;
    }
  });

  const leaderboard = Object.entries(teamsPoints)
    .sort((a, b) => b[1] - a[1])
    .map(([teamId, points]) => {
      return {
        teamId,
        points,
      };
    });

  return leaderboard;
}
