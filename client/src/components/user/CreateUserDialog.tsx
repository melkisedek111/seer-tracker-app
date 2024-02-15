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
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { ROLES } from "@/constants/app.constants"



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

export type CreateUserTypes = {
    employeeNumber: ValueFormType;
    firstName: ValueFormType;
    middleName: ValueFormType;
    lastName: ValueFormType;
    email: ValueFormType;
    contact: ValueFormType;
    role: ValueFormType;
    position: ValueFormType;
    department: ValueFormType;
}


export function CreateUserDialog() {
    const initialCreateUserValue: CreateUserTypes = {
        employeeNumber: {
            value: "",
            message: "Employee number is required.",
            isError: false,
            isRequired: true
        },
        firstName: {
            value: "",
            message: "First name is required.",
            isError: false,
            isRequired: true
        },
        middleName: {
            value: "",
            message: "",
            isError: false,
            isRequired: false
        },
        lastName: {
            value: "",
            message: "Last name is required.",
            isError: false,
            isRequired: true
        },
        email: {
            value: "",
            message: "Email is required.",
            isError: false,
            isRequired: true,
            otherErrorMessage: {
                invalidEmail: {
                    message: "Email address is invalid.",
                    isError: false
                }
            }
        },
        contact: {
            value: "",
            message: "Contact number is required.",
            isError: false,
            isRequired: true,
            otherErrorMessage: {
                invalidContact: {
                    message: "Contact format is invalid. (e.g. 09xxxxxxxxxx)",
                    isError: false
                }
            }
        },
        role: {
            value: "",
            message: "Roles is required.",
            isError: false,
            isRequired: true
        },
        position: {
            value: "",
            message: "Position is required.",
            isError: false,
            isRequired: true
        },
        department: {
            value: "",
            message: "Department is required.",
            isError: false,
            isRequired: true
        },
    }

    const positions = [
        {
            value: "1",
            label: "Administrative Aid I",
        },
        {
            value: "2",
            label: "Administrative Aid II",
        },
        {
            value: "3",
            label: "Professor I",
        },
        {
            value: "4",
            label: "Instructor I",
        }
    ]

    const departments = [
        {
            value: "1",
            label: "College of Education",
        },
        {
            value: "2",
            label: "Science Department",
        },
        {
            value: "3",
            label: "Human Resources",
        },
        {
            value: "4",
            label: "IT Department",
        },
        {
            value: "5",
            label: "Finance Department",
        },
        {
            value: "6",
            label: "Marketing Department",
        },
        {
            value: "7",
            label: "Project Management",
        },
        {
            value: "8",
            label: "Creative Department",
        },
        {
            value: "9",
            label: "Customer Service",
        },
        {
            value: "10",
            label: "Legal Department",
        },
    ]

    const ROLES_DATA = [
        {
            value: ROLES.SUPER_ADMIN,
            label: ROLES.SUPER_ADMIN,
        },
        {
            value: ROLES.ADMIN,
            label: ROLES.ADMIN,
        },
        {
            value: ROLES.REGULAR,
            label: ROLES.REGULAR,
        },
    ]



    const [formCreateUserValues, setFormCreateUserValues] = useState<CreateUserTypes>(JSON.parse(JSON.stringify(initialCreateUserValue)));

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

    const handleCreateUser = (event: React.FormEvent) => {
        try {
            event.preventDefault();
            const hasError: boolean[] = [];
            let values: any = {};
            const formValues = { ...formCreateUserValues };

            for (const key in formValues) {
                const input = formValues[key as keyof CreateUserTypes];

                if (input.isRequired) {
                    if (!input.value) {
                        input.isError = true;
                        hasError.push(true);
                    } else if (key === "email" || key === "contact") {
                        input.isError = false;
                        const regex = {
                            "email": /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            "contact": /^09\d{9}$/
                        }
                        const accessor = {
                            "email": "invalidEmail",
                            "contact": "invalidContact"
                        }
                        if (input.otherErrorMessage) {
                            if (regex[key as "email" | "contact"].test(input.value)) {
                                input.otherErrorMessage[accessor[key]].isError = false;
                            } else {
                                input.otherErrorMessage[accessor[key]].isError = true;
                                hasError.push(true);
                            }
                        }
                    } else {
                        input.isError = false;
                    }
                }

                values[key as keyof CreateUserTypes] = input.value;
            }
            setFormCreateUserValues(formValues)
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2" onClick={() => {
                    setFormCreateUserValues(initialCreateUserValue);
                }}><FaPlus /> Create User </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[520px]">
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>
                        Fill up the details for new request.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="employeeNumber">
                            Employee Number
                        </Label>
                        <Input
                            type="text"
                            name="employeeNumber"
                            value={formCreateUserValues.employeeNumber.value}
                            onChange={(event) => handleFormValueChange<CreateUserTypes>(event, formCreateUserValues, setFormCreateUserValues)}
                        />
                        {
                            formCreateUserValues.employeeNumber.isError ? <p className="text-red-500 text-xs">{formCreateUserValues.employeeNumber.message}</p> : null
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="firstName">
                            First Name
                        </Label>
                        <Input
                            type="text"
                            name="firstName"
                            value={formCreateUserValues.firstName.value}
                            onChange={(event) => handleFormValueChange<CreateUserTypes>(event, formCreateUserValues, setFormCreateUserValues)}
                        />
                        {
                            formCreateUserValues.firstName.isError ? <p className="text-red-500 text-xs">{formCreateUserValues.firstName.message}</p> : null
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="middleName">
                            Middle Name
                        </Label>
                        <Input
                            type="text"
                            name="middleName"
                            value={formCreateUserValues.middleName.value}
                            onChange={(event) => handleFormValueChange<CreateUserTypes>(event, formCreateUserValues, setFormCreateUserValues)}
                        />
                        {
                            formCreateUserValues.middleName.isError ? <p className="text-red-500 text-xs">{formCreateUserValues.middleName.message}</p> : null
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="lastName">
                            Last Name
                        </Label>
                        <Input
                            type="text"
                            name="lastName"
                            value={formCreateUserValues.lastName.value}
                            onChange={(event) => handleFormValueChange<CreateUserTypes>(event, formCreateUserValues, setFormCreateUserValues)}
                        />
                        {
                            formCreateUserValues.lastName.isError ? <p className="text-red-500 text-xs">{formCreateUserValues.lastName.message}</p> : null
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">
                            Email Address
                        </Label>
                        <Input
                            type="text"
                            name="email"
                            value={formCreateUserValues.email.value}
                            onChange={(event) => handleFormValueChange<CreateUserTypes>(event, formCreateUserValues, setFormCreateUserValues)}
                        />
                        {
                            formCreateUserValues.email.isError ? <p className="text-red-500 text-xs">{formCreateUserValues.email.message}</p> : null
                        }
                        {
                            formCreateUserValues.email?.otherErrorMessage?.invalidEmail?.isError ? <p className="text-red-500 text-xs">{formCreateUserValues.email?.otherErrorMessage?.invalidEmail.message}</p> : null
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="contact">
                            Contact Number
                        </Label>
                        <Input
                            type="contact"
                            name="contact"
                            value={formCreateUserValues.contact.value}
                            onChange={(event) => handleFormValueChange<CreateUserTypes>(event, formCreateUserValues, setFormCreateUserValues)}
                        />
                        {
                            formCreateUserValues.contact.isError ? <p className="text-red-500 text-xs">{formCreateUserValues.contact.message}</p> : null
                        }
                        {
                            formCreateUserValues.contact?.otherErrorMessage?.invalidContact?.isError ? <p className="text-red-500 text-xs">{formCreateUserValues.contact?.otherErrorMessage?.invalidContact.message}</p> : null
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="role">
                            Role
                        </Label>
                        <Select
                            name="role"
                            value={formCreateUserValues.role.value}
                            onValueChange={(value: string) => handleSelectChange<CreateUserTypes>("role", value, formCreateUserValues, setFormCreateUserValues)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Role</SelectLabel>
                                    {
                                        ROLES_DATA.map(item => (
                                            <SelectItem key={item.label} value={item.value}>{item.label}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {
                            formCreateUserValues.role.isError ? <p className="text-red-500 text-xs">{formCreateUserValues.role.message}</p> : null
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="position">
                            Position
                        </Label>
                        <Select
                            name="position"
                            value={formCreateUserValues.position.value}
                            onValueChange={(value: string) => handleSelectChange<CreateUserTypes>("position", value, formCreateUserValues, setFormCreateUserValues)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select position</SelectLabel>
                                    {
                                        positions.map(item => (
                                            <SelectItem key={item.label} value={item.value}>{item.label}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {
                            formCreateUserValues.position.isError ? <p className="text-red-500 text-xs">{formCreateUserValues.position.message}</p> : null
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="department">
                            Departments
                        </Label>
                        <Select
                            name="department"
                            value={formCreateUserValues.department.value}
                            onValueChange={(value: string) => handleSelectChange<CreateUserTypes>("department", value, formCreateUserValues, setFormCreateUserValues)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select department</SelectLabel>
                                    {
                                        departments.map(item => (
                                            <SelectItem key={item.label} value={item.value}>{item.label}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {
                            formCreateUserValues.department.isError ? <p className="text-red-500 text-xs">{formCreateUserValues.department.message}</p> : null
                        }
                    </div>
                </div>
                <DialogFooter >
                    <Button type="submit" onClick={handleCreateUser}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
