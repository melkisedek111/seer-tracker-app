


import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ChatBubbleIcon, FileTextIcon, PersonIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Calendar } from '../components/ui/calendar'
import CustomCalendar from '../components/customs/CustomCalendar/CustomCalendar'
import RequestByDepartmentChartSection from "./dashboard/RequestByDepartmentChartSection"
import RequestByMonthChartSection from "./dashboard/RequestByMonthChartSection"
import LatestRequestSection from "./dashboard/LatestRequestSection"

export function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}


export function TabsDemo() {
    return (
        <Tabs defaultValue="all" className="w-[600px]">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="font-bold">All</TabsTrigger>
                <TabsTrigger value="current" className="font-bold">Current</TabsTrigger>
                <TabsTrigger value="pending" className="font-bold">Pending</TabsTrigger>
                <TabsTrigger value="denied" className="font-bold">Denied</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}


type TRequestType = {
    id?: number;
    title: string;
    value: string;
    subContent: string;
    icon: React.ReactNode;
}

const RequestTypeCard = ({ id, title, value, subContent, icon }: TRequestType) => {
    return (
        <Card className="w-full">
            <CardContent className=" p-5">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="tracking-tight text-sm font-medium">{title}</h3>
                    {icon}
                </div>
                <div className="">
                    <div className="text-2xl font-bold">{value}</div>
                    <p className="text-xs text-muted-foreground">{subContent}</p>
                </div>
            </CardContent>
        </Card>
    )
}


function Dashboard() {

    const requestTypes: TRequestType[] = [
        {
            id: 1,
            title: "Total Request",
            value: "1,230",
            subContent: "+20.1% from last month",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>

        },
        {
            id: 2,
            title: "Today's Request",
            value: "20",
            subContent: "+11.1% from yesterday",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>

        },
        {
            id: 3,
            title: "Current Priority",
            value: "13",
            subContent: "from 3 different department",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>

        },
        {
            id: 4,
            title: "Total Approved",
            value: "1,230",
            subContent: "+18.1% from last month",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
            </svg>

        },
    ]

    return (
        <section>
            <div className="container max-w-screen-2xl space-y-4 p-8 pt-8">
                <div className="w-full flex items-center justify-between pb-5 border-b">
                    <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
                    <div className="flex items-center space-x-2">
                        <DatePickerWithRange />
                    </div>
                </div>
                <div>
                    <TabsDemo />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 flex flex-col gap-4">
                        <div className="grid grid-cols-4 gap-4">
                            {
                                requestTypes.map((item: TRequestType) => (
                                    <RequestTypeCard title={item.title} value={item.value} subContent={item.subContent} icon={item.icon} />
                                ))
                            }
                        </div>
                        <RequestByDepartmentChartSection />
                        <RequestByMonthChartSection />
                    </div>
                    <div className="col-span-1 flex flex-col gap-4">
                        <CustomCalendar />
                        <LatestRequestSection />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard


