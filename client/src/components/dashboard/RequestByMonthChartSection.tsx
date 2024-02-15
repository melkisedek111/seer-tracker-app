import { AreaChart, BarChart, Flex, LineChart, Switch, Title } from "@tremor/react";
import { CardContent, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const RequestByMonthChartSection = () => {
    const [value, setValue] = useState();
    const chartdata2 = [
        {
            date: "Jan 23",
            "2022": 45,
            "2023": 78,
        },
        {
            date: "Feb 23",
            "2022": 52,
            "2023": 71,
        },
        {
            date: "Mar 23",
            "2022": 48,
            "2023": 80,
        },
        {
            date: "Apr 23",
            "2022": 61,
            "2023": 65,
        },
        {
            date: "May 23",
            "2022": 55,
            "2023": 58,
        },
        {
            date: "Jun 23",
            "2022": 67,
            "2023": 62,
        },
        {
            date: "Jul 23",
            "2022": 60,
            "2023": 54,
        },
        {
            date: "Aug 23",
            "2022": 72,
            "2023": 49,
        },
        {
            date: "Sep 23",
            "2022": 65,
            "2023": 52,
        },
        {
            date: "Oct 23",
            "2022": 68,
            "2023": null,
        },
        {
            date: "Nov 23",
            "2022": 74,
            "2023": null,
        },
        {
            date: "Dec 23",
            "2022": 71,
            "2023": null,
        },
    ];

    const valueFormatter = (number: number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;
    return (
        <Card>
            <CardHeader>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                        <h2 className="font-semibold leading-none tracking-tight">Average Requests</h2>
                    </div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a format" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Formats</SelectLabel>
                                <SelectItem value="Day">Day</SelectItem>
                                <SelectItem value="Month">Month</SelectItem>
                                <SelectItem value="Year">Year</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <LineChart
                    className="h-72 mt-4"
                    data={chartdata2}
                    index="date"
                    categories={["2022", "2023"]}
                    colors={["neutral", "indigo"]}
                    yAxisWidth={30}
                    onValueChange={(v: any) => setValue(v)}
                    connectNulls={true}
                />
            </CardContent>
        </Card>
    )

}


export default RequestByMonthChartSection;




