"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// async function fetchBracket() {
//   const response = await fetch(`/api/bracket`);
//   const data = await response.json();
//   return data.matches;
// }

export default function BracketScreen() {
  // const [selectedBracket, setSelectedBracket] = useState("Basketball 3x3");
  //
  // const { data, isLoading } = useQuery({
  //   queryKey: ["bracket"],
  //   queryFn: () => fetchBracket(),
  //   refetchIntervalInBackground: false,
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  // });
  //
  // const [match, setMatch] = useState<Matches>();
  //
  // useEffect(() => {
  //   if (!data) return;
  //   setMatch(data[selectedBracket]);
  // }, [selectedBracket, data]);

  return (
    <div className="p-6 flex flex-col items-center justify-center w-screen h-screen">
      <span className="md:text-4xl text-xl font-bold align-middle text-center">
        There are no bracket matches scheduled for today. Round-robin matches
        are still in progress.
      </span>
      <motion.div
        animate={{ y: [0, -5, 0] }} // Moves up and down
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/IMG_5077.PNG"
          width={500}
          height={800}
          alt="404 leo"
        ></Image>
      </motion.div>
    </div>
  );

  //   return (
  //     <div className="flex items-center pl-12 pr-12 md:flex-row flex-col gap-6 md:gap-0 h-screen w-full ">
  //       <div className="md:hidden">
  //         <CustomizedSelect
  //           title={"Brackets"}
  //           options={TEAMS.map((team) => ({
  //             label: team,
  //             value: team,
  //           }))}
  //           value={selectedBracket}
  //           onChange={(value) => setSelectedBracket(value)}
  //         />
  //       </div>
  //       <div className="h-screen w-[400px] md:flex  p-6  pl-10  justify-start bg-phantom_ash flex-col hidden mb-6 mt-6 overflow-y-auto">
  //         <p className="2xl:text-6xl font-bold self-start md:text-xl lg:text-3xl">
  //           BRACKET
  //         </p>
  //
  //         <p className="text-2xl font-bold self-start mt-10">SPORTS</p>
  //         <div className="mt-5 flex flex-col gap-2">
  //           {GAMES.slice(0, 16).map((game, index) => (
  //             <p
  //               key={index}
  //               className={`2xl:text-xl md:text-md   cursor-pointer hover:scale-105 transition-all font-bold ${
  //                 selectedBracket === game ? "text-red-500" : "text-gray-200"
  //               }`}
  //               onClick={() => setSelectedBracket(game)}
  //             >
  //               {game.toUpperCase()}
  //             </p>
  //           ))}
  //         </div>
  //         <p className="text-2xl font-bold self-start mt-10">ESPORTS</p>
  //         <div className="mt-5 flex flex-col gap-2">
  //           {GAMES.slice(16).map((game, index) => (
  //             <p
  //               key={index}
  //               className={`2xl:text-xl md:text-md   cursor-pointer hover:scale-105 transition-all font-bold ${
  //                 selectedBracket === game ? "text-red-500" : "text-gray-200"
  //               }`}
  //               onClick={() => setSelectedBracket(game)}
  //             >
  //               {game.toUpperCase()}
  //             </p>
  //           ))}
  //         </div>
  //       </div>
  //
  //       {!isLoading && match && (
  //         <div className=" md:w-[2000px] w-full overflow-x-auto h-full flex justify-center items-center">
  //           <BracketGenerator matches={match}></BracketGenerator>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }
  //
  // export function BracketGeneratorRound({}: { round: Matches["rounds"] }) {}
  //
  // export function BracketGenerator({ matches }: { matches: Matches }) {
  //   return (
  //     <div className="w-max  h-full overflow-x-auto overflow-y-auto gap-5 flex flex-nowrap pl-12 pr-12">
  //       {matches.rounds.map((round) => (
  //         <div key={round.roundId} className="flex flex-col w-fit h-full gap-5">
  //           <div className="bg-[#242322] rounded-sm w-full h-5 p-4 flex justify-center items-center">
  //             <span>{round.roundId}</span>
  //           </div>
  //           <div className="w-[300px] md:h-[1000px] h-[500px] md:gap-16 gap-8 flex items-center justify-center flex-col">
  //             {round.seeds.map((seed) => (
  //               <div
  //                 key={round.roundId}
  //                 className="bg-[#242322] w-full h-28 flex flex-col"
  //               >
  //                 <div
  //                   className={`w-full h-1/2 flex items-center justify-center ${
  //                     seed.winner == seed.team1Id
  //                       ? "border-green-400 border-4"
  //                       : ""
  //                   }`}
  //                 >
  //                   <div className="w-1/3 h-full flex bg-[#302F2E] justify-center items-center">
  //                     <Image
  //                       width={50}
  //                       height={50}
  //                       src={teamLogos[seed.team1Id]}
  //                       alt={seed.team1Id}
  //                     ></Image>
  //                   </div>
  //
  //                   <div className="font-bold  h-full w-full justify-center items-center flex text-xl">
  //                     {seed.team1Id}
  //                   </div>
  //                   <div className="w-1/3 font-bold h-full flex justify-center items-center">
  //                     {seed.team1Id}
  //                   </div>
  //                 </div>
  //                 <div
  //                   className={`w-full h-1/2 flex items-center justify-center ${
  //                     seed.winner == seed.team2Id
  //                       ? "border-green-400 border-4"
  //                       : ""
  //                   }`}
  //                 >
  //                   <div className="w-1/3 h-full flex bg-[#302F2E] justify-center items-center">
  //                     <Image
  //                       width={50}
  //                       height={50}
  //                       src={teamLogos[seed.team2Id]}
  //                       alt={seed.team2Id}
  //                     ></Image>
  //                   </div>
  //
  //                   <div className="font-bold h-full w-full justify-center items-center flex text-xl">
  //                     {seed.team2Id}
  //                   </div>
  //                   <div className="w-1/3 font-bold h-full flex justify-center items-center">
  //                     {seed.team2Id}
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
}
