"use client"
import {useState, useEffect} from "react"
import {motion} from "framer-motion"
import Image from "next/image"
import {Trophy, ChevronDown, ChevronUp} from "lucide-react"
import {zodiacSignsAcronym, teamLogos} from "./constants" // Adjust the import path as needed

// Types for our bracket data
type Team = {
    id: string
    name: string
    logo: string
    score?: number
}

type Seed = {
    id: number
    team1: Team
    team2: Team
    winner?: string
    played: boolean
}

type Round = {
    id: string
    name: string
    seeds: Seed[]
}

type BracketData = {
    [key: string]: {
        rounds: Round[]
    }
}

// Dummy data for the brackets
const DUMMY_DATA: BracketData = {
    "Basketball 3x3": {
        rounds: [
            {
                id: "round-1",
                name: "Quarterfinals",
                seeds: [
                    {
                        id: 1,
                        team1: {id: "Virgo", name: "Virgo", logo: teamLogos["Virgo"], score: 21},
                        team2: {id: "Pisces", name: "Pisces", logo: teamLogos["Pisces"], score: 15},
                        winner: "Virgo",
                        played: true,
                    },
                    {
                        id: 2,
                        team1: {id: "Sagittarius", name: "Sagittarius", logo: teamLogos["Sagittarius"], score: 18},
                        team2: {id: "Capricorn", name: "Capricorn", logo: teamLogos["Capricorn"], score: 19},
                        winner: "Capricorn",
                        played: true,
                    },
                    {
                        id: 3,
                        team1: {id: "Libra", name: "Libra", logo: teamLogos["Libra"], score: 22},
                        team2: {id: "Scorpio", name: "Scorpio", logo: teamLogos["Scorpio"], score: 17},
                        winner: "Libra",
                        played: true,
                    },
                    {
                        id: 4,
                        team1: {id: "Taurus", name: "Taurus", logo: teamLogos["Taurus"], score: 16},
                        team2: {id: "Leo", name: "Leo", logo: teamLogos["Leo"], score: 20},
                        winner: "Leo",
                        played: true,
                    },
                ],
            },
            {
                id: "round-2",
                name: "Semifinals",
                seeds: [
                    {
                        id: 5,
                        team1: {id: "Virgo", name: "Virgo", logo: teamLogos["Virgo"], score: 19},
                        team2: {id: "Capricorn", name: "Capricorn", logo: teamLogos["Capricorn"], score: 17},
                        winner: "Virgo",
                        played: true,
                    },
                    {
                        id: 6,
                        team1: {id: "Libra", name: "Libra", logo: teamLogos["Libra"], score: 18},
                        team2: {id: "Leo", name: "Leo", logo: teamLogos["Leo"], score: 21},
                        winner: "Leo",
                        played: true,
                    },
                ],
            },
            {
                id: "round-3",
                name: "Finals",
                seeds: [
                    {
                        id: 7,
                        team1: {id: "Virgo", name: "Virgo", logo: teamLogos["Virgo"], score: 22},
                        team2: {id: "Leo", name: "Leo", logo: teamLogos["Leo"], score: 20},
                        winner: "Virgo",
                        played: true,
                    },
                ],
            },
        ],
    },
    "Volleyball (Men)": {
        rounds: [
            {
                id: "round-1",
                name: "Quarterfinals",
                seeds: [
                    {
                        id: 1,
                        team1: {id: "Virgo", name: "Virgo", logo: teamLogos["Virgo"], score: 3},
                        team2: {id: "Pisces", name: "Pisces", logo: teamLogos["Pisces"], score: 1},
                        winner: "Virgo",
                        played: true,
                    },
                    {
                        id: 2,
                        team1: {id: "Sagittarius", name: "Sagittarius", logo: teamLogos["Sagittarius"], score: 2},
                        team2: {id: "Capricorn", name: "Capricorn", logo: teamLogos["Capricorn"], score: 3},
                        winner: "Capricorn",
                        played: true,
                    },
                    {
                        id: 3,
                        team1: {id: "Libra", name: "Libra", logo: teamLogos["Libra"], score: 3},
                        team2: {id: "Scorpio", name: "Scorpio", logo: teamLogos["Scorpio"], score: 0},
                        winner: "Libra",
                        played: true,
                    },
                    {
                        id: 4,
                        team1: {id: "Taurus", name: "Taurus", logo: teamLogos["Taurus"], score: 1},
                        team2: {id: "Leo", name: "Leo", logo: teamLogos["Leo"], score: 3},
                        winner: "Leo",
                        played: true,
                    },
                ],
            },
            {
                id: "round-2",
                name: "Semifinals",
                seeds: [
                    {
                        id: 5,
                        team1: {id: "Virgo", name: "Virgo", logo: teamLogos["Virgo"], score: 3},
                        team2: {id: "Capricorn", name: "Capricorn", logo: teamLogos["Capricorn"], score: 2},
                        winner: "Virgo",
                        played: true,
                    },
                    {
                        id: 6,
                        team1: {id: "Libra", name: "Libra", logo: teamLogos["Libra"], score: 1},
                        team2: {id: "Leo", name: "Leo", logo: teamLogos["Leo"], score: 3},
                        winner: "Leo",
                        played: true,
                    },
                ],
            },
            {
                id: "round-3",
                name: "Finals",
                seeds: [
                    {
                        id: 7,
                        team1: {id: "Virgo", name: "Virgo", logo: teamLogos["Virgo"], score: 2},
                        team2: {id: "Leo", name: "Leo", logo: teamLogos["Leo"], score: 3},
                        winner: "Leo",
                        played: true,
                    },
                ],
            },
        ],
    },
    MLBB: {
        rounds: [
            {
                id: "round-1",
                name: "Quarterfinals",
                seeds: [
                    {
                        id: 1,
                        team1: {id: "Virgo", name: "Virgo", logo: teamLogos["Virgo"], score: 2},
                        team2: {id: "Pisces", name: "Pisces", logo: teamLogos["Pisces"], score: 0},
                        winner: "Virgo",
                        played: true,
                    },
                    {
                        id: 2,
                        team1: {id: "Sagittarius", name: "Sagittarius", logo: teamLogos["Sagittarius"], score: 1},
                        team2: {id: "Capricorn", name: "Capricorn", logo: teamLogos["Capricorn"], score: 2},
                        winner: "Capricorn",
                        played: true,
                    },
                    {
                        id: 3,
                        team1: {id: "Libra", name: "Libra", logo: teamLogos["Libra"], score: 2},
                        team2: {id: "Scorpio", name: "Scorpio", logo: teamLogos["Scorpio"], score: 1},
                        winner: "Libra",
                        played: true,
                    },
                    {
                        id: 4,
                        team1: {id: "Taurus", name: "Taurus", logo: teamLogos["Taurus"], score: 0},
                        team2: {id: "Leo", name: "Leo", logo: teamLogos["Leo"], score: 2},
                        winner: "Leo",
                        played: true,
                    },
                ],
            },
            {
                id: "round-2",
                name: "Semifinals",
                seeds: [
                    {
                        id: 5,
                        team1: {id: "Virgo", name: "Virgo", logo: teamLogos["Virgo"], score: 3},
                        team2: {id: "Capricorn", name: "Capricorn", logo: teamLogos["Capricorn"], score: 1},
                        winner: "Virgo",
                        played: true,
                    },
                    {
                        id: 6,
                        team1: {id: "Libra", name: "Libra", logo: teamLogos["Libra"], score: 2},
                        team2: {id: "Leo", name: "Leo", logo: teamLogos["Leo"], score: 3},
                        winner: "Leo",
                        played: true,
                    },
                ],
            },
            {
                id: "round-3",
                name: "Finals",
                seeds: [
                    {
                        id: 7,
                        team1: {id: "Virgo", name: "Virgo", logo: teamLogos["Virgo"], score: 3},
                        team2: {id: "Leo", name: "Leo", logo: teamLogos["Leo"], score: 2},
                        winner: "Virgo",
                        played: true,
                    },
                ],
            },
        ],
    },
}

// List of available sports/games
const SPORTS = [
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
]
const ESPORTS = ["CODM", "MLBB", "Tekken 8", "Valorant", "Marvel Rivals", "DOTA 2"]
const GAMES = [...SPORTS, ...ESPORTS]

// Mock API fetch function
export async function fetchBracket() {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(DUMMY_DATA)
        }, 500)
    })
}

// Custom select component
function CustomizedSelect({
                              title,
                              options,
                              value,
                              onChange,
                          }: {
    title: string
    options: { label: string; value: string }[]
    value: string
    onChange: (value: string) => void
}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative w-full max-w-xs">
            <div
                className="flex items-center justify-between p-3 bg-mocha rounded-md cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium">{value}</span>
                {isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
            </div>

            {isOpen && (
                <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    className="absolute z-10 w-full mt-1 bg-mocha rounded-md shadow-lg max-h-60 overflow-auto"
                >
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`p-3 cursor-pointer hover:bg-charcoal_black ${value === option.value ? "bg-charcoal_black" : ""}`}
                            onClick={() => {
                                onChange(option.value)
                                setIsOpen(false)
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}

// Match component
function MatchCard({seed, isLast}: { seed: Seed; isLast?: boolean }) {
    return (
        <div className="w-[280px] bg-phantom_ash rounded-md overflow-hidden shadow-lg">
            <div
                className={`w-full flex items-center p-3 ${
                    seed.winner === seed.team1.id
                        ? "bg-gradient-to-r from-maroon/40 to-transparent border-l-4 border-coral_red"
                        : "bg-mocha"
                }`}
            >
                <div
                    className="w-10 h-10 bg-charcoal_black rounded-full flex items-center justify-center overflow-hidden mr-3">
                    <Image
                        src={seed.team1.logo || "/placeholder.svg?height=50&width=50"}
                        width={30}
                        height={30}
                        alt={seed.team1.name}
                        className="object-contain"
                    />
                </div>
                <div className="flex-1 font-medium">
                    {seed.team1.name}
                    <span className="ml-1 text-xs opacity-70">{zodiacSignsAcronym[seed.team1.id] || ""}</span>
                </div>
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        seed.winner === seed.team1.id ? "bg-coral_red text-white" : "bg-charcoal_black"
                    }`}
                >
                    {seed.played ? seed.team1.score : "-"}
                </div>
            </div>

            <div
                className={`w-full flex items-center p-3 ${
                    seed.winner === seed.team2.id
                        ? "bg-gradient-to-r from-maroon/40 to-transparent border-l-4 border-coral_red"
                        : "bg-mocha"
                }`}
            >
                <div
                    className="w-10 h-10 bg-charcoal_black rounded-full flex items-center justify-center overflow-hidden mr-3">
                    <Image
                        src={seed.team2.logo || "/placeholder.svg?height=50&width=50"}
                        width={30}
                        height={30}
                        alt={seed.team2.name}
                        className="object-contain"
                    />
                </div>
                <div className="flex-1 font-medium">
                    {seed.team2.name}
                    <span className="ml-1 text-xs opacity-70">{zodiacSignsAcronym[seed.team2.id] || ""}</span>
                </div>
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        seed.winner === seed.team2.id ? "bg-coral_red text-white" : "bg-charcoal_black"
                    }`}
                >
                    {seed.played ? seed.team2.score : "-"}
                </div>
            </div>

            {isLast && seed.winner && (
                <div className="bg-gradient-to-r from-coral_red to-maroon p-2 flex items-center justify-center">
                    <Trophy size={16} className="mr-2"/>
                    <span className="font-bold">CHAMPION</span>
                </div>
            )}
        </div>
    )
}

// Completely new bracket implementation with proper triangle layout
export default function BracketScreen() {
    const [selectedBracket, setSelectedBracket] = useState("Basketball 3x3")
    const [data, setData] = useState<BracketData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const result = await fetchBracket()
                setData(result as BracketData)
            } catch (error) {
                console.error("Error fetching bracket data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [])

    // If loading, show a loading indicator
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-coral_red"></div>
            </div>
        )
    }

    // UNCOMMENT THIS SECTION TO SHOW THE PLACEHOLDER SCREEN INSTEAD OF THE BRACKET
    // return (
    //   <div className="p-6 flex flex-col items-center justify-center w-screen h-screen">
    //     <span className="md:text-4xl text-xl font-bold align-middle text-center">
    //       There are no bracket matches scheduled for today. Round-robin matches
    //       are still in progress.
    //     </span>
    //     <motion.div
    //       animate={{ y: [0, -5, 0] }}
    //       transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    //     >
    //       <Image
    //         src="/IMG_5077.PNG"
    //         width={500}
    //         height={800}
    //         alt="404 leo"
    //       ></Image>
    //     </motion.div>
    //   </div>
    // );

    return (
        <div className="flex flex-col md:flex-row h-screen bg-night_black text-white">
            {/* Sidebar for desktop */}
            <div className="hidden md:flex flex-col w-[300px] h-full bg-phantom_ash p-6 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-8">BRACKETS</h1>

                <h2 className="text-xl font-bold mb-4">SPORTS</h2>
                <div className="space-y-2 mb-8">
                    {SPORTS.map((sport) => (
                        <div
                            key={sport}
                            className={`p-2 cursor-pointer transition-all hover:bg-mocha rounded ${
                                selectedBracket === sport ? "bg-mocha border-l-4 border-coral_red pl-3" : ""
                            }`}
                            onClick={() => setSelectedBracket(sport)}
                        >
                            <span
                                className={`font-medium ${selectedBracket === sport ? "text-coral_red" : ""}`}>{sport}</span>
                        </div>
                    ))}
                </div>

                <h2 className="text-xl font-bold mb-4">ESPORTS</h2>
                <div className="space-y-2">
                    {ESPORTS.map((esport) => (
                        <div
                            key={esport}
                            className={`p-2 cursor-pointer transition-all hover:bg-mocha rounded ${
                                selectedBracket === esport ? "bg-mocha border-l-4 border-coral_red pl-3" : ""
                            }`}
                            onClick={() => setSelectedBracket(esport)}
                        >
                            <span
                                className={`font-medium ${selectedBracket === esport ? "text-coral_red" : ""}`}>{esport}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile selector */}
            <div className="md:hidden p-4 bg-phantom_ash">
                <CustomizedSelect
                    title="Brackets"
                    options={GAMES.map((game) => ({
                        label: game,
                        value: game,
                    }))}
                    value={selectedBracket}
                    onChange={(value) => setSelectedBracket(value)}
                />
            </div>

            {/* Main content area */}
            <div className="flex-1 overflow-auto">
                <div className="p-4 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6">{selectedBracket} Tournament</h1>

                    {data && data[selectedBracket] ? (
                        <div className="overflow-x-auto">
                            {/* New symmetrical bracket layout */}
                            <div className="relative min-w-max">
                                <div className="flex">
                                    {data[selectedBracket].rounds.map((round, roundIndex) => (
                                        <div key={round.id} className="flex flex-col mx-6 first:ml-0">
                                            <div className="bg-mocha rounded-md w-[280px] p-3 mb-6 text-center">
                                                <h3 className="font-bold">{round.name}</h3>
                                            </div>

                                            <div className="flex flex-col">
                                                {round.seeds.map((seed, seedIndex) => {
                                                    // Calculate vertical spacing based on round
                                                    const spacingMultiplier = Math.pow(2, roundIndex)
                                                    const baseSpacing = 160 // Base spacing between matches

                                                    return (
                                                        <div
                                                            key={seed.id}
                                                            className="mb-4"
                                                            style={{
                                                                marginTop:
                                                                    seedIndex === 0
                                                                        ? ((spacingMultiplier - 1) * baseSpacing) / 2
                                                                        : baseSpacing * spacingMultiplier - 4,
                                                            }}
                                                        >
                                                            <MatchCard seed={seed}
                                                                       isLast={roundIndex === data[selectedBracket].rounds.length - 1}/>

                                                            {/* Draw connector lines */}
                                                            {roundIndex < data[selectedBracket].rounds.length - 1 && seed.winner && (
                                                                <div
                                                                    className="absolute"
                                                                    style={{
                                                                        left: 280 + roundIndex * 340, // Position after the match card
                                                                        top:
                                                                            seedIndex % 2 === 0
                                                                                ? seedIndex * spacingMultiplier * baseSpacing + 80
                                                                                : // Top match
                                                                                (seedIndex - 1) * spacingMultiplier * baseSpacing +
                                                                                80 +
                                                                                (baseSpacing * spacingMultiplier) / 2, // Bottom match
                                                                        width: 60,
                                                                        height: seedIndex % 2 === 0 ? (baseSpacing * spacingMultiplier) / 2 : 0,
                                                                        borderRight: "2px solid #4A4A4A",
                                                                        borderTop: seedIndex % 2 === 0 ? "none" : "2px solid #4A4A4A",
                                                                        borderBottom: seedIndex % 2 === 0 ? "2px solid #4A4A4A" : "none",
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                            <div className="bg-phantom_ash p-6 rounded-lg shadow-lg max-w-md">
                                <h2 className="text-xl font-bold mb-4">No Bracket Available</h2>
                                <p className="text-gray-400 mb-4">
                                    There are no bracket matches available for {selectedBracket} at this time.
                                    Round-robin matches may
                                    still be in progress.
                                </p>
                                <div className="p-2 bg-mocha rounded-md text-sm text-gray-400">Check back later for
                                    updates
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

