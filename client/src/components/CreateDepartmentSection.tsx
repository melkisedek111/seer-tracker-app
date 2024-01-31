import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table'
import React, { useState } from 'react'
import CustomDataTable from './CustomDataTable'
import { Button } from './ui/button';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { CreatePositionDialog } from './CreatePositionDialog'

type DepartmentTypes = {
    departmentId: string;
    name: string;
    acronym: string;
}
const CreateDepartmentSection = () => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({});

    const data: DepartmentTypes[] = [
        {
            departmentId: "DEP-001",
            name: "Engineering",
            acronym: "ENG"
        },
        {
            departmentId: "DEP-002",
            name: "Marketing",
            acronym: "MKT"
        },
        {
            departmentId: "DEP-003",
            name: "Human Resources",
            acronym: "HR"
        },
        {
            departmentId: "DEP-004",
            name: "Finance",
            acronym: "FIN"
        },
        {
            departmentId: "DEP-005",
            name: "Product Management",
            acronym: "PM"
        },
        {
            departmentId: "DEP-006",
            name: "Customer Support",
            acronym: "CS"
        },
        {
            departmentId: "DEP-007",
            name: "Sales",
            acronym: "SAL"
        },
        {
            departmentId: "DEP-008",
            name: "Quality Assurance",
            acronym: "QA"
        },
        {
            departmentId: "DEP-009",
            name: "Operations",
            acronym: "OPS"
        },
        {
            departmentId: "DEP-010",
            name: "Information Technology",
            acronym: "IT"
        },
        {
            departmentId: "DEP-011",
            name: "Design",
            acronym: "DES"
        },
        {
            departmentId: "DEP-012",
            name: "Research and Development",
            acronym: "R&D"
        },
        {
            departmentId: "DEP-013",
            name: "Public Relations",
            acronym: "PR"
        },
        {
            departmentId: "DEP-014",
            name: "Legal",
            acronym: "LEG"
        },
        {
            departmentId: "DEP-015",
            name: "Customer Success",
            acronym: "CS"
        },
        {
            departmentId: "DEP-016",
            name: "Supply Chain",
            acronym: "SC"
        },
        {
            departmentId: "DEP-017",
            name: "Events",
            acronym: "EVT"
        },
        {
            departmentId: "DEP-018",
            name: "Training",
            acronym: "TRN"
        },
        {
            departmentId: "DEP-019",
            name: "Facilities",
            acronym: "FAC"
        },
        {
            departmentId: "DEP-020",
            name: "Business Analysis",
            acronym: "BA"
        }
    ]


    const columns: ColumnDef<DepartmentTypes>[] = [
        {
            accessorKey: "departmentId",
            header: "Department ID",
            cell: ({ row }) => (
                <p className="ml-1">{row.getValue("departmentId")}</p>
            ),
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Department
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (<div className="font-medium leading-none flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">{row.original.name}</p>
                </div>)
            },
        },
        {
            accessorKey: "acronym",
            header: "Acronym",
            cell: ({ row }) => {
                return (<div className="font-medium leading-none flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">{row.original.acronym}</p>
                </div>)
            },
        },
        {
            id: "actions",
            enableHiding: false,
            header: "Actions",
            cell: ({ row }) => {
                const payment = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(payment.departmentId)}
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
    return (
        <section>
            <div>
                <div className="border-b pb-4 mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl text-semibold">Departments</h2>
                        <p className="text-sm text-muted-foreground">List of departments that assigned to the user.</p>
                    </div>
                    <CreatePositionDialog />
                </div>
                <div>
                    <CustomDataTable<DepartmentTypes> sorting={sorting} setSorting={setSorting} columnFilters={columnFilters} setColumnFilters={setColumnFilters} columnVisibility={columnVisibility} setColumnVisibility={setColumnVisibility} rowSelection={rowSelection} setRowSelection={setRowSelection} data={data} columns={columns} inputFilterPlaceholder={"Filter name"} inputFilterKey={"name"} />
                </div>
            </div>
        </section>
    )
}

export default CreateDepartmentSection