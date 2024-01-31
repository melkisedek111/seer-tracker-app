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
import { PositionsTypes } from "./PositionSection"

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

type UpdatePositionTypes = {
    id: ValueFormType<number | undefined>;
    name: ValueFormType<string | undefined>;
}

type UpdatePositionDialogProps<T> = {
    selectedPosition: PositionsTypes | undefined;
    setSelectedPosition: React.Dispatch<React.SetStateAction<T>>
}



export function UpdatePositionDialog({ selectedPosition, setSelectedPosition }: UpdatePositionDialogProps<PositionsTypes | undefined>) {
    const initialUpdatePositionValues: UpdatePositionTypes = {
        id: {
            value: selectedPosition?.id,
            message: "Position ID is required.",
            isError: false,
            isRequired: true
        },
        name: {
            value: selectedPosition?.name,
            message: "Name is required.",
            isError: false,
            isRequired: true
        }
    }

    const [updatePositionValues, setUpdatePositionValues] = useState<UpdatePositionTypes>(JSON.parse(JSON.stringify(initialUpdatePositionValues)));
    const dispatch = useAppDispatch();
    const [updatePosition] = useUpdatePositionMutation();

    const handleUpdatePosition = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            const hasError: boolean[] = [];
            let values: any = {};
            const formValues = { ...updatePositionValues };

            for (const key in formValues) {
                const input = formValues[key as keyof UpdatePositionTypes];
                if (input.isRequired) {
                    if (!input.value) {
                        input.isError = true;
                        hasError.push(true);
                    } else {
                        input.isError = false;
                    }
                }
                values[key as keyof UpdatePositionTypes] = input.value;
            }

            setUpdatePositionValues(formValues)

            if (!hasError.length) {
                dispatch(setIsLoading({ isLoading: true }));
                if (updatePositionValues.id.value && updatePositionValues.name.value) {
                    const response = await updatePosition({id: updatePositionValues.id.value, name: updatePositionValues.name.value });

                    if ("data" in response) {
                        setTimeout(() => {
                            dispatch(setMessage({ message: response.data.message }));
                            dispatch(setIsLoading({ isLoading: false }));
                            setSelectedPosition(undefined);
                        }, 1500)
                    }
                }
            }
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <Dialog open={!!selectedPosition} onOpenChange={() => setSelectedPosition(undefined)}>
            <DialogTrigger asChild>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update the selected position</DialogTitle>
                    <DialogDescription>
                        Fill up the new detail(s) to update the position.
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
                            value={updatePositionValues.name.value}
                            onChange={(event) => handleFormValueChange<UpdatePositionTypes>(event, updatePositionValues, setUpdatePositionValues)}
                        />
                        {
                            updatePositionValues.name.isError ? <p className="text-red-500 text-xs">{updatePositionValues.name.message}</p> : null
                        }
                    </div>
                </div>
                <DialogFooter >
                    <Button type="submit" onClick={handleUpdatePosition}>Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
