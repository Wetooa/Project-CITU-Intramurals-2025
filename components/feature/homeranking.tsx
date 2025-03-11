import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export function HomeRanking({
  first,
  second,
  third,
}: {
  first: string;
  second: string;
  third: string;
}) {
  return (
    <div className="md:flex flex-col w-1/5 h-full p-6 hidden">
      <span className="font-bold text-2xl">Departmental Rankings </span>
      <Separator
        className="mt-4 opacity-50"
        orientation="horizontal"
      ></Separator>
      <span className="font-bold text-xl mt-4 hover:animate-pulse">
        1 {first}
      </span>
      <Separator
        className="mt-4 opacity-50"
        orientation="horizontal"
      ></Separator>
      <span className="font-bold text-xl mt-4 hover:animate-pulse">
        2 {second}
      </span>
      <Separator
        className="mt-4 opacity-50"
        orientation="horizontal"
      ></Separator>
      <span className="font-bold text-xl mt-4 hover:animate-pulse">
        3 {third}
      </span>
      <Separator
        className="mt-4 opacity-50"
        orientation="horizontal"
      ></Separator>
      <Link
        href="/leaderboard"
        className="font-light text-lg text-blue-200 mt-4"
      >
        View Full Rankings {">"}
      </Link>
    </div>
  );
}

export function HomeRankingSkeleton() {
  return (
    <div className="md:flex flex-col w-1/5 h-full p-6 hidden">
      <span className="font-bold text-2xl">Departmental Rankings </span>
      <Separator
        className="mt-4 opacity-50"
        orientation="horizontal"
      ></Separator>
      <Skeleton className="font-bold w-full h-12 text-xl mt-4 hover:animate-pulse"></Skeleton>
      <Separator
        className="mt-4 opacity-50"
        orientation="horizontal"
      ></Separator>
      <Skeleton className="font-bold w-full h-12 text-xl mt-4 hover:animate-pulse"></Skeleton>
      <Separator
        className="mt-4 opacity-50"
        orientation="horizontal"
      ></Separator>
      <Skeleton className="font-bold w-full h-12 text-xl mt-4 hover:animate-pulse"></Skeleton>
      <Separator
        className="mt-4 opacity-50"
        orientation="horizontal"
      ></Separator>
      <Link
        href="/leaderboard"
        className="font-light text-lg text-blue-200 mt-4"
      >
        View Full Rankings {">"}
      </Link>
    </div>
  );
}
