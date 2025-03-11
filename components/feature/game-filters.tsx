import CustomizedSelect from "@/components/shared/customized-select";
import { GAMES, MATCH_DATES, TEAMS, VENUES } from "@/types/constant";
import React, { SetStateAction } from "react";

import { Filters } from "@/app/schedule/page";
import Image from "next/image";

const SWORD_ICON = "/sword_icon.svg";

export default function GameFiltersSchedule({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: React.Dispatch<SetStateAction<Filters>>;
}) {
  const handleFilterChange = (filterKey: string, value: string) => {
    // Map component filter keys to context filter keys
    const contextKeyMap: Record<string, string> = {
      category: "category",
      matchDate: "matchDate",
      team1Id: "team1Id",
      team2Id: "team2Id",
      venue: "venue",
    };

    const contextKey = contextKeyMap[filterKey];
    setFilters({
      ...filters,
      [contextKey]: value,
    });
  };

  return (
    <>
      <div className="w-auto p-5 flex flex-col rounded-2xl justify-center items-center text-white bg-mocha">
        <div className="flex justify-between w-full p-4 gap-2">
          <div className="flex flex-col gap-7 items-center justify-center">
            <div className="flex md:flex-row flex-col gap-5 justify-between w-full items-center">
              <CustomizedSelect
                title={"Game"}
                value={filters.category || ""}
                options={GAMES.map((game) => ({
                  value: game,
                  label: game,
                }))}
                onChange={(value) => handleFilterChange("category", value)}
              />
              <CustomizedSelect
                title={"Date"}
                value={filters.matchDate || ""}
                options={Object.keys(MATCH_DATES).map((key) => ({
                  label: key, // Store YYYY-MM-DD
                  value: MATCH_DATES[key], // Display formatted date
                }))}
                onChange={(value) => handleFilterChange("matchDate", value)}
              />
            </div>
            <div className="flex md:flex-row flex-col gap-5 justify-between w-full items-center">
              <CustomizedSelect
                title={"Team"}
                value={filters.team1Id || ""}
                options={TEAMS.map((team) => ({
                  label: team,
                  value: team,
                }))}
                onChange={(value) => handleFilterChange("team1Id", value)}
              />
              <Image
                src={SWORD_ICON}
                width={30}
                height={30}
                alt="Sword_Icon"
                className="md:self-end md:bottom-2 relative self-center bottom-0"
              />
              <CustomizedSelect
                title={"Rival Team"}
                options={TEAMS.map((team) => ({
                  label: team,
                  value: team,
                }))}
                value={filters.team2Id || ""}
                onChange={(value) => handleFilterChange("team2Id", value)}
              />
            </div>
            <CustomizedSelect
              title={"Venue"}
              options={VENUES.map((venue) => ({
                label: venue,
                value: venue,
              }))}
              value={filters.venue || ""}
              onChange={(value) => handleFilterChange("venue", value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
