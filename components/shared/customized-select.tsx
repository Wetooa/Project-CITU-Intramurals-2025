'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, {useEffect, useState} from "react";

interface CustomizedSelectProps {
    title: string;
    options: string[];
}

export default function CustomizedSelect({ title, options }: CustomizedSelectProps) {
    const [selectedOption, setSelectedOption] = useState<string >("");  // Use undefined instead of null

    useEffect(() => {
        console.log(selectedOption)
    }, [selectedOption]);
    return (
        <div className='flex flex-col gap-2 items-center justify-center'>
            <div className='flex flex-row justify-between pl-2 pr-2 w-full items-center'>
                <p className="font-bold">{title}</p>
                <p
                    className='text-coral_red text-xs font-bold self-start hover:scale-105 active:opacity-80 cursor-pointer transition-all'
                    onClick={() => setSelectedOption("")}  // Set to undefined instead of null
                >
                    Clear Filter
                </p>
            </div>
            <Select value={selectedOption || ""} onValueChange={setSelectedOption}>
                <SelectTrigger className="w-[280px] md:w-[320px]">
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option, index) => (
                        <SelectItem key={index} value={option}>{option}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
