import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function HomeRanking({
  first,
  second,
  third,
}: {
  first: String;
  second: String;
  third: String;
}) {
  return (
    <div className="flex flex-col w-1/5 h-full p-6">
      <span className="font-bold text-2xl">Departmental Rankings </span>
      <Separator
        className="mt-4 opacity-50"
        orientation="horizontal"
      ></Separator>
      <span className="font-bold text-xl mt-4">1 {first}</span>
      <Separator
        className="mt-4 opacity-50"
        orientation="horizontal"
      ></Separator>
      <span className="font-bold text-xl mt-4">2 {second}</span>
      <Separator
        className="mt-4 opacity-50"
        orientation="horizontal"
      ></Separator>
      <span className="font-bold text-xl mt-4">3 {third}</span>
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
