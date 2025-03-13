import { TEAMS, SPORTS } from "@/types/constant";
import { Schedule, WinsLosses } from "@/types/types";
import { getDateToday } from "./utils";

export function getLeaderboard(rows: Schedule[]) {
  const teamsPoints: Record<string, WinsLosses> = {};

  TEAMS.forEach((team) => {
    teamsPoints[team] = { wins: 0, losses: 0 };
  });

  rows.forEach((row) => {
    const team1Id = row.team1Id!;
    const team2Id = row.team2Id!;
    const scoreTeam1 = row.scoreTeam1;
    const scoreTeam2 = row.scoreTeam2;
    const winner = row.winner;

    if (!scoreTeam1 || !scoreTeam2) return;

    if (team1Id.includes("&")) {
      const [a, b] = team1Id.trim().split(" & ");
      const [x, y] = team2Id.trim().split(" & ");

      if (winner === "draw") {
        teamsPoints[a].wins += 0.5;
        teamsPoints[b].wins += 0.5;
        teamsPoints[x].wins += 0.5;
        teamsPoints[y].wins += 0.5;
      } else if (winner === "team1") {
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

export function getBestMover(rows: Schedule[]) {
  const dateToday = getDateToday();

  const previousRows = rows.filter(
    (row) =>
      new Date(row.matchDate).getDate() < new Date(dateToday).getDate() &&
      row.status == "Completed",
  );
  const todaysRows = rows.filter(
    (row) => row.matchDate === dateToday && row.status == "Completed",
  );

  const previousLeaderboard = getLeaderboard(previousRows);
  const todaysLeaderboard = getLeaderboard(todaysRows);

  const previousRanking: Record<string, number> = {};
  const todaysRanking: Record<string, number> = {};

  previousLeaderboard.forEach((player, index) => {
    previousRanking[player.teamId] = dateToday === "2025-03-12" ? 8 : index + 1;
  });

  todaysLeaderboard.forEach((player, index) => {
    todaysRanking[player.teamId] = index + 1;
  });

  const rankDifference: Record<string, [number, number]> = {};

  TEAMS.forEach((team) => {
    rankDifference[team] = [previousRanking[team], todaysRanking[team]];
  });

  const bestMover = Object.entries(rankDifference).reduce((team, best) => {
    const [a, b] = team[1];
    const [x, y] = best[1];
    return b - a < y - x ? team : best;
  });
  return bestMover;
}

export function getBiggestWinner(rows: Schedule[]) {
  const dateToday = getDateToday();
  const todaysRows = rows.filter(
    (row) => row.matchDate === dateToday && row.status == "Completed",
  );
  const todaysLeaderboard = getLeaderboard(todaysRows);

  const biggestWinner = todaysLeaderboard[0];
  return biggestWinner;
}

export function getBiggestLoser(rows: Schedule[]) {
  const dateToday = getDateToday();
  const todaysRows = rows.filter(
    (row) => row.matchDate === dateToday && row.status == "Completed",
  );
  const todaysLeaderboard = getLeaderboard(todaysRows);

  const biggestLoser = todaysLeaderboard.sort(
    (a, b) => b.points.losses - a.points.losses,
  )[0];

  return biggestLoser;
}

export function getBestSports(rows: Schedule[]) {
  const sports = rows.filter((row) => SPORTS.includes(row.category));
  const leaderboard = getLeaderboard(sports);

  return leaderboard[0];
}

export function getBestESports(rows: Schedule[]) {
  const sports = rows.filter((row) => SPORTS.includes(row.category));
  const leaderboard = getLeaderboard(sports);

  return leaderboard[0];
}
