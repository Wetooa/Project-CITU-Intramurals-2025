import {motion} from "framer-motion";
import Image from "next/image";


export default function NoMatchFound() {

    return (
        <div
            className="bg-[#242322] flex flex-col rounded-tr-lg rounded-tl-lg p-2 w-full h-full gap-6 overflow-y-auto justify-center items-center">
            <motion.div
                animate={{y: [0, -5, 0]}} // Moves up and down
                transition={{duration: 1.5, repeat: Infinity, ease: "easeInOut"}}
            >
                <Image src="/leo_not_found.PNG" width={300} height={300} alt="Leo 404"/>
            </motion.div>
            <p className="text-4xl animate-pulse font-bold mt-10">No matches found!</p>;
        </div>
    )

}

export function NoMatchFoundWithoutBackground() {

    return (
        <div
            className=" flex flex-col rounded-tr-lg rounded-tl-lg p-2 w-auto h-auto gap-1 overflow-y-auto justify-center items-center">
            <motion.div
                animate={{y: [0, -5, 0]}} // Moves up and down
                transition={{duration: 1.5, repeat: Infinity, ease: "easeInOut"}}
            >
                <Image src="/leo_not_found.PNG" width={300} height={300} alt="Leo 404"/>
            </motion.div>
            <p className="text-4xl animate-pulse font-bold mt-10">No matches found!</p>
        </div>
    )
}