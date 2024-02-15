import React from 'react'
import { FaPlus, FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Separator } from '@radix-ui/react-select'
import DesignationCard, { TDesignationCard } from './designation/DesignationCard'
import { CreateDesignationDialog } from './designation/CreateDesignationDialog'

const DesignationPage = () => {
    const designationDepartmentCardData: TDesignationCard[] = [
        {
            id: 1,
            name: "Neelesh Chaudary",
            designation: "Unit Head",
            image: "https://api.dicebear.com/7.x/micah/svg?seed=Neelesh Chaudary",
            role: "Regular",
            department: "Department of Information Communication and Technology",
            position: "Instructor II",
            isActive: false,
        },
        {
            id: 2,
            name: "Alice Smith",
            designation: "Unit Head",
            image: "https://api.dicebear.com/7.x/micah/svg?seed=Alice Smith",
            role: "Senior",
            department: "College of Human Resources",
            position: "HR Manager",
            isActive: true,
        },
        {
            id: 3,
            name: "John Doe",
            designation: "Unit Head",
            image: "https://api.dicebear.com/7.x/micah/svg?seed=John Doe",
            role: "Regular",
            department: "Department of Finance",
            position: "Accountant",
            isActive: true,
        },
        {
            id: 4,
            name: "Emily Brown",
            designation: "Unit Head",
            image: "https://api.dicebear.com/7.x/micah/svg?seed=Emily Brown",
            role: "Regular",
            department: "Department of Marketing",
            position: "Marketing Specialist",
            isActive: false,
        },
        {
            id: 5,
            name: "Michael Johnson",
            designation: "Unit Head",
            image: "https://api.dicebear.com/7.x/micah/svg?seed=Michael Johnson",
            role: "Senior",
            department: "College of Sales",
            position: "Sales Manager",
            isActive: true,
        },
        {
            id: 6,
            name: "Sarah Lee",
            designation: "Unit Head",
            image: "https://api.dicebear.com/7.x/micah/svg?seed=Sarah Lee",
            role: "Regular",
            department: "Department of Customer Support",
            position: "Support Specialist",
            isActive: true,
        },
        {
            id: 7,
            name: "David Rodriguez",
            designation: "Unit Head",
            image: "https://api.dicebear.com/7.x/micah/svg?seed=David Rodriguez",
            role: "Regular",
            department: "Department of Operations",
            position: "Operations Coordinator",
            isActive: false,
        },
        {
            id: 8,
            name: "Jennifer Martinez",
            designation: "Unit Head",
            image: "https://api.dicebear.com/7.x/micah/svg?seed=Jennifer Martinez",
            role: "Senior",
            department: "College of Product Management",
            position: "Product Manager",
            isActive: true,
        },
        {
            id: 9,
            name: "James Wilson",
            designation: "Unit Head",
            image: "https://api.dicebear.com/7.x/micah/svg?seed=James Wilson",
            role: "Regular",
            department: "Department of Research and Development",
            position: "Research Scientist",
            isActive: false,
        },
        {
            id: 10,
            name: "Emma Taylor",
            designation: "Unit Head",
            image: "https://api.dicebear.com/7.x/micah/svg?seed=Emma Taylor",
            role: "Senior",
            department: "College of Engineering",
            position: "Lead Engineer",
            isActive: true,
        },
    ];

    const designationMISCardData: TDesignationCard[] = [
        {
            id: 11,
            name: "Christopher Walker",
            designation: "Service Head",
            image: "https://api.dicebear.com/7.x/micah/svg?seed=Christopher Walker",
            role: "Regular",
            department: "MIS",
            position: "Teacher",
            isActive: true
        },
    ]
    const designationBAGCardData: TDesignationCard[] = [
        {
            id: 12,
            name: "Victoria Turner",
            designation: "Service Head",
            image: "https://api.dicebear.com/7.x/micah/svg?seed=Victoria Turner",
            role: "Senior",
            department: "BAG",
            position: "Senior Doctor",
            isActive: true
        },
    ]
    return (
        <section>
            <div className="container max-w-screen-2xl space-y-4 p-8 pt-8">
                <div className="w-full flex items-center justify-between pb-5 border-b">
                    <h2 className="text-4xl font-bold tracking-tight">Designations</h2>
                    <div className="flex items-center space-x-2">
                        <CreateDesignationDialog />
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-5">Departments</h2>
                    <div className="flex gap-6 flex-wrap justify-center lg:justify-start">
                        {
                            designationDepartmentCardData.map(item => (
                                <DesignationCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    designation={item.designation}
                                    image={item.image}
                                    role={item.role}
                                    department={item.department}
                                    position={item.position}
                                    isActive={item.isActive}
                                />
                            ))
                        }
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-5">Management Information System (MIS)</h2>
                    <div className="flex gap-6 flex-wrap justify-center lg:justify-start">
                        {
                            designationMISCardData.map(item => (
                                <DesignationCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    designation={item.designation}
                                    image={item.image}
                                    role={item.role}
                                    department={item.department}
                                    position={item.position}
                                    isActive={item.isActive}
                                />
                            ))
                        }
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-5">Building and Grounds Services (BAG)</h2>
                    <div className="flex gap-6 flex-wrap justify-center lg:justify-start">
                        {
                            designationBAGCardData.map(item => (
                                <DesignationCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    designation={item.designation}
                                    image={item.image}
                                    role={item.role}
                                    department={item.department}
                                    position={item.position}
                                    isActive={item.isActive}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DesignationPage