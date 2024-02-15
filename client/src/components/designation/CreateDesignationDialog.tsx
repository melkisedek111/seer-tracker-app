import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa6";
import { useAppDispatch } from "@/redux/reduxHook"
import { setIsLoading, setMessage } from "@/redux/features/global/globalSlice"
import { useCreatePositionMutation } from "@/redux/features/position/positionApi"
import { handleFormValueChange } from "@/helpers/form.helper"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils";
import CustomComboBox from "../customs/CustomComboBox";

type ValueFormType<T = string> = {
    value: T;
    message: string;
    isError: boolean;
    isRequired: boolean;
    otherErrorMessage?: {
        [key in string]: {
            message: string;
            isError: boolean;
        }
    }
}

export type CreatePositionTypes = {
    name: ValueFormType;
}

const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ]

export function CreateDesignationDialog() {
    const initialCreatePositionValues: CreatePositionTypes = {
        name: {
            value: "",
            message: "Name is required.",
            isError: false,
            isRequired: true
        }
    }

    const [open, setOpen] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState("")

    const [createPositionValues, setCreatePositionsValues] = useState<CreatePositionTypes>(JSON.parse(JSON.stringify(initialCreatePositionValues)));
    const dispatch = useAppDispatch();
    const [createPosition] = useCreatePositionMutation();

    const handleCreatePosition = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            const hasError: boolean[] = [];
            let values: any = {};
            const formValues = { ...createPositionValues };

            for (const key in formValues) {
                const input = formValues[key as keyof CreatePositionTypes];
                if (input.isRequired) {
                    if (!input.value) {
                        input.isError = true;
                        hasError.push(true);
                    } else {
                        input.isError = false;
                    }
                }
                values[key as keyof CreatePositionTypes] = input.value;
            }

            setCreatePositionsValues(formValues)

            if (!hasError.length) {
                dispatch(setIsLoading({ isLoading: true }));
                const response = await createPosition({ name: createPositionValues.name.value });

                if ("data" in response) {
                    if (!response.data.error) {
                        setCreatePositionsValues(initialCreatePositionValues);
                    }
                    dispatch(setMessage({ message: response.data.message }));
                    dispatch(setIsLoading({ isLoading: false }))
                }
            }
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2" onClick={() => {
                    setCreatePositionsValues(initialCreatePositionValues);
                }}><FaPlus /> Create Position </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Position</DialogTitle>
                    <DialogDescription>
                        Fill up the details for new position.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">
                            Department
                        </Label>
                        <CustomComboBox label="Department" items={frameworks} value={selectedDepartment} setValue={setSelectedDepartment}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">
                            Employee
                        </Label>
                        <CustomComboBox label="Department" items={frameworks} value={selectedDepartment} setValue={setSelectedDepartment}/>
                    </div>
                    {/* <div className="flex flex-col gap-2">
                        <Label htmlFor="name">
                            Name
                        </Label>
                        <Input
                            type="text"
                            name="name"
                            value={createPositionValues.name.value}
                            onChange={(event) => handleFormValueChange<CreatePositionTypes>(event, createPositionValues, setCreatePositionsValues)}
                        />
                        {
                            createPositionValues.name.isError ? <p className="text-red-500 text-xs">{createPositionValues.name.message}</p> : null
                        }
                    </div> */}
                </div>
                <DialogFooter >
                    <Button type="submit" onClick={handleCreatePosition}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
