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
import { useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { useAppDispatch } from "@/redux/reduxHook"
import { setIsLoading, setMessage } from "@/redux/features/global/globalSlice"
import { ValueFormType, handleFormValueChange } from "@/helpers/form.helper"
import { useCreateDepartmentMutation } from "@/redux/features/deparment/departmentApi"

export type TDepartmentValue = {
    name: ValueFormType;
    acronym: ValueFormType;
}

export function CreateDepartmentDialog() {
    const initialCreateDepartmentValues: TDepartmentValue = {
        name: {
            value: "",
            message: "Name is required.",
            isError: false,
            isRequired: true
        },
        acronym: {
            value: "",
            message: "Acronym is required.",
            isError: false,
            isRequired: true
        }
    }

    const [createDepartmentValue, setCreateDepartmentValue] = useState<TDepartmentValue>(JSON.parse(JSON.stringify(initialCreateDepartmentValues)));
    const dispatch = useAppDispatch();
    const [createDepartment] = useCreateDepartmentMutation();

    const handleCreateDepartment = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            const hasError: boolean[] = [];
            let values: any = {};
            const formValues = { ...createDepartmentValue };

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

            setCreateDepartmentValue(formValues)

            if (!hasError.length) {
                dispatch(setIsLoading({ isLoading: true }));
                const response = await createDepartment({ name: createDepartmentValue.name.value, acronym: createDepartmentValue.acronym.value.toUpperCase() });

                if ("data" in response) {
                    if (!response.data.error) {
                        setCreateDepartmentValue(initialCreateDepartmentValues);
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
                    setCreateDepartmentValue(initialCreateDepartmentValues);
                }}><FaPlus /> Create Department </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Department</DialogTitle>
                    <DialogDescription>
                        Fill up the details for new department.
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
                            value={createDepartmentValue.name.value}
                            onChange={(event) => handleFormValueChange<TDepartmentValue>(event, createDepartmentValue, setCreateDepartmentValue)}
                        />
                        {
                            createDepartmentValue.name.isError ? <p className="text-red-500 text-xs">{createDepartmentValue.name.message}</p> : null
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="acronym">
                            Acronym
                        </Label>
                        <Input
                            type="text"
                            name="acronym"
                            value={createDepartmentValue.acronym.value}
                            onChange={(event) => handleFormValueChange<TDepartmentValue>(event, createDepartmentValue, setCreateDepartmentValue)}
                        />
                        {
                            createDepartmentValue.acronym.isError ? <p className="text-red-500 text-xs">{createDepartmentValue.acronym.message}</p> : null
                        }
                    </div>
                </div>
                <DialogFooter >
                    <Button type="submit" onClick={handleCreateDepartment}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
