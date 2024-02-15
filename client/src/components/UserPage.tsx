import React, { useState } from 'react'
import CreateUserSection from './user/CreateUserSection';
import UserTable from './user/UserTable';

const UserPage = () => {
    const [isCreateUser, setIsCreateUser] = useState<boolean>(false);

    return isCreateUser ? <CreateUserSection setIsCreateUser={setIsCreateUser} /> : <UserTable setIsCreateUser={setIsCreateUser} />
}

export default UserPage




// import React from 'react'
// import {
//     CaretSortIcon,
//     ChevronDownIcon,
//     ChevronLeftIcon,
//     ChevronRightIcon,
//     DotsHorizontalIcon,
//     DoubleArrowLeftIcon,
//     DoubleArrowRightIcon,
// } from "@radix-ui/react-icons"
// import {
//     ColumnDef,
//     ColumnFiltersState,
//     SortingState,
//     VisibilityState,
//     flexRender,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     useReactTable,
// } from "@tanstack/react-table"

// import { Button } from "@/components/ui/button"
// import {
//     DropdownMenu,
//     DropdownMenuCheckboxItem,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import { Badge } from './ui/badge'
// import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
// import CustomMultiComboBox, { ComboBoxValueTypes } from './CustomMultiComboBox'
// import { FaRegStar, FaKey, FaRegCircleUser } from "react-icons/fa6";
// import { UserTableDummyData } from '@/Data/user_table.data'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
// import { Card, CardContent } from './ui/card'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { CreateUserDialog } from './CreateUserDialog'
// import CustomDataTable from './CustomDataTable'

// export type UserDataTableType = {
//     employeeNumber: string;
//     name: string;
//     email: string;
//     position: string;
//     department: string;
//     status: string;
//     role: string;
// }

// type ROLE_KEYS = "Super Admin" | "Admin" | "Regular";

// export const ROLES: {
//     SUPER_ADMIN: ROLE_KEYS;
//     ADMIN: ROLE_KEYS;
//     REGULAR: ROLE_KEYS;
// } = {
//     SUPER_ADMIN: "Super Admin",
//     ADMIN: "Admin",
//     REGULAR: "Regular",
// }


// const ROLE_COLOR: { [key in ROLE_KEYS]: string } = {
//     "Super Admin": "bg-yellow-400",
//     "Admin": "bg-orange-400",
//     "Regular": "bg-green-400",
// }

// const ROLE_ICON: { [key in ROLE_KEYS]: React.ReactNode } = {
//     "Super Admin": <FaRegStar />,
//     "Admin": <FaKey />,
//     "Regular": <FaRegCircleUser />,
// }


// const data: UserDataTableType[] = UserTableDummyData;

// export const columns: ColumnDef<UserDataTableType>[] = [
//     {
//         accessorKey: "name",
//         header: ({ column }) => {
//             return (
//                 <Button
//                     variant="ghost"
//                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                 >
//                     Name
//                     <CaretSortIcon className="ml-2 h-4 w-4" />
//                 </Button>
//             )
//         },
//         cell: ({ row }) => {
//             return (<div className="font-medium leading-none flex items-center gap-2">
//                 <Avatar>
//                     <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${row.original.name}`} alt="@shadcn" />
//                     <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//                 <div>
//                     <p className="text-sm font-medium leading-none">{row.original.name}</p>
//                     <small className="text-sm font-light text-gray-400">{row.original.email}</small>
//                 </div>

//             </div>)
//         },
//     },
//     {
//         accessorKey: "employeeNumber",
//         header: "Employee Number",
//         cell: ({ row }) => (
//             <div className="capitalize font-medium leading-none"><Badge variant="secondary">{row.getValue("employeeNumber")}</Badge></div>
//         ),
//     },
//     {
//         accessorKey: "position",
//         header: "Position",
//         cell: ({ row }) => (
//             <div className="font-medium leading-none">{row.getValue("position")}</div>
//         ),
//     },
//     {
//         accessorKey: "department",
//         header: "Department",
//         cell: ({ row }) => (
//             <div className="font-medium leading-none">{row.getValue("department")}</div>
//         ),
//     },
//     {
//         accessorKey: "role",
//         header: "Role",
//         cell: ({ row }) => {
//             const role_key: ROLE_KEYS = row.getValue("role") || "Regular";
//             const bg = ROLE_COLOR[role_key];
//             const icon = ROLE_ICON[role_key];
//             return (
//                 <Badge className={bg}>{icon} <p className="ml-1">{row.getValue("role")}</p></Badge>
//             )
//         },
//     },
//     {
//         accessorKey: "status",
//         header: "Status",
//         cell: ({ row }) => (
//             <Badge variant={`${row.getValue("status") === "Inactive" ? "destructive" : "default"}`}>{row.getValue("status") === "Inactive" ? <FaCircleXmark /> : <FaCircleCheck />} <p className="ml-1">{row.getValue("status")}</p></Badge>
//         ),
//     },
//     {
//         id: "actions",
//         enableHiding: false,
//         header: "Actions",
//         cell: ({ row }) => {
//             const payment = row.original

//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <DotsHorizontalIcon className="h-4 w-4" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuItem
//                             onClick={() => navigator.clipboard.writeText(payment.employeeNumber)}
//                         >
//                             Copy payment ID
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem>View customer</DropdownMenuItem>
//                         <DropdownMenuItem>View payment details</DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             )
//         },
//     },
// ]


// const departments = [
//     {
//         value: "1",
//         label: "College of Education",
//     },
//     {
//         value: "2",
//         label: "Science Department",
//     },
//     {
//         value: "3",
//         label: "Human Resources",
//     },
//     {
//         value: "4",
//         label: "IT Department",
//     },
//     {
//         value: "5",
//         label: "Finance Department",
//     },
//     {
//         value: "6",
//         label: "Marketing Department",
//     },
//     {
//         value: "7",
//         label: "Project Management",
//     },
//     {
//         value: "8",
//         label: "Creative Department",
//     },
//     {
//         value: "9",
//         label: "Customer Service",
//     },
//     {
//         value: "10",
//         label: "Legal Department",
//     },
// ]

// const positions = [
//     {
//         value: "1",
//         label: "Administrative Aid I",
//     },
//     {
//         value: "2",
//         label: "Administrative Aid II",
//     },
//     {
//         value: "3",
//         label: "Professor I",
//     },
//     {
//         value: "4",
//         label: "Instructor I",
//     }
// ]
// const ROLES_DATA = [
//     {
//         value: ROLES.SUPER_ADMIN,
//         label: ROLES.SUPER_ADMIN,
//     },
//     {
//         value: ROLES.ADMIN,
//         label: ROLES.ADMIN,
//     },
//     {
//         value: ROLES.REGULAR,
//         label: ROLES.REGULAR,
//     },
// ]

// const UserSection = () => {
//     const [sorting, setSorting] = React.useState<SortingState>([])
//     const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//         []
//     )
//     const [columnVisibility, setColumnVisibility] =
//         React.useState<VisibilityState>({})
//     const [rowSelection, setRowSelection] = React.useState({})
//     const [departmentValue, setDepartmentValue] = React.useState<string | ComboBoxValueTypes[]>([])
//     const [positionValue, setPositionValue] = React.useState<string | ComboBoxValueTypes[]>([])
//     const [roleValue, setRoleValue] = React.useState<string | ComboBoxValueTypes[]>([])


//     const table = useReactTable({
//         data,
//         columns,
//         onSortingChange: setSorting,
//         onColumnFiltersChange: setColumnFilters,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         onColumnVisibilityChange: setColumnVisibility,
//         onRowSelectionChange: setRowSelection,
//         state: {
//             sorting,
//             columnFilters,
//             columnVisibility,
//             rowSelection,
//         },
//     })


//     // function capitalizeWords(inputString: string) {
//     //     // Split the input string into an array of words
//     //     const words = inputString.split(' ');

//     //     // Capitalize the first letter of each word
//     //     const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

//     //     // Join the capitalized words back into a string
//     //     const resultString = capitalizedWords.join(' ');

//     //     return resultString;
//     // }

//     const TableElementHelpers = () => (
//         <>
//             <CustomMultiComboBox data={departments} value={departmentValue} setValue={setDepartmentValue} title="Departments" />
//             <CustomMultiComboBox data={positions} value={positionValue} setValue={setPositionValue} title="Positions" />
//             <CustomMultiComboBox data={ROLES_DATA} value={roleValue} setValue={setRoleValue} title="Roles" />
//         </>
//     )

//     return (
//         <section>
//             <div className="container max-w-screen-2xl space-y-4 p-8 pt-8">
//                 <div className="w-full flex items-center justify-between pb-5">
//                     <h2 className="text-4xl font-bold tracking-tight">Users</h2>
//                     <div className="flex items-center space-x-2">
//                         <CreateUserDialog />
//                     </div>
//                 </div>
//                 {/* <Card>
//                     <CardContent>


//                     </CardContent>
//                 </Card> */}
//                 <CustomDataTable<UserDataTableType> sorting={sorting} setSorting={setSorting} columnFilters={columnFilters} setColumnFilters={setColumnFilters} columnVisibility={columnVisibility} setColumnVisibility={setColumnVisibility} rowSelection={rowSelection} setRowSelection={setRowSelection} data={data} columns={columns} inputFilterPlaceholder={"Filter name"} inputFilterKey={"name"} tableElementHelper={<TableElementHelpers />} />
//             </div>
//         </section>
//     )
// }

// export default UserSection
