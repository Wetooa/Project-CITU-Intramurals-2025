export interface Department {
  id: number;
  name: string;
  created_on: Date;
  updated_on: Date;
}

export interface Player {
  id: number;
  name: string;
  department_id: number;
  points: number;
  assists: number;
  rebounds: number;
  created_on: Date;
  updated_on: Date;
}

export interface Leaderboard {
  id: number;
  department_id: number;
  category: string; // Basketball, Volleyball, Chess, etc.
  wins: number;
  losses: number;
  draws: number;
  points: number;
  created_on: Date;
  updated_on: Date;
}

export type MatchStatus = "Scheduled" | "Ongoing" | "Completed";

export interface Schedule {
  id: number;
  match_date: Date;
  team1_id: number;
  team2_id: number;
  category: string;
  score_team1?: number | null;
  score_team2?: number | null;
  status: MatchStatus;
  created_on: Date;
  updated_on: Date;
}

export interface Bracket {
  id: number;
  round: number;
  match_id: number;
  winner_id?: number | null;
  created_on: Date;
  updated_on: Date;
}

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  created_on: Date;
  updated_on: Date;
}
