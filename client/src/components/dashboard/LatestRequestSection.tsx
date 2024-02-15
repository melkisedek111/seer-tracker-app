import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FaCalendarDay, FaBarsProgress } from "react-icons/fa6";
import { BsFilePerson, BsBuilding, BsDiagram2Fill } from "react-icons/bs";

const LatestRequestCard = () => {

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-between w-full border-b pb-3">
                        <div className="p-2 m-0 text-white rounded-md bg-red-800">
                            <p className="m-0 text-white font-semibold uppercase leading-none">HP</p>
                        </div>
                        <h3 className="font-semibold ">My Computer keeps blue screen</h3>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between w-full border-b pb-1">
                        <div className="flex items-center gap-2">
                            <FaCalendarDay />
                            <p className="text-sm text-muted-foreground">Date Requested</p>
                        </div>
                        <p className="text-sm font-semibold">January 13, 2023 4:10 PM</p>
                    </div>
                    <div className="flex items-center justify-between w-full border-b pb-1">
                        <div className="flex items-center gap-2">
                            <BsFilePerson />
                            <p className="text-sm text-muted-foreground">Requested by</p>
                        </div>
                        <p className="text-sm font-semibold">Melkisedek Ubalde</p>
                    </div>
                    <div className="flex items-center justify-between w-full border-b pb-1">
                        <div className="flex items-center gap-2">
                            <BsBuilding />
                            <p className="text-sm text-muted-foreground">Department</p>
                        </div>
                        <p className="text-sm font-semibold">CICT</p>
                    </div>
                    <div className="flex items-center justify-between w-full border-b pb-1">
                        <div className="flex items-center gap-2">
                            <BsDiagram2Fill />
                            <p className="text-sm text-muted-foreground">Current Process</p>
                        </div>
                        <p className="text-sm font-semibold">Unit Approval</p>
                    </div>
                    <div className="flex items-center justify-between w-full border-b pb-1">
                        <div className="flex items-center gap-2">
                            <FaBarsProgress />
                            <p className="text-sm text-muted-foreground">Status</p>
                        </div>
                        <p className="text-sm font-semibold">On Process</p>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}

const LatestRequestSection = () => {
    return (
        <section >
            <Card className="overflow-hidden">
                <div className="overflow-y-auto h-[560px]">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                            </svg>
                            <h2 className="font-semibold leading-none tracking-tight">Latest Request</h2>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <LatestRequestCard />
                            <LatestRequestCard />
                            <LatestRequestCard />
                            <LatestRequestCard />

                        </div>
                    </CardContent>
                </div>

            </Card>
        </section>
    )
}

export default LatestRequestSection