export const GoogleSheetsTitle = [
  "team",
  "category",
  "schedule",
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

export type Winner = "team1" | "team2" | "draw";

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

export type Schedule = {
  id: string;
  team1Id: string;
  team2Id: string;

  matchDate: Date;
  category: Category;
  venue: string;
  round: string;

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
  points: number;
};

export type Bracket = {
  team1Id: string;
  team2Id: string;
  round: string;

  scoreTeam1?: number | null;
  scoreTeam2?: number | null;
  winner?: Winner | null;
};
