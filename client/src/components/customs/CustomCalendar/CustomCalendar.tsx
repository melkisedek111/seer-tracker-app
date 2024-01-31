import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from "@radix-ui/react-icons"
import { FaRegCalendarDays } from "react-icons/fa6";

import { cn } from "@/lib/utils"
import Calendar from "react-calendar";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import "./customCalendar.css";


const CustomCalendar = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    function isTileDisabled({ activeStartDate, date, view }: { activeStartDate: any, date: any, view: any }) {
        return date.getMonth() !== activeStartDate.getMonth();
    }
    const [value, onChange] = React.useState(new Date());
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>

                    <h2 className="font-semibold leading-none tracking-tight">Request Calendar</h2>
                </div>
            </CardHeader>
            <CardContent>
                <Calendar
                    formatShortWeekday={(locale, date) => {
                        const [getWeekDays] = date.toString().split(" ");
                        return getWeekDays[0];
                    }}
                    tileDisabled={isTileDisabled}
                    tileClassName={({ date, view }) => date.getDay() === 0 ? "tile-sunday" : ""}
                    value={value}
                    prevLabel={<ArrowLeftIcon />}
                    nextLabel={<ArrowRightIcon />}
                    next2Label={null}
                    prev2Label={null}
                />
            </CardContent>
        </Card>

    )
}

export default CustomCalendar;