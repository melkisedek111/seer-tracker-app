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
import React, { useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { useAppDispatch } from "@/redux/reduxHook"
import { setIsLoading, setMessage } from "@/redux/features/global/globalSlice"
import { useCreatePositionMutation, useUpdatePositionMutation } from "@/redux/features/position/positionApi"
import { handleFormValueChange } from "@/helpers/form.helper"
import { TDepartment } from "./DepartmentSection"
import { useUpdateDepartmentMutation } from "@/redux/features/deparment/departmentApi"

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

export type TDepartmentValue = {
    id: ValueFormType<number | undefined>;
    name: ValueFormType<string | undefined>;
    acronym: ValueFormType<string | undefined>;
}

type TUpdateDepartmentDialogProps<T> = {
    selectedDepartment: TDepartment | undefined;
    setSelectedDepartment: React.Dispatch<React.SetStateAction<T>>
}


export function UpdateDepartmentDialog({ selectedDepartment, setSelectedDepartment }: TUpdateDepartmentDialogProps<TDepartment | undefined>) {
    const initialUpdateDepartmentValues: TDepartmentValue = {
        id: {
            value: selectedDepartment?.id,
            message: "Department ID is required.",
            isError: false,
            isRequired: true
        },
        name: {
            value: selectedDepartment?.name,
            message: "Name is required.",
            isError: false,
            isRequired: true
        },
        acronym: {
            value: selectedDepartment?.acronym,
            message: "Acronym is required.",
            isError: false,
            isRequired: true
        }
    }

    const [updateDepartmentValues, setUpdateDepartmentValues] = useState<TDepartmentValue>(JSON.parse(JSON.stringify(initialUpdateDepartmentValues)));
    const dispatch = useAppDispatch();
    const [updateDepartment] = useUpdateDepartmentMutation();

    const handleUpdateDepartment = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            const hasError: boolean[] = [];
            let values: any = {};
            const formValues = { ...updateDepartmentValues };

            for (const key in formValues) {
                const input = formValues[key as keyof TDepartmentValue];
                if (input.isRequired) {
                    if (!input.value) {
                        input.isError = true;
                        hasError.push(true);
                    } else {
                        input.isError = false;
                    }
                }
                values[key as keyof TDepartmentValue] = input.value;
            }

            setUpdateDepartmentValues(formValues)

            if (!hasError.length) {
                dispatch(setIsLoading({ isLoading: true }));
                if (updateDepartmentValues.id.value && updateDepartmentValues.name.value) {
                    const response = await updateDepartment({id: Number(updateDepartmentValues.id.value), name: updateDepartmentValues.name.value, acronym: updateDepartmentValues.acronym.value || "" });

                    if ("data" in response) {
                        setTimeout(() => {
                            dispatch(setMessage({ message: response.data.message }));
                            dispatch(setIsLoading({ isLoading: false }));
                            setSelectedDepartment(undefined);
                        }, 1500)
                    }
                }
            }
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <Dialog open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(undefined)}>
            <DialogTrigger asChild>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update the selected department</DialogTitle>
                    <DialogDescription>
                        Fill up the new detail(s) to update the department.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">
                            Name
                        </Label>
                        <Input
                            type="text"
                            name="name"
                            value={updateDepartmentValues.name.value}
                            onChange={(event) => handleFormValueChange<TDepartmentValue>(event, updateDepartmentValues, setUpdateDepartmentValues)}
                        />
                        {
                            updateDepartmentValues.name.isError ? <p className="text-red-500 text-xs">{updateDepartmentValues.name.message}</p> : null
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="acronym">
                            Acronym
                        </Label>
                        <Input
                            type="text"
                            name="acronym"
                            value={updateDepartmentValues.acronym.value}
                            onChange={(event) => handleFormValueChange<TDepartmentValue>(event, updateDepartmentValues, setUpdateDepartmentValues)}
                        />
                        {
                            updateDepartmentValues.acronym.isError ? <p className="text-red-500 text-xs">{updateDepartmentValues.acronym.message}</p> : null
                        }
                    </div>
                </div>
                <DialogFooter >
                    <Button type="submit" onClick={handleUpdateDepartment}>Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
