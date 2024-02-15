import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FaCodePullRequest, FaUserTie, FaUserGear, FaUserPen, FaRegCircleCheck, FaRegCircleXmark, FaMagnifyingGlass, FaIdBadge } from "react-icons/fa6";
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import moment from "moment";
import { Input } from './ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from './ui/label';
import { DatePickerWithRange } from './Dashboard';
import { CustomDatePicker } from './customs/CustomDatePicker/CustomDatePicker';
import { CustomDatePickerWithRange } from './customs/CustomCalendar/CustomDatePickerWithRange/CustomDatePickerWithRange';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { REQUEST_DATA } from '@/Data/dummy.data';
import { REQUEST_SERVICE_CONSTANTS } from '@/constants/app.constants';
import ServiceRequestCard from './request/ServiceRequestCard';
import { CreateRequestDialog } from './request/CreateRequestDialog';



type ProcessStatusTypes = "ON_GOING" | "PENDING" | "COMPLETED" | "REJECTED";
const ProcessStatusColor: { [key in ProcessStatusTypes]: string } = {
    PENDING: "bg-yellow-300 dark:ring-yellow-900 dark:bg-yellow-900",
    ON_GOING: "bg-orange-300 dark:ring-orange-900 dark:bg-orange-900",
    COMPLETED: "bg-green-300 dark:ring-green-900 dark:bg-green-900",
    REJECTED: "bg-red-300 dark:ring-red-900 dark:bg-red-900",
}

export type ServiceRequestCardTypes = {
    requestId: number;
    requestNo: string;
    title: string;
    isPriority: boolean;
    createdAt: string;
    problemType: string;
    serviceType: string;
    completedAt: string | undefined;
    requestBy: string;
    requesterDepartment: string;
    requestDetails: string;
    process: {
        details: {
            status: ProcessStatusTypes;
        },
        unitApproval: {
            status: ProcessStatusTypes;
            assignedPerson: string
        },
        recommendingApproval: {
            status: ProcessStatusTypes;
            assignedPerson: string
        },
        serviceApproval: {
            status: ProcessStatusTypes;
            assignedPerson: string;
        },
        serviceAssigned: {
            status: ProcessStatusTypes;
            assignedPerson: string;
        },
        completion: {
            status: ProcessStatusTypes;
        },
    }
}

moment.updateLocale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: 'a few seconds',
        ss: '%d seconds',
        m: "a minute",
        mm: "%d minutes",
        h: "1 hour ago", //this is the setting that you need to change
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        w: "a week",
        ww: "%d weeks",
        M: "1 month ago", //change this for month
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }
});

const RequestPage = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 1),
    })

    const requests: ServiceRequestCardTypes[] = REQUEST_DATA;

    const getColumns = (columnIndex: number) => {
        return requests.filter((item, index) => index % 3 === columnIndex);
    }

    return (
        <section>
            <div className="container max-w-screen-2xl space-y-4 p-8 pt-8">
                <div className="w-full flex items-center justify-between pb-5 border-b">
                    <h2 className="text-4xl font-bold tracking-tight">Requests</h2>
                    <div className="flex items-center space-x-2">
                        <CreateRequestDialog />
                    </div>
                </div>
                <div className="my-2">
                    <div className="flex items-end gap-4">
                        <div className="grid max-w-sm items-center gap-1.5">
                            <Label htmlFor="serviceType">Service Type</Label>
                            <Select>
                                <SelectTrigger id="serviceType" name="serviceType" className="w-[250px]">
                                    <SelectValue placeholder="Select Service Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Service Type</SelectLabel>
                                        <SelectItem value="Management Information System">Management Information System</SelectItem>
                                        <SelectItem value="Building and Grounds Services">Building and Grounds Services</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid max-w-sm items-center gap-1.5">
                            <Label htmlFor="searchKeywordType">Search Keyword Type</Label>
                            <Select>
                                <SelectTrigger id="searchKeywordType" name="searchKeywordType" className="w-[180px]">
                                    <SelectValue placeholder="Select Keyword Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select Keyword Type</SelectLabel>
                                        <SelectItem value="Request Number">Request Number</SelectItem>
                                        <SelectItem value="Request By">Request By</SelectItem>
                                        <SelectItem value="Request Title">Request Title</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-[300px] max-w-sm items-center gap-1.5">
                            <Label htmlFor="picture">Search Keyword</Label>
                            <Input type="text" name="searchKeyword" placeholder="Please enter your search keyword." />
                        </div>
                        <div className="grid max-w-sm items-center gap-1.5">
                            <Label htmlFor="picture">Request Status</Label>
                            <Select>
                                <SelectTrigger id="searchType" name="searchType" className="w-[180px]">
                                    <SelectValue placeholder="Select Request Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Request Status</SelectLabel>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="On Going">On Going</SelectItem>
                                        <SelectItem value="Rejected">Rejected</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid max-w-sm items-center gap-1.5">
                            <Label htmlFor="picture">Request Date Ranges</Label>
                            <CustomDatePickerWithRange date={date} setDate={setDate} />
                        </div>
                        <Button className="flex items-center gap-2"><FaMagnifyingGlass /> Search</Button>
                    </div>
                </div>
                <div className="mx-auto grid grid-cols-3 gap-2 w-100">
                    {[
                        getColumns(0),
                        getColumns(1),
                        getColumns(2),
                    ].map((requests, index) =>
                        <div key={index} className="flex flex-col gap-2">
                            {
                                requests.map((item: ServiceRequestCardTypes) => (
                                    <ServiceRequestCard props={item} />
                                ))
                            }
                        </div>)
                    }



                </div>
            </div>
            <div className="mb-5">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    )
}

export default RequestPage