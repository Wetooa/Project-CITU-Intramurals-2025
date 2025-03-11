'use client'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, {useEffect} from "react";

interface CustomizedSelectProps {
    title: string;
    options: Options[];
    value: string; // Accept value from parent
    onChange: (value: string) => void; // Callback to update the parent state
}

interface Options {
    label?: string;
    value: string;
}

export default function CustomizedSelect({title, options, value, onChange}: CustomizedSelectProps) {
    useEffect(() => {
        console.log(value);
    }, [value]);

    return (
        <div className='flex flex-col gap-2 items-center justify-center'>
            <div className='flex flex-row justify-between pl-2 pr-2 w-full items-center'>
                <p className="font-bold">{title}</p>
                <p
                    className='text-coral_red text-xs font-bold self-start hover:scale-105 active:opacity-80 cursor-pointer transition-all'
                    onClick={() => onChange("")} // Reset filter when clicked
                >
                    Clear Filter
                </p>
            </div>
            <Select value={value || ""} onValueChange={onChange}>
                <SelectTrigger className="w-[280px] md:w-[320px]">
                    <SelectValue placeholder="Select an option"/>
                </SelectTrigger>
                <SelectContent>
                    {options.map(({value, label}, index) => (
                        <SelectItem key={index} value={value}>{label ?? value}</SelectItem>
                    ))}

                </SelectContent>
            </Select>
        </div>
    );
}
