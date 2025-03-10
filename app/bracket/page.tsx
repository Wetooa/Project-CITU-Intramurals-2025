"use client"
import React, {useState} from "react";
import CustomizedSelect from "@/components/shared/customized-select";
import {teams} from "@/types/constant";


export default function BracketScreen() {
    const [selectBracket, setSelectedBracket] = useState("");
    return (
        <>
            <div className='flex items-center justify-center mt-10'>
                <CustomizedSelect title={"Brackets"} options={teams} value={selectBracket}
                                  onChange={(value) => setSelectedBracket(value)}></CustomizedSelect>
            </div>


        </>
    )

}