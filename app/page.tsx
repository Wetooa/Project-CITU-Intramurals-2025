import { auth } from "@/auth";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex pl-12 pr-12 gap-6 w-full h-screen">
      <div className="flex flex-col bg-[#161616] w-96 h-full"></div>
      <div className="flex flex-col w-1/2 gap-4 h-full">
        <div className="bg-[#242322] rounded-br-lg rounded-bl-lg w-full flex items-center p-6 h-32">
          <span className="text-4xl font-bold">MATCH TODAY</span>
        </div>
        <div className="bg-[#242322] rounded-tr-lg rounded-tl-lg p-2 w-full h-full">
          <div className="w-full h-28 bg-[#302F2E] rounded-md border-white border border-opacity-5 flex flex-col">
            <div className="w-full h-full flex items-center justify-evenly p-6">
              <span className="text-2xl font-bold">10:00 PM</span>

              <div className="flex items-center justify-evenly w-1/3 h-full">
                <div className="flex items-center gap-2">
                  <div className="w-[30px] h-[30px] rounded-full bg-white"></div>
                  <span className="text-2xl font-bold">LEO</span>
                </div>

                <span className="text-lg text-[#CCCCCC] font-bold text-opacity-25">
                  0 <span className="text-opacity-50">/</span> 0
                </span>

                <div className="flex items-center gap-2">
                  <div className="w-[30px] h-[30px] rounded-full bg-white"></div>
                  <span className="text-2xl font-bold">LEO</span>
                </div>
              </div>

              <span className="text-2xl font-bold">BASKETBALL</span>
            </div>

            <div className="w-full h-1/2 bg-[#2B2A29]  flex items-center justify-center">
              <span className="text-sm text-[#CCCCCC] text-opacity-50 font-bold">
                Game 1 - Finals
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/5 h-full"></div>
    </div>
  );
}
