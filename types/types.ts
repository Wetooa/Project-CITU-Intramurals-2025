export type CategoryName = "Basketball (men)" | "Basketball (women)";
export type MatchStatus = "Scheduled" | "Ongoing" | "Completed";

export type Department = {
  id: string;
  color: string;
  district: string;
  createdOn: Date;
  updatedOn: Date;
};

export type Category = {
  id: CategoryName;
  venue: string;
};

export type Leaderboard = {
  id: string;
  categoryId: string;
  departmentId: string;

  wins: number;
  losses: number;
  draws: number;
  points: number;

  createdOn: Date;
  updatedOn: Date;
};

export type Schedule = {
  id: string;
  team1Id: string;
  team2Id: string;

  matchDate: Date;
  category: Category;

  scoreTeam1?: number | null;
  scoreTeam2?: number | null;

  status: MatchStatus;

  createdOn: Date;
  updatedOn: Date;
};

export type Bracket = {
  matchId: string;
  round: number;
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

export const GoogleSheetsTitle = [
  "team",
  "category",
  "schedule",
  "bracket",
  "adminUser",
] as const;
export type GoogleSheetsTitleType = (typeof GoogleSheetsTitle)[number];
