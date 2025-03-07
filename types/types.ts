export type Department = {
  id: string;
  name: string;
  createdOn: Date;
  updatedOn: Date;
};

export type Player = {
  id: string;
  name: string;
  departmentId: string;
  points: number;
  assists: number;
  rebounds: number;
  createdOn: Date;
  updatedOn: Date;
};

export type Leaderboard = {
  id: string;
  departmentId: string;
  category: string; // Basketball, Volleyball, Chess, etc.
  wins: number;
  losses: number;
  draws: number;
  points: number;
  createdOn: Date;
  updatedOn: Date;
};

export type MatchStatus = "Scheduled" | "Ongoing" | "Completed";

export type Schedule = {
  id: string;
  matchDate: Date;
  team1Id: string;
  team2Id: string;
  category: string;
  scoreTeam1?: number | null;
  scoreTeam2?: number | null;
  status: MatchStatus;
  createdOn: Date;
  updatedOn: Date;
};

export type Bracket = {
  id: string;
  round: number;
  matchId: string;
  winnerId?: string | null;
  createdOn: Date;
  updatedOn: Date;
};

export type AdminUser = {
  id: string;
  username: string;
  passwordHash: string;
  createdOn: Date;
  updatedOn: Date;
};
export const GoogleSheetsTitle = ["leaderboard", "player"] as const;
export type GoogleSheetsTitleType = (typeof GoogleSheetsTitle)[number];

export type Tables =
  | Leaderboard
  | Player
  | Department
  | Schedule
  | Bracket
  | AdminUser;
