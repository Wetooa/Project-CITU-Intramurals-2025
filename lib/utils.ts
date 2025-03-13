import { TEAMS } from "@/types/constant";
import { WinsLosses } from "@/types/types";
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
  const teamsPoints: Record<string, WinsLosses> = {};

  TEAMS.forEach((team) => {
    teamsPoints[team] = { wins: 0, losses: 0 };
  });

  rows.forEach((row) => {
    const team1Id = row.get("team1Id") as string;
    const team2Id = row.get("team2Id") as string;
    const scoreTeam1 = row.get("scoreTeam1");
    const scoreTeam2 = row.get("scoreTeam2");
    const winner = row.get("winner");

    if (!scoreTeam1 || !scoreTeam2) return;

    if (team1Id.includes("&")) {
      const [a, b] = team1Id.trim().split(" & ");
      const [x, y] = team2Id.trim().split(" & ");

      if (winner === "draw") {
        teamsPoints[a].wins += 0.5;
        teamsPoints[b].wins += 0.5;
        teamsPoints[x].wins += 0.5;
        teamsPoints[y].wins += 0.5;
      } else if (winner == "team1") {
        teamsPoints[a].wins += 1;
        teamsPoints[b].wins += 1;
        teamsPoints[x].losses += 1;
        teamsPoints[y].losses += 1;
      } else {
        teamsPoints[a].losses += 1;
        teamsPoints[b].losses += 1;
        teamsPoints[x].wins += 1;
        teamsPoints[y].wins += 1;
      }
    } else {
      if (winner === "draw") {
        teamsPoints[team1Id].wins += 0.5;
        teamsPoints[team2Id].wins += 0.5;
      } else if (winner === "team1") {
        teamsPoints[team1Id].wins += 1;
        teamsPoints[team2Id].losses += 1;
      } else {
        teamsPoints[team1Id].losses += 1;
        teamsPoints[team2Id].wins += 1;
      }
    }
  });

  const leaderboard = Object.entries(teamsPoints)
    .sort((a, b) => b[1].wins - a[1].wins)
    .map(([teamId, points]) => {
      return {
        teamId,
        points,
      };
    });

  return leaderboard;
}
