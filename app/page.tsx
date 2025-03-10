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
        <div className="bg-[#242322] rounded-tr-lg rounded-tl-lg p-2 w-full h-full"></div>
      </div>
      <div className="flex flex-col w-1/5 h-full"></div>
    </div>
  );
}
