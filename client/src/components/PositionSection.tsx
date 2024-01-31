import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import CustomDataTable from './CustomDataTable'
import { Button } from './ui/button';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { CreatePositionDialog } from './CreatePositionDialog'
import { useGetPositionQuery, useGetPositionsQuery } from '@/redux/features/position/positionApi';
import { useAppDispatch } from '@/redux/reduxHook';
import { setIsLoading, setMessage } from '@/redux/features/global/globalSlice';
import { UpdatePositionDialog } from './UpdatePositionDialog';

export type PositionsTypes = {
    id: number;
    name: string;
}

type GetPositionProps<T> = {
    id: number;
    setSelectedPosition: React.Dispatch<React.SetStateAction<T>>;
}

const GetPosition = ({ id, setSelectedPosition }: GetPositionProps<PositionsTypes | undefined>) => {
    const [isGetPosition, setIsGetPosition] = useState<boolean>(false)
    const { data, isError, isLoading, isSuccess } = useGetPositionQuery({ id }, { skip: !isGetPosition });
    const dispatch = useAppDispatch();

    const handleGetPosition = async () => {
        setIsGetPosition(true);
    };

    useEffect(() => {
        if(isGetPosition) {
            dispatch(setIsLoading({ isLoading: true }));

            setTimeout(() => {
                if(data?.data) {
                    setSelectedPosition(data?.data);
                }
                if(data?.message && data.error) {
                    dispatch(setMessage({ message: data.message }));
                }
                dispatch(setIsLoading({ isLoading: false }));
                setIsGetPosition(false);
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
                <DropdownMenuItem onClick={handleGetPosition}>
                    Update
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const PositionSection = () => {
    const { data: getPositions, isSuccess, isError, isLoading } = useGetPositionsQuery()
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({});   
    const [positions, setPositions] = useState<PositionsTypes[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<PositionsTypes | undefined>(undefined)


    const columns: ColumnDef<PositionsTypes>[] = [
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
                        Position
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
            id: "actions",
            enableHiding: false,
            header: "Actions",
            cell: ({ row }) => {

                return <GetPosition id={row.original.id} setSelectedPosition={setSelectedPosition}  />
            },
        },
    ]

    useEffect(() => {
        if (getPositions && isSuccess) {
            setPositions(getPositions.data);
        }
    }, [getPositions])

    return (
        <section>
            <div>
                <div className="border-b pb-4 mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl text-semibold">Positions</h2>
                        <p className="text-sm text-muted-foreground">List of positions that assigned to the user.</p>
                    </div>
                    <CreatePositionDialog />
                    {
                        selectedPosition ? <UpdatePositionDialog selectedPosition={selectedPosition} setSelectedPosition={setSelectedPosition} /> : null
                    }
                </div>
                <div>
                    <CustomDataTable<PositionsTypes>
                        sorting={sorting}
                        setSorting={setSorting}
                        columnFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                        columnVisibility={columnVisibility}
                        setColumnVisibility={setColumnVisibility}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                        data={positions}
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

export default PositionSection