"use client"

import Image from "next/image"
import {useState} from "react"
import {teamLogos, zodiacSignsAcronym} from "@/types/constant"

interface TeamLogoProps {
    teamId: string
    size?: number
    showWinner?: boolean
    isWinner?: boolean
}

export function TeamLogo({teamId, size = 40, showWinner = false, isWinner = false}: TeamLogoProps) {
    const [imageError, setImageError] = useState(false)
    const logoUrl = teamLogos[teamId as string]
    const acronym = zodiacSignsAcronym[teamId as string] || teamId.substring(0, 1)

    return (
        <div className="relative" style={{width: size, height: size}}>
            {logoUrl && !imageError ? (
                <div
                    className="bg-[#242322] rounded-full overflow-hidden flex items-center justify-center"
                    style={{width: size, height: size}}
                >
                    <Image
                        src={logoUrl || "/placeholder.svg"}
                        width={size}
                        height={size}
                        alt={`${teamId} logo`}
                        className="object-contain transition-transform duration-300 hover:scale-110"
                        onError={() => setImageError(true)}
                    />
                </div>
            ) : (
                <div
                    className="rounded-full bg-[#242322] flex items-center justify-center text-white font-bold"
                    style={{width: size, height: size}}
                >
                    {acronym.charAt(0)}
                </div>
            )}

            {showWinner && isWinner && (
                <div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">W</span>
                </div>
            )}
        </div>
    )
}

