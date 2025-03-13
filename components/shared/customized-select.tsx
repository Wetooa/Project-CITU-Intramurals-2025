"use client"
import {cn} from "@/lib/utils"
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

interface Option {
    value: string
    label: string
}

interface CustomizedSelectProps {
    title: string
    options: Option[]
    value: string
    onChange: (value: string) => void
}

export default function CustomizedSelect({title, options, value, onChange}: CustomizedSelectProps) {
    return (
        <div className="space-y-2 w-full">
            <label className="text-sm font-medium text-gray-300">{title}</label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger
                    className={cn(
                        "w-full bg-black/30 border-gray-700 text-gray-200 hover:bg-black/50 transition-colors",
                        "focus:ring-maroon focus:ring-opacity-50 focus:border-maroon",
                        "h-11 rounded-lg",
                    )}
                >
                    <SelectValue placeholder={`Select ${title}`}/>
                </SelectTrigger>
                <SelectContent className="bg-night_black border-gray-700 text-gray-200">
                    <SelectGroup>
                        <SelectItem value="all" className="focus:bg-maroon/20 focus:text-white">
                            All {title}s
                        </SelectItem>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}
                                        className="focus:bg-maroon/20 focus:text-white">
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

