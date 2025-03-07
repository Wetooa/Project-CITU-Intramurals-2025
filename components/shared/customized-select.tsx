'use client'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, {useEffect} from "react";


interface CustomizedSelectProps {
    title: string;
    options : string []
}


export default function CustomizedSelect({title, options}: CustomizedSelectProps){
    const [selectedOption, setSelectedOption] = React.useState<string | null>(null)

    return(
        <>
            <div className='flex flex-col gap-2 items-center justify-center'>
                <div className='flex flex-row justify-between pl-2 pr-2 w-full items-center'>
                    <p className="font-bold">{title}</p>
                    <p className='text-coral_red text-xs font-bold  self-start hover:scale-105 cursor-pointer transition-all' onClick={() => console.log(selectedOption)}>
                        Clear Filter
                    </p>
                </div>
                <Select value={selectedOption || undefined} onValueChange={setSelectedOption}>
                    <SelectTrigger className="w-[280px] md:[320px]">
                        <SelectValue placeholder="Select an option"/>
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((options,index) =>
                            <SelectItem key = {index} value={options}>{options}</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
        </>


    )

}