export const GoogleSheetsTitle = [
  "team",
  "category",
  "schedule",
  "bracket",
  "adminUser",
] as const;
export type GoogleSheetsTitleType = (typeof GoogleSheetsTitle)[number];

export type Category =
  | "Basketball (men)"
  | "Basketball (women)"
  | "Volleyball (men)"
  | "Volleyball (women)"
  | "Chess";

export type MatchStatus = "Scheduled" | "Ongoing" | "Completed";

export const ALL_TEAMS = [
  "Virgo",
  "Pisces",
  "Sagitarius",
  "Capricorn",
  "Libra",
  "Scorpio",
  "Taurus",
  "Leo",
];

export type Team = {
  id: string;
  color: string;
  district: string;
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
  venue: string;

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
