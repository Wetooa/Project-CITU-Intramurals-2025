"use client";
import type { Filters } from "@/app/schedule/page";
import CustomizedSelect from "@/components/shared/customized-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GAMES, MATCH_DATES, TEAMS, VENUES } from "@/types/constant";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Filter, X } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { type SetStateAction, useState } from "react";

const SWORD_ICON = "/sword_icon.svg";

// Common filter presets
const COMMON_FILTERS = [
  {
    name: "All Matches",
    filters: {
      category: "all",
      matchDate: "all",
      team1Id: "all",
      team2Id: "all",
      venue: "all",
      gender: "all",
    },
  },
  {
    name: "Today's Matches",
    filters: {
      category: "all",
      matchDate: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD
      team1Id: "all",
      team2Id: "all",
      venue: "all",
      gender: "all",
    },
  },
  {
    name: "Basketball",
    filters: {
      category: "Basketball",
      matchDate: "all",
      team1Id: "all",
      team2Id: "all",
      venue: "all",
      gender: "all",
    },
  },
  {
    name: "Volleyball",
    filters: {
      category: "Volleyball",
      matchDate: "all",
      team1Id: "all",
      team2Id: "all",
      venue: "all",
      gender: "all",
    },
  },
];

export default function GameFiltersSchedule({
  filters,
  setFiltersAction,
}: {
  filters: Filters;
  setFiltersAction: React.Dispatch<SetStateAction<Filters>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (filterKey: string, value: string) => {
    setFiltersAction({
      ...filters,
      [filterKey]: value,
    });

    // Update active filters display
    if (value && value !== "all") {
      if (!activeFilters.includes(filterKey)) {
        setActiveFilters([...activeFilters, filterKey]);
      }
    } else {
      setActiveFilters(activeFilters.filter((f) => f !== filterKey));
    }
  };

  const applyPresetFilter = (preset: (typeof COMMON_FILTERS)[0]) => {
    setFiltersAction(preset.filters);

    // Update active filters based on preset
    const newActiveFilters = Object.entries(preset.filters)
      .filter(([, value]) => value && value !== "all")
      .map(([key]) => key);

    setActiveFilters(newActiveFilters);
  };

  const clearAllFilters = () => {
    setFiltersAction({
      category: "all",
      matchDate: "all",
      team1Id: "all",
      team2Id: "all",
      venue: "all",
      gender: "all",
    });
    setActiveFilters([]);
  };

  const getFilterLabel = (key: string, value: string) => {
    switch (key) {
      case "category":
        return `Game: ${value}`;
      case "matchDate":
        // Find the label for the date value
        const dateLabel =
          Object.entries(MATCH_DATES).find(([, val]) => val === value)?.[0] ||
          value;
        return `Date: ${dateLabel}`;
      case "team1Id":
        return `Team: ${value}`;
      case "team2Id":
        return `Rival: ${value}`;
      case "venue":
        return `Venue: ${value}`;
      default:
        return `${key}: ${value}`;
    }
  };

  return (
    <div className="w-full">
      {/* Filter Header with Toggle and Active Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-mocha/80 border-maroon hover:bg-mocha"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter className="h-4 w-4" />
          Filters
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>

        {/* Common Filter Presets */}
        <div className="flex flex-wrap gap-2">
          {COMMON_FILTERS.map((preset) => (
            <Button
              key={preset.name}
              variant="ghost"
              size="sm"
              className="bg-mocha/50 hover:bg-mocha text-gray-300 border border-maroon/30"
              onClick={() => applyPresetFilter(preset)}
            >
              {preset.name}
            </Button>
          ))}
        </div>

        {/* Clear All Button - Only show if there are active filters */}
        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto text-red-400 hover:text-red-300 hover:bg-red-950/30"
            onClick={clearAllFilters}
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(filters).map(([key, value]) => {
            if (value && value !== "all") {
              return (
                <Badge
                  key={key}
                  variant="secondary"
                  className="bg-maroon/20 text-gray-200 hover:bg-maroon/30 border border-maroon/40 px-3 py-1"
                >
                  {getFilterLabel(key, value)}
                  <button
                    className="ml-2 text-gray-400 hover:text-white"
                    onClick={() => handleFilterChange(key, "all")}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            }
            return null;
          })}
        </div>
      )}

      {/* Collapsible Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="overflow-hidden border-maroon bg-gradient-to-br from-mocha to-[#1a1512] shadow-xl mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <CustomizedSelect
                      title={"Game"}
                      value={filters.category || "all"}
                      options={GAMES.map((game) => ({
                        value: game,
                        label: game,
                      }))}
                      onChange={(value) =>
                        handleFilterChange("category", value)
                      }
                    />
                    <CustomizedSelect
                      title={"Date"}
                      value={filters.matchDate || "all"}
                      options={Object.keys(MATCH_DATES).map((key) => ({
                        label: key, // Display formatted date
                        value: MATCH_DATES[key], // Store YYYY-MM-DD
                      }))}
                      onChange={(value) =>
                        handleFilterChange("matchDate", value)
                      }
                    />
                  </div>

                  <div className="grid md:grid-cols-5 gap-4 items-end">
                    <div className="md:col-span-2">
                      <CustomizedSelect
                        title={"Team"}
                        value={filters.team1Id || "all"}
                        options={TEAMS.map((team) => ({
                          label: team,
                          value: team,
                        }))}
                        onChange={(value) =>
                          handleFilterChange("team1Id", value)
                        }
                      />
                    </div>

                    <div className="flex justify-center">
                      <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-10 h-10 flex items-center justify-center"
                      >
                        <Image
                          src={SWORD_ICON || "/placeholder.svg"}
                          width={30}
                          height={30}
                          alt="Sword_Icon"
                          className="object-contain"
                        />
                      </motion.div>
                    </div>

                    <div className="md:col-span-2">
                      <CustomizedSelect
                        title={"Rival Team"}
                        options={TEAMS.map((team) => ({
                          label: team,
                          value: team,
                        }))}
                        value={filters.team2Id || "all"}
                        onChange={(value) =>
                          handleFilterChange("team2Id", value)
                        }
                      />
                    </div>
                  </div>

                  <CustomizedSelect
                    title={"Venue"}
                    options={VENUES.map((venue) => ({
                      label: venue,
                      value: venue,
                    }))}
                    value={filters.venue || "all"}
                    onChange={(value) => handleFilterChange("venue", value)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
