// import GameFiltersSchedule from "@/components/feature/game-filters";
import { Leaderboard } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LeaderBoardScreen() {
  const Sports = [
    { value: "BB", label: "BASKETBALL" },
    { value: "VB", label: "VOLLEYBALL" },
    { value: "BM", label: "BADMINTON" },
    { value: "TT", label: "TABLE TENNIS" },
    { value: "Chess", label: "CHESS" },
  ];
  const highlightStyle =
    "flex flex-col gap-5  pt-5 rounded-3xl min-w-64 items-center ";
  const highlightTitle =
    "absolute top-[-1rem]  left-1/2 transform -translate-x-1/2 text-center font-bold pt-1 px-10 md:px-2 text-black bg-white border-2 border-white rounded-full w-48 h-10 whitespace-nowrap overflow-hidden";
  const highlightTeam =
    "rounded-xl bg-[#FF212140] md:h-32 bottom-0 py-8 min-w-64 ";
  const highlightImage = "rounded-full w-24 h-24 object-cover md:mb-10";

  return (
    <>
      <div className="w-full  h-full flex flex-col justify-center items-center px-5p ">
        <div className="w-full text-center md:text-left">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  text-white font-bold pt-10">
            LEADERBOARD
          </p>
        </div>
        <div className="text-center text-white  ">
          <p className=" py-20p md:py-10 text-2xl md:text-4xl font-bold">
            Highlights
          </p>
          <div className="flex flex-col md:flex-row gap-5 overflow-y-auto md:px-20 max-h-[35rem] md:overflow-y-hidden [&::-webkit-scrollbar]:hidden">
            <div className={`${highlightStyle}`}>
              <img
                className={`${highlightImage}`}
                src="../public/img/prac.png"
              ></img>
              <div className="relative">
                <p className={`${highlightTitle}`}>Biggest Winner Today</p>
                <div className={`${highlightTeam}`}>
                  <p className="font-bold text-xl">Leo</p>
                  <p>8 Wins </p>
                </div>
              </div>
            </div>
            <div className={`${highlightStyle}`}>
              <img className={`${highlightImage}`}></img>
              <div className="relative">
                <p className={`${highlightTitle}`}>Most Losses Today</p>
                <div className={`${highlightTeam}`}>
                  <p className="font-bold text-xl">Leo</p>
                  <p>3 Losses </p>
                </div>
              </div>
            </div>
            <div className={`${highlightStyle}`}>
              <img className={`${highlightImage}`}></img>
              <div className="relative">
                <p className={`${highlightTitle}`}>Biggest Mover - 1st</p>
                <div className={`${highlightTeam}`}>
                  <p className="font-bold text-xl">Leo</p>
                  <p>#39 → #8 </p>
                </div>
              </div>
            </div>
            <div className={`${highlightStyle}`}>
              <img className={`${highlightImage}`}></img>
              <div className="relative">
                <p className={`${highlightTitle}`}>Biggest Mover - 2nd</p>
                <div className={`${highlightTeam}`}>
                  <p className="font-bold text-xl">Leo</p>
                  <p>#39 → #8 </p>
                </div>
              </div>
            </div>
            <div className={`${highlightStyle}`}>
              <img className={`${highlightImage}`}></img>
              <div className="relative">
                <p className={`${highlightTitle}`}>Biggest Mover - 3rd</p>
                <div className={`${highlightTeam}`}>
                  <p className="font-bold text-xl">Leo</p>
                  <p>#39 → #8 </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-white gap-3 text-center mt-16 px-10">
        <div className="flex flex-row justify-center items-center gap-5 md:hidden">
          <Button variant="link" className="text-2xl">
            OverAll
          </Button>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select A Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sports</SelectLabel>
                {Sports.map((sport) => (
                  <SelectItem key={sport.value} value={sport.value}>
                    {sport.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-full flex-row gap-5 px-10">
          <div className="md:flex flex-col w-1/4 gap-5 items-start pl-10 hidden">
            <Button variant="link" className="text-4xl font-bold">
              Overall
            </Button>
            <p className="text-4xl font-bold pl-5">Sports</p>
            {Sports.map((sport) => (
              <Button
                variant="link"
                key={sport.value}
                value={sport.value}
                className="text-2xl font-bold"
              >
                {sport.label}
              </Button>
            ))}
          </div>
          <div className="w-full bg-[#242322] rounded-3xl py-7">
            <p className="font-bold pb-5 md:text-left md:text-3xl md:pl-5">
              Team Rankings
            </p>
            <Table>
              <TableHeader className="text-2xl font-bold bg-[#393837]">
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="text-right pr-10">Win/Loss</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* format:
         {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))} */}
                <TableRow className="h-96"></TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
