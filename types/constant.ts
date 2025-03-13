import { Matches } from "./types";

export const zodiacSignsAcronym: Record<string, string> = {
  Aries: "AR",
  Taurus: "TA",
  Gemini: "GE",
  Cancer: "CA",
  Leo: "LE",
  Virgo: "VI",
  Libra: "LI",
  Scorpio: "SC",
  Sagittarius: "SG",
  Capricorn: "CP",
  Aquarius: "AQ",
  Pisces: "PI",
  TBD: "TBD",
};

export const teamLogos: Record<string, string> = {
  Capricorn: "/team_logo/Capricorn.png",
  Leo: "/team_logo/Leo.png",
  Libra: "/team_logo/Libra.png",
  Pisces: "/team_logo/Pisces.png",
  Sagittarius: "/team_logo/Sagittarius.png",
  Scorpio: "/team_logo/Scorpio.png",
  Taurus: "/team_logo/Taurus.png",
  Virgo: "/team_logo/Virgo.png",
  TBD: "/team_logo/TBD.png",
};

export const TEAMS = [
  "Virgo",
  "Pisces",
  "Sagittarius",
  "Capricorn",
  "Libra",
  "Scorpio",
  "Taurus",
  "Leo",
] as const;

export const GAMES = [
  "Basketball 3x3",
  "Basketball 5x5",
  "Volleyball (Men)",
  "Volleyball (Women)",
  "Badminton (Men)",
  "Badminton (Women)",
  "Table Tennis (Men)",
  "Table Tennis (Women)",
  "Chess (Men)",
  "Chess (Women)",
  "Scrabble (Men)",
  "Scrabble (Women)",
  "Futsal (Men)",
  "Futsal (Women)",
  "Sepak Takraw (Men)",
  "Sepak Takraw (Women)",
  "CODM",
  "MLBB",
  "Tekken 8",
  "Valorant",
  "Marvel Rivals",
  "DOTA 2",
] as const;

export const GENDER = ["MEN", "WOMEN"] as const;

export const VENUES = [
  "Open Court 1",
  "Open Court 2",
  "Elem Basketball Court",
  "Gymnasium",
  "ME157",
  "ME158",
  "WIL",
  "NGE Computer Labs",
  "MassCom Theater",
  "Covered Court",
  "Open Court",
  "Open Court 1 & 2",
];

export const venuesString = VENUES.join(", ");

export const MATCH_DATES: Record<string, string> = {
  "March 12, 2025": "2025-03-12",
  "March 13, 2025": "2025-03-13",
  "March 14, 2025": "2025-03-14",
  "March 15, 2025": "2025-03-15",
};

export const TEAMS_COLORS: Record<string, string> = {
  Virgo: "green",
  Pisces: "blue",
  Sagittarius: "pink",
  Capricorn: "red",
  Libra: "purple",
  Scorpio: "black",
  Taurus: "brown",
  Leo: "orange",
};

export const tournamentMatches = {
  rounds: [
    {
      roundId: "Round 1 - Round Robin",
      seeds: [
        {
          gameNo: 1,
          team1Name: "Virgo",
          team2Name: "Pisces",
          winner: "Virgo",
          team1Score: 21,
          team2Score: 18,
        },
        {
          gameNo: 2,
          team1Name: "Sagittarius",
          team2Name: "Capricorn",
          winner: "Capricorn",
          team1Score: 15,
          team2Score: 22,
        },
        {
          gameNo: 3,
          team1Name: "Libra",
          team2Name: "Scorpio",
          winner: "Libra",
          team1Score: 19,
          team2Score: 17,
        },
        {
          gameNo: 4,
          team1Name: "Taurus",
          team2Name: "Leo",
          winner: "Leo",
          team1Score: 16,
          team2Score: 20,
        },
      ],
    },
    {
      roundId: "Round 2 - Round Robin",
      seeds: [
        {
          gameNo: 5,
          team1Name: "Virgo",
          team2Name: "Sagittarius",
          winner: "Virgo",
          team1Score: 23,
          team2Score: 19,
        },
        {
          gameNo: 6,
          team1Name: "Pisces",
          team2Name: "Capricorn",
          winner: "Capricorn",
          team1Score: 14,
          team2Score: 21,
        },
        {
          gameNo: 7,
          team1Name: "Libra",
          team2Name: "Taurus",
          winner: "Libra",
          team1Score: 22,
          team2Score: 20,
        },
        {
          gameNo: 8,
          team1Name: "Scorpio",
          team2Name: "Leo",
          winner: "Leo",
          team1Score: 17,
          team2Score: 25,
        },
      ],
    },
    {
      roundId: "Round 3 - Semifinals",
      seeds: [
        {
          gameNo: 9,
          team1Name: "Virgo",
          team2Name: "Leo",
          winner: "Virgo",
          team1Score: 27,
          team2Score: 24,
        },
        {
          gameNo: 10,
          team1Name: "Capricorn",
          team2Name: "Libra",
          winner: "Capricorn",
          team1Score: 22,
          team2Score: 20,
        },
      ],
    },
    {
      roundId: "Round 4 - Finals",
      seeds: [
        {
          gameNo: 11,
          team1Name: "Virgo",
          team2Name: "Capricorn",
          winner: "Virgo",
          team1Score: 30,
          team2Score: 28,
        },
      ],
    },
    {
      roundId: "Round 4 - Third Place Match",
      seeds: [
        {
          gameNo: 12,
          team1Name: "Leo",
          team2Name: "Libra",
          winner: "Leo",
          team1Score: 25,
          team2Score: 23,
        },
      ],
    },
  ],
} as Matches;
