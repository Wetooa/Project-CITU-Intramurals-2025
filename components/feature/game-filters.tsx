import React, { useState } from "react";
import CustomizedSelect from "@/components/shared/customized-select";
import Image from "next/image";
import { GAMES, TEAMS } from "@/types/constant";

const SWORD_ICON = "/sword_icon.svg";

export default function GameFiltersSchedule() {
  const [filters, setFilters] = useState({
    Game: "",
    Date: "",
    Team: "",
    Rival_Team: "",
  });

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value, // Update the specific filter
    }));
  };

  return (
    <>
      <div className="w-auto p-5 flex flex col rounded-2xl justify-center items-center text-white bg-mocha">
        <div className="flex justify-between w-full p-4 gap-2">
          <div className="flex flex-col gap-7 items-center justify-center">
            <div className="flex md:flex-row flex-col gap-5 justify-between w-full items-center">
              <CustomizedSelect
                title={"Game"}
                value={filters.Game}
                options={GAMES}
                onChange={(value) => handleFilterChange("Game", value)}
              />
              <CustomizedSelect
                title={"Date"}
                value={filters.Date}
                options={["1", "2", "3"]}
                onChange={(value) => handleFilterChange("Date", value)}
              />
            </div>
            <div className="flex md:flex-row flex-col gap-5 justify-between w-full items-center">
              <CustomizedSelect
                title={"Team"}
                value={filters.Team}
                options={TEAMS}
                onChange={(value) => handleFilterChange("Team", value)}
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
                options={TEAMS}
                value={filters.Rival_Team}
                onChange={(value) => handleFilterChange("Rival_Team", value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

