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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "./ui/textarea"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { REQUEST_SERVICE_CONSTANTS } from "@/constants/app.constants"


const buildingAndGroundServiceList: { value: string, label: string }[] = [
    {
        value: REQUEST_SERVICE_CONSTANTS.CARPENTRY_OR_MASONRY,
        label: REQUEST_SERVICE_CONSTANTS.CARPENTRY_OR_MASONRY,
    },
    {
        value: REQUEST_SERVICE_CONSTANTS.PLUMBING,
        label: REQUEST_SERVICE_CONSTANTS.PLUMBING,
    },
    {
        value: REQUEST_SERVICE_CONSTANTS.PLANTING,
        label: REQUEST_SERVICE_CONSTANTS.PLANTING,
    },
    {
        value: REQUEST_SERVICE_CONSTANTS.HAULING,
        label: REQUEST_SERVICE_CONSTANTS.HAULING,
    },
    {
        value: REQUEST_SERVICE_CONSTANTS.GROUND_MAINTENANCE,
        label: REQUEST_SERVICE_CONSTANTS.GROUND_MAINTENANCE,
    },
    {
        value: REQUEST_SERVICE_CONSTANTS.MECHANICAL_WORKS,
        label: REQUEST_SERVICE_CONSTANTS.MECHANICAL_WORKS,
    },
    {
        value: REQUEST_SERVICE_CONSTANTS.ELECTRICAL,
        label: REQUEST_SERVICE_CONSTANTS.ELECTRICAL,
    },
    {
        value: REQUEST_SERVICE_CONSTANTS.WIELDING,
        label: REQUEST_SERVICE_CONSTANTS.WIELDING,
    },
    {
        value: "Others",
        label: "Others",
    },
]

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

export type RequestBuildingAndGroundFormTypes = {
    buildingAndGroundServices: ValueFormType<{ value: string, label: string }[]>,
    descriptionOfWork: ValueFormType,
}

export type RequestMISFormTypes = {
    problemType: ValueFormType,
    otherProblemType: ValueFormType,
    problemDetails: ValueFormType,
    isPriority: ValueFormType
}

export function CreateRequestDialog() {
    const initialBuildingAndGroundValues: RequestBuildingAndGroundFormTypes = {
        buildingAndGroundServices: {
            value: [],
            message: "Service(s) are required.",
            isError: false,
            isRequired: true
        },
        descriptionOfWork: {
            value: "",
            message: "Description of work to be done is required.",
            isError: false,
            isRequired: true
        }
    }

    const initialMISValues: RequestMISFormTypes = {
        problemType: {
            value: "",
            message: "Problem type is required.",
            isError: false,
            isRequired: true
        },
        otherProblemType: {
            value: "",
            message: "Other problem is required",
            isError: false,
            isRequired: false
        },
        problemDetails: {
            value: "",
            message: "Problem details is required.",
            isError: false,
            isRequired: true
        },
        isPriority: {
            value: "",
            message: "Selecting priority is required.",
            isError: false,
            isRequired: true
        },

    }

    const [formMISValues, setFormMISValues] = useState<RequestMISFormTypes>(JSON.parse(JSON.stringify(initialMISValues)));
    const [formBuildingAndGroundValues, setFormBuildingAndGroundValues] = useState<RequestBuildingAndGroundFormTypes>(JSON.parse(JSON.stringify(initialBuildingAndGroundValues)));
    const [serviceType, setServiceType] = useState<{ serviceType: ValueFormType }>({
        serviceType: {
            value: "",
            message: "Service type is required.",
            isError: false,
            isRequired: true
        },
    })
    const [open, setOpen] = useState<boolean>(false)


    const handleSelectedServices = (currentValue: string): void => {
        const selectedServices = [...formBuildingAndGroundValues.buildingAndGroundServices.value];
        const existedSelectedServices = selectedServices.find(item => item.value.toLowerCase() === currentValue);
        const isOtherExists = selectedServices.find(item => item.value.toLowerCase() === "others");
        let updatedServices: { value: string, label: string }[] = []
        if (currentValue === "others") {
            const selectedService = buildingAndGroundServiceList.find((item) => item.value.toLowerCase() === currentValue);

            if (selectedService) {
                updatedServices = [selectedService]
            }
        } else if (isOtherExists && currentValue !== "others") {
            const removeOtherService = selectedServices.filter(item => item.value.toLowerCase() !== "others");
            const isExistService = selectedServices.find(item => item.value.toLowerCase() === currentValue);
            updatedServices = [...removeOtherService];

            if (isExistService) {
                updatedServices = removeOtherService.filter(item => item.value !== isExistService.value);
            } else {
                const selectedService = buildingAndGroundServiceList.find((item) => item.value.toLowerCase() === currentValue);
                if (selectedService) {
                    updatedServices.push(selectedService)
                }
            }
        } else if (existedSelectedServices) {
            updatedServices = selectedServices.filter(item => item.value.toLowerCase() !== currentValue);
        } else {
            const selectedService = buildingAndGroundServiceList.find((item) => item.value.toLowerCase() === currentValue);

            if (selectedService) {
                updatedServices = [...formBuildingAndGroundValues.buildingAndGroundServices.value, selectedService]
            }
        }

        setFormBuildingAndGroundValues({ ...formBuildingAndGroundValues, buildingAndGroundServices: { ...formBuildingAndGroundValues.buildingAndGroundServices, value: updatedServices } });
    }

    const handleFormValueChange = <T extends {}>(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        formValues: T,
        setFormValues: React.Dispatch<React.SetStateAction<T>>) => {
        const name = event.target.name;
        if (name in formValues) {
            const value = event.target.value;
            setFormValues({
                ...formValues,
                [name]: { ...formValues[name as keyof T], value },
            });
        }
    }

    const handleSelectChange = <T extends {}>(key: string, value: string, formValues: T, setFormValues: React.Dispatch<React.SetStateAction<T>>) => {
        if (formValues[key as keyof T]) {
            setFormValues({ ...formValues, [key]: { ...formValues[key as keyof T], value } });
        }
    }

    const handleCreateNewRequest = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            const hasError: boolean[] = [];
            let values: any = {};

            if (serviceType.serviceType.value === REQUEST_SERVICE_CONSTANTS.MANAGEMENT_INFORMATION_SYSTEM) {
                setServiceType({ serviceType: { ...serviceType.serviceType, isError: false } });
                const formValues = { ...formMISValues };
                values = {
                    problemType: "",
                    otherProblemType: "",
                    problemDetails: "",
                };
                for (const key in formValues) {
                    const input = formValues[key as keyof RequestMISFormTypes];

                    if (input.isRequired) {
                        if (!input.value) {
                            input.isError = true;
                            hasError.push(true);
                        }
                        else {
                            input.isError = false;
                        }

                        if (key === "problemType") {
                            if (formValues.problemType.value === "Others") {
                                formValues.otherProblemType.isRequired = true;
                            } else {
                                formValues.otherProblemType.isRequired = false;
                            }
                        }
                    }
                    if (input.value) {
                        values[key as keyof RequestMISFormTypes] = input.value;
                    }
                }

                setFormMISValues(formValues);

                if (!hasError.length) {
                    // SUBMIT MIS
                    console.log(values)

                }
            } else if (serviceType.serviceType.value === REQUEST_SERVICE_CONSTANTS.BUILDING_AND_GROUNDS_SERVICES) {
                setServiceType({ serviceType: { ...serviceType.serviceType, isError: false } });
                const formValues: RequestBuildingAndGroundFormTypes = { ...formBuildingAndGroundValues };
                values = {
                    buildingAndGroundServices: [],
                    descriptionOfWork: "",
                };
                for (const key in formValues) {
                    const input = formValues[key as keyof RequestBuildingAndGroundFormTypes];

                    if (input.isRequired) {

                        if (!input.value && typeof input.value === "string") {
                            input.isError = true;
                            hasError.push(true);
                        } else if (Array.isArray(input.value)) {
                            if (input.value.length) {
                                input.isError = false;
                            } else {
                                input.isError = true;
                                hasError.push(true);
                            }
                        } else {
                            input.isError = false;
                        }
                    }

                    if (Array.isArray(input.value)) {
                        values[key as keyof RequestBuildingAndGroundFormTypes] = input.value.map(item => item.value);
                    } else {
                        values[key as keyof RequestBuildingAndGroundFormTypes] = input.value;
                    }
                }

                setFormBuildingAndGroundValues(formValues);

                if (!hasError.length) {
                    // SUBMIT BUILDING AND GROUND
                    console.log(values)

                }
            } else {
                setServiceType({
                    serviceType: {
                        ...serviceType.serviceType, isError: true
                    }
                })
            }
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2" onClick={() => {
                    setServiceType({
                        serviceType: {
                            value: "",
                            message: "Service type is required.",
                            isError: false,
                            isRequired: true
                        },
                    })
                    setFormMISValues(initialMISValues);
                    setFormBuildingAndGroundValues(initialBuildingAndGroundValues);
                }}><FaPlus /> Create New Request </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[520px]">
                <DialogHeader>
                    <DialogTitle>Create New Request</DialogTitle>
                    <DialogDescription>
                        Fill up the details for new request.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="serviceType">
                            Service Type
                        </Label>
                        <Select
                            name="serviceType"
                            value={serviceType.serviceType.value}
                            onValueChange={(value: string) => handleSelectChange<{ serviceType: ValueFormType }>("serviceType", value, serviceType, setServiceType)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a Service" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Service Types</SelectLabel>
                                    <SelectItem value="Management Information System">Management Information System</SelectItem>
                                    <SelectItem value="Building and Grounds Services">Building and Grounds Services</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {
                            serviceType.serviceType.isError ? <p className="text-red-500 text-xs">{serviceType.serviceType.message}</p> : null
                        }
                    </div>
                    {
                        serviceType.serviceType.value === REQUEST_SERVICE_CONSTANTS.MANAGEMENT_INFORMATION_SYSTEM
                            ? (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="problemType">
                                            Problem Type
                                        </Label>
                                        <Select
                                            name="problemType"
                                            value={formMISValues.problemType.value}
                                            onValueChange={(value: string) => handleSelectChange<RequestMISFormTypes>("problemType", value, formMISValues, setFormMISValues)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Problem Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Problem Types</SelectLabel>
                                                    <SelectItem value="Computer Problem">Computer Problem</SelectItem>
                                                    <SelectItem value="Network Problem">Network Problem</SelectItem>
                                                    <SelectItem value="Others">Others</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {
                                            formMISValues.problemType.isError ? <p className="text-red-500 text-xs">{formMISValues.problemType.message}</p> : null
                                        }
                                    </div>
                                    {
                                        formMISValues.problemType.value === "Others"
                                            ? (
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="otherProblemType">
                                                        Other Problem Type
                                                    </Label>
                                                    <Input
                                                        id="otherProblemType"
                                                        name="otherProblemType"
                                                        className="w-full"
                                                        placeholder="Type the problem type."
                                                        value={formMISValues.otherProblemType.value}
                                                        onChange={(event) => handleFormValueChange<RequestMISFormTypes>(event, formMISValues, setFormMISValues)} />
                                                    {
                                                        formMISValues.otherProblemType.isError ? <p className="text-red-500 text-xs">{formMISValues.otherProblemType.message}</p> : null
                                                    }
                                                </div>
                                            )
                                            : null
                                    }
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="problemDetails">
                                            Problem Details
                                        </Label>
                                        <Textarea
                                            id="problemDetails"
                                            name="problemDetails"
                                            placeholder="Type the problem details here."
                                            className="w-full"
                                            rows={5}
                                            value={formMISValues.problemDetails.value}
                                            onChange={(event) => handleFormValueChange<RequestMISFormTypes>(event, formMISValues, setFormMISValues)} />
                                        {
                                            formMISValues.problemDetails.isError ? <p className="text-red-500 text-xs">{formMISValues.problemDetails.message}</p> : null
                                        }
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="isPriority">
                                            Is Priority?
                                        </Label>
                                        <Select
                                            name="isPriority"
                                            onValueChange={(value: string) => handleSelectChange<RequestMISFormTypes>("isPriority", value, formMISValues, setFormMISValues)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Is Priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Select Priority</SelectLabel>
                                                    <SelectItem value="Yes">Yes</SelectItem>
                                                    <SelectItem value="No">No</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {
                                            formMISValues.isPriority.isError ? <p className="text-red-500 text-xs">{formMISValues.isPriority.message}</p> : null
                                        }
                                    </div>
                                </>
                            )
                            : null
                    }

                    {
                        serviceType.serviceType.value === REQUEST_SERVICE_CONSTANTS.BUILDING_AND_GROUNDS_SERVICES
                            ? (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="buildingAndGroundServices">
                                            Select Building and Ground Services
                                        </Label>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="w-full justify-between font-normal"
                                                >
                                                    {formBuildingAndGroundValues.buildingAndGroundServices.value.length === 1 ? formBuildingAndGroundValues.buildingAndGroundServices.value[0].label : formBuildingAndGroundValues.buildingAndGroundServices.value.length > 1 ? `${formBuildingAndGroundValues.buildingAndGroundServices.value.length} services are selected` : "Select Services..."}
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput name="buildingAndGroundServices" placeholder="Search Services..." className="h-9" />
                                                    <CommandEmpty>No Services found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {buildingAndGroundServiceList.map((framework) => (
                                                            <CommandItem
                                                                key={framework.value}
                                                                value={framework.value}
                                                                onSelect={handleSelectedServices}
                                                            >
                                                                {framework.label}
                                                                {
                                                                    <CheckIcon
                                                                        className={cn(
                                                                            "ml-auto h-4 w-4",
                                                                            formBuildingAndGroundValues.buildingAndGroundServices.value.find(item => item.value === framework.value)?.value === framework.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                }

                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        {
                                            formBuildingAndGroundValues.buildingAndGroundServices.isError ? <p className="text-red-500 text-xs">{formBuildingAndGroundValues.buildingAndGroundServices.message}</p> : null
                                        }
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="descriptionOfWork">
                                            Description of Work to be Performed
                                        </Label>
                                        <Textarea
                                            id="descriptionOfWork"
                                            name="descriptionOfWork"
                                            placeholder="Type the problem details here."
                                            className="w-full"
                                            rows={5}
                                            onChange={(event) => handleFormValueChange<RequestBuildingAndGroundFormTypes>(event, formBuildingAndGroundValues, setFormBuildingAndGroundValues)} />
                                        {
                                            formBuildingAndGroundValues.descriptionOfWork.isError ? <p className="text-red-500 text-xs">{formBuildingAndGroundValues.descriptionOfWork.message}</p> : null
                                        }
                                    </div>
                                </>
                            )
                            : null
                    }

                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleCreateNewRequest}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
