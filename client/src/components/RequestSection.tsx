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
import { CreateRequestDialog } from './CreateRequestDialog';
import { REQUEST_DATA } from '@/Data/dummy.data';
import { REQUEST_SERVICE_CONSTANTS } from '@/constants/app.constants';



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

const ServiceRequestCard = ({ props }: { props: ServiceRequestCardTypes }): React.ReactElement => {

    const convertedCreatedAt = moment(new Date(props.createdAt).getTime());
    const convertedCompletedAt = props.completedAt ? moment(props.completedAt) : undefined;
    return (
        <Card className="w-full max-w-[490px]">
            <CardHeader className="space-y-0">
                <h2 className="text-1xl font-bold tracking-tight">{props.title}</h2>
                <p className="text-sm text-muted-foreground">{convertedCreatedAt.fromNow()}</p>
            </CardHeader>
            <CardContent>
                <div className="mb-5">
                    <h2 className="text-2xl text-center font-bold tracking-tight">{props.problemType}</h2>
                    <div className="flex items-center justify-around">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Start Date Time</p>
                            <h2 className="text-sm font-bold tracking-tight">{convertedCreatedAt.format("MM/DD/YYYY h:mmA")}</h2>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">End Date Time</p>
                            <h2 className="text-sm font-bold tracking-tight">{convertedCompletedAt ? convertedCompletedAt.format("MM/DD/YYYY h:mmA") : "Processing"}</h2>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mb-2">
                        <p className="text-sm text-muted-foreground pb-1">Request By</p>
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${props.requestBy}`} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h2 className="text-1xl font-bold tracking-tight">{props.requestBy}</h2>
                        </div>
                    </div>
                    <div className="mb-2">
                        <p className="text-sm text-muted-foreground">Department or Unit</p>
                        <h2 className="text-1xl font-bold tracking-tight">{props.requesterDepartment}</h2>
                    </div>
                    <div className="mb-2">
                        <p className="text-sm text-muted-foreground">Request ID No</p>
                        <h2 className="text-1xl font-bold tracking-tight">{props.requestNo}</h2>
                    </div>
                    <div className="mb-2">
                        <p className="text-sm text-muted-foreground">Service Type</p>
                        <h2 className="text-1xl font-bold tracking-tight">{props.serviceType}</h2>
                    </div>
                    <div className="mb-2">
                        <p className="text-sm text-muted-foreground">Request Details/Description of Work</p>
                        <p className="text-md text-justify text-orange-400 my-4">{props.requestDetails}</p>
                    </div>
                    <div className="mb-7">
                        <p className="text-sm text-muted-foreground">Request Process</p>
                        {
                            props.serviceType === REQUEST_SERVICE_CONSTANTS.MANAGEMENT_INFORMATION_SYSTEM ?
                                (
                                    <div className="pl-5 mt-2">
                                        <ol className="relative border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                            <li className="mb-7 ms-6">
                                                <span className={`absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white ${ProcessStatusColor[props.process.details.status]}`}>
                                                    <FaCodePullRequest />
                                                </span>
                                                <h3 className="font-medium leading-tight">Request Details</h3>
                                                <p className="text-sm">Filling up the request details</p>
                                            </li>
                                            <li className="mb-7 ms-6">
                                                <span className={`absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white ${ProcessStatusColor[props.process.unitApproval.status]}`}>
                                                    <FaUserTie />
                                                </span>
                                                <h3 className="font-medium leading-tight text-gray-500">Unit Approval</h3>
                                                <p className="text-sm">
                                                    {props.process.unitApproval.status === "PENDING" ? "Waiting for Approval of " : ""}
                                                    {props.process.unitApproval.status === "REJECTED" ? "Reject the request by " : ""}
                                                    {props.process.unitApproval.status === "COMPLETED" ? "Approved by " : ""}
                                                    <span className="font-semibold">{props.process.unitApproval.assignedPerson}</span> </p>
                                            </li>
                                            <li className="mb-7 ms-6">
                                                <span className={`absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white ${ProcessStatusColor[props.process.serviceApproval.status]}`}>
                                                    <FaIdBadge />
                                                </span>
                                                <h3 className="font-medium leading-tight text-gray-500">MIS Approval</h3>
                                                <p className="text-sm">
                                                    {props.process.serviceApproval.status === "PENDING" ? "Waiting for Approval of " : ""}
                                                    {props.process.serviceApproval.status === "REJECTED" ? "Reject the request by " : ""}
                                                    {props.process.serviceApproval.status === "COMPLETED" ? "Approved by " : ""}
                                                    <span className="font-semibold">{props.process.serviceApproval.assignedPerson}</span>
                                                </p>
                                            </li>
                                            <li className="mb-7 ms-6">
                                                <span className={`absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white ${ProcessStatusColor[props.process.serviceAssigned.status]}`}>
                                                    <FaUserGear />
                                                </span>
                                                <h3 className="font-medium leading-tight text-gray-500">Assigned Personnel</h3>
                                                <p className="text-sm">
                                                    {props.process.serviceAssigned.status === "PENDING" ? "Waiting for the assigned personnel" : ""}
                                                    {props.process.serviceAssigned.status === "ON_GOING" ? <span className="font-semibold">Request has been assigned to {props.process.serviceAssigned.assignedPerson}</span> : ""}
                                                    {props.process.serviceAssigned.status === "COMPLETED" ? "Approved by " : ""}
                                                </p>
                                            </li>
                                            <li className="ms-6">
                                                <span className={`absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white ${ProcessStatusColor[props.process.completion.status]}`}>
                                                    <FaRegCircleCheck />
                                                </span>
                                                <h3 className="font-medium leading-tight text-gray-500">Complete</h3>
                                                <p className="text-sm">
                                                    {props.process.completion.status === "PENDING" ? "Waiting for other process to be completed" : ""}
                                                    {props.process.completion.status === "COMPLETED" ? "End of request, all process has been completed" : ""}
                                                </p>
                                            </li>
                                        </ol>
                                    </div>
                                )
                                : null
                        }
                        {
                            props.serviceType === REQUEST_SERVICE_CONSTANTS.BUILDING_AND_GROUNDS_SERVICES ?
                                (
                                    <div className="pl-5 mt-2">
                                        <ol className="relative border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                            <li className="mb-7 ms-6">
                                                <span className={`absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white ${ProcessStatusColor[props.process.details.status]}`}>
                                                    <FaCodePullRequest />
                                                </span>
                                                <h3 className="font-medium leading-tight">Request Details</h3>
                                                <p className="text-sm">Filling up the request details</p>
                                            </li>
                                            <li className="mb-7 ms-6">
                                                <span className={`absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white ${ProcessStatusColor[props.process.unitApproval.status]}`}>
                                                    <FaUserTie />
                                                </span>
                                                <h3 className="font-medium leading-tight text-gray-500">Unit Approval</h3>
                                                <p className="text-sm">
                                                    {props.process.unitApproval.status === "PENDING" ? "Waiting for Approval of " : ""}
                                                    {props.process.unitApproval.status === "REJECTED" ? "Reject the request by " : ""}
                                                    {props.process.unitApproval.status === "COMPLETED" ? "Approved by " : ""}
                                                    <span className="font-semibold">{props.process.unitApproval.assignedPerson}</span> </p>
                                            </li>
                                            <li className="mb-7 ms-6">
                                                <span className={`absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white ${ProcessStatusColor[props.process.serviceApproval.status]}`}>
                                                    <FaUserPen />
                                                </span>
                                                <h3 className="font-medium leading-tight text-gray-500">Recommending Approval</h3>
                                                <p className="text-sm">
                                                    {props.process.serviceApproval.status === "PENDING" ? "Waiting for Approval of " : ""}
                                                    {props.process.serviceApproval.status === "REJECTED" ? "Reject the request by " : ""}
                                                    {props.process.serviceApproval.status === "COMPLETED" ? "Approved by " : ""}
                                                    <span className="font-semibold">{props.process.recommendingApproval.assignedPerson}</span>
                                                </p>
                                            </li>
                                            <li className="mb-7 ms-6">
                                                <span className={`absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white ${ProcessStatusColor[props.process.serviceApproval.status]}`}>
                                                    <FaIdBadge />
                                                </span>
                                                <h3 className="font-medium leading-tight text-gray-500">Service Approval</h3>
                                                <p className="text-sm">
                                                    {props.process.serviceApproval.status === "PENDING" ? "Waiting for Approval of " : ""}
                                                    {props.process.serviceApproval.status === "REJECTED" ? "Reject the request by " : ""}
                                                    {props.process.serviceApproval.status === "COMPLETED" ? "Approved by " : ""}
                                                    <span className="font-semibold">{props.process.serviceApproval.assignedPerson}</span>
                                                </p>
                                            </li>
                                            <li className="mb-7 ms-6">
                                                <span className={`absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white ${ProcessStatusColor[props.process.serviceAssigned.status]}`}>
                                                    <FaUserGear />
                                                </span>
                                                <h3 className="font-medium leading-tight text-gray-500">Employee Assigned</h3>
                                                <p className="text-sm">
                                                    {props.process.serviceAssigned.status === "PENDING" ? "Waiting for the assigned personnel" : ""}
                                                    {props.process.serviceAssigned.status === "ON_GOING" ? <span className="font-semibold">Request has been assigned to {props.process.serviceAssigned.assignedPerson}</span> : ""}
                                                    {props.process.serviceAssigned.status === "COMPLETED" ? "Approved by " : ""}
                                                </p>
                                            </li>
                                            <li className="ms-6">
                                                <span className={`absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white ${ProcessStatusColor[props.process.completion.status]}`}>
                                                    <FaRegCircleCheck />
                                                </span>
                                                <h3 className="font-medium leading-tight text-gray-500">Complete</h3>
                                                <p className="text-sm">
                                                    {props.process.completion.status === "PENDING" ? "Waiting for other process to be completed" : ""}
                                                    {props.process.completion.status === "COMPLETED" ? "End of request, all process has been completed" : ""}
                                                </p>
                                            </li>
                                        </ol>
                                    </div>
                                )
                                : null
                        }

                    </div>
                    <div className="mb-2 flex items-center justify-around">
                        <Button variant="destructive" className="mr-2"><FaRegCircleXmark /> Reject</Button>
                        <Button className="mr-2"><FaRegCircleCheck /> Approve</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const RequestSection = () => {
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

export default RequestSection