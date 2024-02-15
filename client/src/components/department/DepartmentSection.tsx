import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import CustomDataTable from '@/components/customs/CustomDataTable'
import { Button } from '../ui/button';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useAppDispatch } from '@/redux/reduxHook';
import { setIsLoading, setMessage } from '@/redux/features/global/globalSlice';
import { useGetDepartmentQuery, useGetDepartmentsQuery } from '@/redux/features/deparment/departmentApi';
import { UpdateDepartmentDialog } from './UpdateDepartmentDialog';
import { CreateDepartmentDialog } from './CreateDepartmentDialog';

export type TDepartment = {
    id: number;
    name: string;
    acronym: string;
}

type GetDepartmentProps<T> = {
    id: number;
    setSelectedDepartment: React.Dispatch<React.SetStateAction<T>>;
}

const GetDepartmentWithAction = ({ id, setSelectedDepartment }: GetDepartmentProps<TDepartment | undefined>) => {
    const [isGetDepartment, setIsGetDepartment] = useState<boolean>(false)
    const { data, isError, isLoading, isSuccess } = useGetDepartmentQuery({ id }, { skip: !isGetDepartment });
    const dispatch = useAppDispatch();

    const handleGetDepartment = async () => {
        setIsGetDepartment(true);
    };

    useEffect(() => {
        if(isGetDepartment) {
            dispatch(setIsLoading({ isLoading: true }));

            setTimeout(() => {
                if(data?.data) {
                    setSelectedDepartment(data?.data);
                }
                if(data?.message && data.error) {
                    dispatch(setMessage({ message: data.message }));
                }
                dispatch(setIsLoading({ isLoading: false }));
                setIsGetDepartment(false);
            }, 1500)
        }
    }, [data])

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
                <DropdownMenuItem onClick={handleGetDepartment}>
                    Update
                </DropdownMenuItem>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const DepartmentSection = () => {
    const { data: getDepartments, isSuccess, isError, isLoading } = useGetDepartmentsQuery()
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({});   
    const [departments, setDepartments] = useState<TDepartment[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<TDepartment | undefined>(undefined)


    const columns: ColumnDef<TDepartment>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => (
                <p className="ml-1">{row.getValue("id")}</p>
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
                        Name
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
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Acronym
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
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

                return <GetDepartmentWithAction id={row.original.id} setSelectedDepartment={setSelectedDepartment}  />
            },
        },
    ]

    useEffect(() => {
        if (getDepartments && isSuccess) {
            setDepartments(getDepartments.data);
        }
    }, [getDepartments])

    return (
        <section>
            <div>
                <div className="border-b pb-4 mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl text-semibold">Departments</h2>
                        <p className="text-sm text-muted-foreground">List of departments that assigned to the user.</p>
                    </div>
                    <CreateDepartmentDialog />
                    {
                        selectedDepartment ? <UpdateDepartmentDialog selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment} /> : null
                    }
                </div>
                <div>
                    <CustomDataTable<TDepartment>
                        sorting={sorting}
                        setSorting={setSorting}
                        columnFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                        columnVisibility={columnVisibility}
                        setColumnVisibility={setColumnVisibility}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                        data={departments}
                        columns={columns}
                        inputFilterPlaceholder={"Filter name"}
                        inputFilterKey={"name"}
                        isLoading={isLoading}
                    />

                </div>
            </div>
        </section>
    )
}

export default DepartmentSection