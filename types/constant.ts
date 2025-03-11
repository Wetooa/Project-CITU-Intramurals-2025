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
};

export const TEAMS = [
  "Virgo",
  "Pisces",
  "Sagitarius",
  "Capricorn",
  "Libra",
  "Scorpio",
  "Taurus",
  "Leo",
] as const;

export const GAMES = [
  "Basketball",
  "Volleyball",
  "Badminton",
  "Table Tennis",
  "Chess",
  "Scrabble",
  "Futsal",
  "Sepak Takraw",
  "CODM",
  "MLBB",
  "Tekken 8",
  "Valorant",
  "Marvel Rivals",
  "DOTA 2",
] as const;

export const GENDER = ["MEN", "WOMEN"] as const;
