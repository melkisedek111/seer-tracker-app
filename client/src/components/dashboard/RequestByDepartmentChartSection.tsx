import { AreaChart, BarChart, Flex, Switch, Title } from "@tremor/react";
import { CardContent, CardHeader, CardTitle, Card } from "@/components/ui/card";




const RequestByDepartmentChartSection = () => {
    const chartdata2 = [
        {
            name: "Topic 1",
            "Group A": 890,
            "Group B": 338,
            "Group C": 538,
            "Group D": 396,
            "Group E": 138,
            "Group F": 436,
        },
        {
            name: "Topic 2",
            "Group A": 289,
            "Group B": 233,
            "Group C": 253,
            "Group D": 333,
            "Group E": 133,
            "Group F": 533,
        },
        {
            name: "Topic 3",
            "Group A": 380,
            "Group B": 535,
            "Group C": 352,
            "Group D": 718,
            "Group E": 539,
            "Group F": 234,
        },
        {
            name: "Topic 4",
            "Group A": 90,
            "Group B": 98,
            "Group C": 28,
            "Group D": 33,
            "Group E": 61,
            "Group F": 53,
        },
    ];

    const valueFormatter = (number: number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                    <h2 className="font-semibold leading-none tracking-tight">Request by Departments</h2>
                </div>
            </CardHeader>
            <CardContent>
                <BarChart
                    className="mt-6"
                    data={chartdata2}
                    index="name"
                    categories={["Group A", "Group B", "Group C", "Group D", "Group E", "Group F"]}
                    colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
                    valueFormatter={valueFormatter}
                    yAxisWidth={48}
                />
            </CardContent>
        </Card>
    )

}


export default RequestByDepartmentChartSection;