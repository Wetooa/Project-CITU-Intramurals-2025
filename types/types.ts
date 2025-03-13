import { GAMES, GENDER, TEAMS } from "./constant";

export const GoogleSheetsTitle = ["team", "schedule", "adminUser"] as const;
export type GoogleSheetsTitleType = (typeof GoogleSheetsTitle)[number];

export type Games = (typeof GAMES)[number];
export type TeamType = (typeof TEAMS)[number];
export type GenderType = (typeof GENDER)[number];

export type WinsLosses = {
  wins: number;
  losses: number;
};

export type MatchStatus = "Scheduled" | "Ongoing" | "Completed";

export type Winner = "team1" | "team2" | "draw";

export type Team = {
  id: TeamType;
  color: string;
  district: string;
};

export type Schedule = {
  id: string;
  team1Id?: string;
  team2Id?: string;

  matchDate: string;
  matchTime: string;

  category: Games;
  venue: string;

  round?: string;
  game: string;

  status: MatchStatus;
  winner?: Winner | null;

  scoreTeam1?: number | null;
  scoreTeam2?: number | null;

  createdOn: Date;
  updatedOn: Date;
};

export type AdminUser = {
  id: string;

  username: string;
  password: string;

  createdOn: Date;
  updatedOn: Date;
};

export type Leaderboard = {
  teamId: string;
  points: { wins: number; losses: number };
};

export type Bracket = {
  team1Id: TeamType;
  team2Id: TeamType;
  round: string;

  scoreTeam1?: number | null;
  scoreTeam2?: number | null;
  winner?: Winner | null;
};

export type Matches = {
  rounds: {
    roundId: string;
    seeds: {
      gameNo: number;
      team1Id: string;
      team2Id: string;
      winner: string;
      scoreTeam1: number;
      scoreTeam2: number;
    }[];
  }[];
};
