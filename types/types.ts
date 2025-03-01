export interface Department {
  id: number;
  name: string;
  createdOn: Date;
  updatedOn: Date;
}

export interface Player {
  id: number;
  name: string;
  departmentId: number;
  points: number;
  assists: number;
  rebounds: number;
  createdOn: Date;
  updatedOn: Date;
}

export interface Leaderboard {
  id: number;
  departmentId: number;
  category: string; // Basketball, Volleyball, Chess, etc.
  wins: number;
  losses: number;
  draws: number;
  points: number;
  createdOn: Date;
  updatedOn: Date;
}

export type MatchStatus = "Scheduled" | "Ongoing" | "Completed";

export interface Schedule {
  id: number;
  matchDate: Date;
  team1Id: number;
  team2Id: number;
  category: string;
  scoreTeam1?: number | null;
  scoreTeam2?: number | null;
  status: MatchStatus;
  createdOn: Date;
  updatedOn: Date;
}

export interface Bracket {
  id: number;
  round: number;
  matchId: number;
  winnerId?: number | null;
  createdOn: Date;
  updatedOn: Date;
}

export interface AdminUser {
  id: number;
  username: string;
  passwordHash: string;
  createdOn: Date;
  updatedOn: Date;
}
