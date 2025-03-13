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
) {
  const teamsPoints: Record<string, [number, number]> = {};

  TEAMS.forEach((team) => {
    teamsPoints[team] = [0, 0];
  });

  rows.forEach((row) => {
    const team1Id = row.get("team1Id") as string;
    const team2Id = row.get("team2Id") as string;
    const scoreTeam1 = row.get("scoreTeam1");
    const scoreTeam2 = row.get("scoreTeam2");

    if (!scoreTeam1 || !scoreTeam2) return;

    if (team1Id.includes("&")) {
      const [a, b] = team1Id.trim().split(" & ");
      const [x, y] = team2Id.trim().split(" & ");

      if (scoreTeam1 === scoreTeam2) {
        teamsPoints[a][0] += 0.5;
        teamsPoints[b][0] += 0.5;
        teamsPoints[x][0] += 0.5;
        teamsPoints[y][0] += 0.5;
      } else if (scoreTeam1 > scoreTeam2) {
        teamsPoints[a][0] += 1;
        teamsPoints[b][0] += 1;
        teamsPoints[x][1] += 1;
        teamsPoints[y][1] += 1;
      } else {
        teamsPoints[a][1] += 1;
        teamsPoints[b][1] += 1;
        teamsPoints[x][0] += 1;
        teamsPoints[y][0] += 1;
      }
    } else {
      if (scoreTeam1 === scoreTeam2) {
        teamsPoints[team1Id][0] += 0.5;
        teamsPoints[team2Id][0] += 0.5;
      } else if (scoreTeam1 > scoreTeam2) {
        teamsPoints[team1Id][0] += 1;
        teamsPoints[team2Id][1] += 1;
      } else {
        teamsPoints[team1Id][1] += 1;
        teamsPoints[team2Id][0] += 1;
      }
    }
  });

  const leaderboard = Object.entries(teamsPoints)
    .sort((a, b) => b[1][0] - a[1][0])
    .map(([teamId, points]) => {
      return {
        teamId,
        points,
      };
    });

  return leaderboard;
}
