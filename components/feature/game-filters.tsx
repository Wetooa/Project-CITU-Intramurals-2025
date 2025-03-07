import React from "react";
import CustomizedSelect from "@/components/shared/customized-select";
import Image from 'next/image'
import {games, teams} from "@/types/constant";


const SWORD_ICON = "/sword_icon.svg"

export default function GameFiltersSchedule() {

    return (
        <>
            <div
                className="w-auto p-5 flex flex col rounded-2xl justify-center items-center text-white bg-mocha">
                <div className="flex justify-between w-full p-4 gap-2">
                    <div className='flex flex-col gap-7 items-center justify-center'>
                        <div className='flex md:flex-row flex-col gap-5 justify-between w-full items-center'>
                            <CustomizedSelect title={"Game"} options={games}/>
                            <CustomizedSelect title={"Date"} options={games}/>
                        </div>
                        <div className='flex md:flex-row flex-col gap-5 justify-between w-full items-center'>
                            <CustomizedSelect title={"Team"} options={teams}/>
                            <Image
                                src={SWORD_ICON}
                                width={30}
                                height={30}
                                alt="Sword_Icon"
                                className='md:self-end md:bottom-2 relative self-center bottom-0'
                            />
                            <CustomizedSelect title={"Rival Team"} options={games}/>
                        </div>
                    </div>

                </div>


            </div>
        </>

    )

}