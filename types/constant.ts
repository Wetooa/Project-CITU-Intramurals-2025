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
  "Pisces & Capricorn": "PI & CP",
  "Libra & Capricorn": "LI & CP",
  "Taurus & Scorpio": "TA & SC",
  "Leo & Libra": "LE & LI",
  "Sagittarius & Virgo": "SG & VI",
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
  "Pisces & Capricorn": "/team_logo/Pisces & Capricorn.png",
  "Libra & Capricorn": "/team_logo/Libra & Capricorn.png",
  "Taurus & Scorpio": "/team_logo/Taurus & Scorpio.png",
  "Leo & Libra": "/team_logo/Leo & Libra.png",
  "Sagittarius & Virgo": "/team_logo/Sagittarius & Virgo.png",
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
  "Sepak Takraw",
  "CODM",
  "MLBB",
  "Tekken 8",
  "Valorant",
  "Marvel Rivals",
  "DOTA 2",
] as const;

export const SPORTS = GAMES.slice(0, 16);
export const E_SPORTS = GAMES.slice(16);

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
