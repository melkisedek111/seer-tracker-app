import React, { useEffect } from 'react'
import { FaArrowLeft, FaCircleCheck } from "react-icons/fa6";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ROLES } from '@/constants/app.constants';
import { handleFormValueChange, handleSelectChange } from '@/helpers/form.helper';


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

export type CreateUserType = {
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

type BasicInfoTypes = {
    firstName: ValueFormType;
    middleName: ValueFormType;
    lastName: ValueFormType;
    gender: ValueFormType;
    contact: ValueFormType;
    homeAddress: ValueFormType;
    email: ValueFormType;
}

type AssigningInfoTypes = {
    position: ValueFormType;
    department: ValueFormType;
}

type AccountInfoTypes = {
    employeeNumber: ValueFormType;
    role: ValueFormType;
    username: ValueFormType;
    password: ValueFormType;
    confirmPassword: ValueFormType;
}

type CardHeaderDetailType = {
    [key in number]: {
        title: string;
        description: string;
    }
}

type CreateUserSectionType = {
    setIsCreateUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateUserSection = ({ setIsCreateUser }: CreateUserSectionType) => {
    const initialBasicInfoValue: BasicInfoTypes = {
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
        gender: {
            value: "",
            message: "Gender is required.",
            isError: false,
            isRequired: true
        },
        email: {
            value: "",
            message: "Email address is required.",
            isError: false,
            isRequired: true,
            otherErrorMessage: {
                invalidEmail: {
                    message: "Email address is invalid.",
                    isError: false
                }
            }
        },
        homeAddress: {
            value: "",
            message: "Home address is required.",
            isError: false,
            isRequired: true,
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
        }
    }

    const initialAssigningInfo: AssigningInfoTypes = {
        position: {
            value: "",
            message: "Position name is required.",
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

    const initialAccountInfo: AccountInfoTypes = {
        employeeNumber: {
            value: "",
            message: "Employee number is required.",
            isError: false,
            isRequired: true
        },
        role: {
            value: "",
            message: "Role is required.",
            isError: false,
            isRequired: true
        },
        username: {
            value: "",
            message: "Username is required.",
            isError: false,
            isRequired: true
        },
        password: {
            value: "",
            message: "password is required.",
            isError: false,
            isRequired: true
        },
        confirmPassword: {
            value: "",
            message: "Confirm password is required.",
            isError: false,
            isRequired: true,
            otherErrorMessage: {
                invalidConfirmPassword: {
                    message: "Confirm password does not matched!",
                    isError: false,
                }
            }
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


    const [basicInfoValues, setBasicInfoValues] = useState<BasicInfoTypes>(JSON.parse(JSON.stringify(initialBasicInfoValue)));
    const [assigningInfoValue, setAssigningInfoValue] = useState<AssigningInfoTypes>(JSON.parse(JSON.stringify(initialAssigningInfo)));
    const [accountInfoValues, setAccountInfoValues] = useState<AccountInfoTypes>(JSON.parse(JSON.stringify(initialAccountInfo)));
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [completedSteps, setCompletedSteps] = useState({
        isFirstStepComplete: false,
        isSecondStepComplete: false,
        isThirdStepComplete: false
    })

    const handleBasicInfo = (event: React.FormEvent) => {
        try {
            event.preventDefault();
            const errors: boolean[] = [];
            let values: any = {};
            const formValues = { ...basicInfoValues };

            for (const key in formValues) {
                const input = formValues[key as keyof BasicInfoTypes];

                if (input.isRequired) {
                    if (!input.value) {
                        input.isError = true;
                        errors.push(true);
                    } else if (key === "contact") {
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
                                errors.push(true);
                            }
                        }
                    } else {
                        input.isError = false;
                    }
                }

                values[key as keyof CreateUserType] = input.value;
            }

            setBasicInfoValues(formValues);
            console.log({ formValues })
            if (!errors.length) {
                setCompletedSteps(prev => ({ ...prev, isFirstStepComplete: true }));
                setCurrentStep(prev => prev + 1)
            } else {
                setCompletedSteps(prev => ({ ...prev, isFirstStepComplete: false }));
            }
        } catch (error) {
            console.log({ error })
        }
    }

    const handleAssigningInfo = (event: React.FormEvent) => {
        try {
            event.preventDefault();
            const errors: boolean[] = [];
            let values: any = {};
            const formValues = { ...assigningInfoValue };

            for (const key in formValues) {
                const input = formValues[key as keyof AssigningInfoTypes];

                if (input.isRequired) {
                    if (!input.value) {
                        input.isError = true;
                        errors.push(true);
                    } else {
                        input.isError = false;
                    }
                }
                values[key as keyof CreateUserType] = input.value;
            }

            setAssigningInfoValue(formValues);
            if (!errors.length) {
                setCompletedSteps(prev => ({ ...prev, isSecondStepComplete: true }));
                setCurrentStep(prev => prev + 1)
            } else {
                setCompletedSteps(prev => ({ ...prev, isSecondStepComplete: false }));
            }
        } catch (error) {
            console.log({ error })
        }
    }

    const handleAccountInfo = (event: React.FormEvent) => {
        try {
            event.preventDefault();
            const errors: boolean[] = [];
            let values: any = {};
            const formValues = { ...accountInfoValues };

            for (const key in formValues) {
                const input = formValues[key as keyof AccountInfoTypes];

                if (input.isRequired) {
                    if (!input.value) {
                        input.isError = true;
                        errors.push(true);
                    } else if (key === "confirmPassword") {
                        input.isError = false;
                        const password = formValues.password.value;
                        const confirmPassword = input.value;
                        if (input.otherErrorMessage) {
                            if (confirmPassword !== password) {
                                input.otherErrorMessage.invalidConfirmPassword.isError = true;
                            } else {
                                input.otherErrorMessage.invalidConfirmPassword.isError = false;
                            }
                        }
                    } else {
                        input.isError = false;
                    }
                }

                values[key as keyof CreateUserType] = input.value;
            }

            setAccountInfoValues(formValues);
            if (!errors.length) {
                setCompletedSteps(prev => ({ ...prev, isThirdStepComplete: true }));
                const formValues: any = {};

                for(const key in basicInfoValues) {
                    formValues[key] = basicInfoValues[key as keyof BasicInfoTypes].value;
                }

                for(const key in assigningInfoValue) {
                    formValues[key] = assigningInfoValue[key as keyof AssigningInfoTypes].value;
                }

                for(const key in accountInfoValues) {
                    formValues[key] = accountInfoValues[key as keyof AccountInfoTypes].value;
                }

                console.log(formValues)

                setBasicInfoValues(initialBasicInfoValue)
                setAssigningInfoValue(initialAssigningInfo)
                setAccountInfoValues(initialAccountInfo)
            } else {
                setCompletedSteps(prev => ({ ...prev, isThirdStepComplete: false }));
            }
        } catch (error) {
            console.log({ error })
        }
    }

    const CARD_HEADER_DETAILS: CardHeaderDetailType = {
        1: {
            title: "Basic info",
            description: "Add primary information to this user you're creating"
        },
        2: {
            title: "Assigning info",
            description: "Assigning position and department to this user you're creating."
        },
        3: {
            title: "Account info",
            description: "Setup account details to this user you're creating."
        },
    }

    const handleNextStep = (event: React.FormEvent) => {

        if (currentStep === 1) {
            handleBasicInfo(event);
        } else if (currentStep === 2) {
            handleAssigningInfo(event);
        } else if (currentStep === 3) {
            handleAccountInfo(event);
        }
    }

    const handleBackStep = () => {
        setCurrentStep(prev => prev - 1)
    }

    return (
        <section>
            <div className="container max-w-screen-2xl space-y-4 p-8 pt-8">
                <div className="flex gap-2 items-center">
                    <h2 className="text-lg text-muted-foreground flex items-center gap-2 cursor-pointer" onClick={() => setIsCreateUser(false)}><FaArrowLeft /> Users</h2>
                </div>
                <div className="w-full flex items-center justify-between pb-5 border-b">
                    <h2 className="text-4xl font-bold tracking-tight">Create New User</h2>
                    <div className="flex items-center space-x-2">
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <ol className="items-center w-full space-y-4 sm:flex sm:space-x-10 sm:space-y-0 rtl:space-x-reverse">
                            <li className={`flex items-center ${completedSteps.isFirstStepComplete ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"} space-x-2.5 rtl:space-x-reverse ${currentStep === 1 ? "text-orange-600 dark:text-orange-500" : ""}`}>
                                <span className={`flex items-center justify-center w-8 h-8 border ${completedSteps.isFirstStepComplete ? "border-blue-600 dark:border-blue-500" : "border-gray-500 dark:border-gray-400"} rounded-full shrink-0 ${currentStep === 1 ? "border-orange-600 dark:border-orange-500" : ""}`}>
                                    {completedSteps.isFirstStepComplete ? <FaCircleCheck /> : 1}
                                </span>
                                <span>
                                    <h3 className="font-medium leading-tight">Basic info</h3>
                                    <p className="text-sm">Add basic details about the user</p>
                                </span>
                            </li>
                            <li className={`flex items-center ${completedSteps.isSecondStepComplete ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"} space-x-2.5 rtl:space-x-reverse ${currentStep === 2 ? "text-orange-600 dark:text-orange-500" : ""}`}>
                                <span className={`flex items-center justify-center w-8 h-8 border ${completedSteps.isSecondStepComplete ? "border-blue-600 dark:border-blue-500" : "border-gray-500 dark:border-gray-400"} rounded-full shrink-0 ${currentStep === 2 ? "border-orange-600 dark:border-orange-500" : ""}`}>
                                    {completedSteps.isSecondStepComplete ? <FaCircleCheck /> : 2}
                                </span>
                                <span>
                                    <h3 className="font-medium leading-tight">Assigning info</h3>
                                    <p className="text-sm">User assignment</p>
                                </span>
                            </li>
                            <li className={`flex items-center ${completedSteps.isThirdStepComplete ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"} space-x-2.5 rtl:space-x-reverse ${currentStep === 3 ? "text-orange-600 dark:text-orange-500" : ""}`}>
                                <span className={`flex items-center justify-center w-8 h-8 border ${completedSteps.isThirdStepComplete ? "border-blue-600 dark:border-blue-500" : "border-gray-500 dark:border-gray-400"} rounded-full shrink-0 ${currentStep === 3 ? "border-orange-600 dark:border-orange-500" : ""}`}>
                                    {completedSteps.isThirdStepComplete ? <FaCircleCheck /> : 3}
                                </span>
                                <span>
                                    <h3 className="font-medium leading-tight">Account info</h3>
                                    <p className="text-sm">Setup the user account</p>
                                </span>
                            </li>
                        </ol>
                    </div>
                    <div className="flex gap-2">
                        {
                            currentStep !== 1 ? <Button size="lg" variant="outline" onClick={handleBackStep}>Back</Button> : null
                        }
                        <Button size="lg" onClick={handleNextStep} >{currentStep === 3 ? "Create" : "Next"}</Button>
                    </div>
                </div>
                <div className="pt-5">
                    <Card>
                        <CardHeader className="border-b">
                            <h2 className="text-2xl font-semibold">{CARD_HEADER_DETAILS[currentStep as keyof CardHeaderDetailType].title}</h2>
                            <CardDescription>
                                {CARD_HEADER_DETAILS[currentStep as keyof CardHeaderDetailType].description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="py-6">
                            <div className="flex">
                                <div className="w-3/5 flex flex-col gap-4">
                                    {
                                        currentStep === 1 && <>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="firstName">
                                                        First Name
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="firstName"
                                                        value={basicInfoValues.firstName.value}
                                                        onChange={(event) => handleFormValueChange<BasicInfoTypes>(event, basicInfoValues, setBasicInfoValues)}
                                                    />
                                                    {
                                                        basicInfoValues.firstName.isError ? <p className="text-red-500 text-xs">{basicInfoValues.firstName.message}</p> : null
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="middleName">
                                                        Middle Name
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="middleName"
                                                        value={basicInfoValues.middleName.value}
                                                        onChange={(event) => handleFormValueChange<BasicInfoTypes>(event, basicInfoValues, setBasicInfoValues)}
                                                    />
                                                    {
                                                        basicInfoValues.middleName.isError ? <p className="text-red-500 text-xs">{basicInfoValues.middleName.message}</p> : null
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="lastName">
                                                        Last Name
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="lastName"
                                                        value={basicInfoValues.lastName.value}
                                                        onChange={(event) => handleFormValueChange<BasicInfoTypes>(event, basicInfoValues, setBasicInfoValues)}
                                                    />
                                                    {
                                                        basicInfoValues.lastName.isError ? <p className="text-red-500 text-xs">{basicInfoValues.lastName.message}</p> : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-1/4 flex flex-col gap-2">
                                                    <Label htmlFor="gender">
                                                        Gender
                                                    </Label>
                                                    <Select
                                                        name="gender"
                                                        value={basicInfoValues.gender.value}
                                                        onValueChange={(value: string) => handleSelectChange<BasicInfoTypes>("gender", value, basicInfoValues, setBasicInfoValues)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Select position</SelectLabel>
                                                                <SelectItem value="Male">Male</SelectItem>
                                                                <SelectItem value="Female">Female</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    {
                                                        basicInfoValues.gender.isError ? <p className="text-red-500 text-xs">{basicInfoValues.gender.message}</p> : null
                                                    }
                                                </div>
                                                <div className="w-3/4 flex flex-col gap-2">
                                                    <Label htmlFor="contact">
                                                        Contact Number
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="contact"
                                                        value={basicInfoValues.contact.value}
                                                        onChange={(event) => handleFormValueChange<BasicInfoTypes>(event, basicInfoValues, setBasicInfoValues)}
                                                    />
                                                    {
                                                        basicInfoValues.contact.isError ? <p className="text-red-500 text-xs">{basicInfoValues.contact.message}</p> : null
                                                    }
                                                    {
                                                        basicInfoValues.contact?.otherErrorMessage?.invalidContact?.isError ? <p className="text-red-500 text-xs">{basicInfoValues.contact?.otherErrorMessage?.invalidContact.message}</p> : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="lastName">
                                                        Home Address
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="homeAddress"
                                                        value={basicInfoValues.homeAddress.value}
                                                        onChange={(event) => handleFormValueChange<BasicInfoTypes>(event, basicInfoValues, setBasicInfoValues)}
                                                    />
                                                    {
                                                        basicInfoValues.homeAddress.isError ? <p className="text-red-500 text-xs">{basicInfoValues.homeAddress.message}</p> : null
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="email">
                                                        Email Address
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="email"
                                                        value={basicInfoValues.email.value}
                                                        onChange={(event) => handleFormValueChange<BasicInfoTypes>(event, basicInfoValues, setBasicInfoValues)}
                                                    />
                                                    {
                                                        basicInfoValues.email.isError ? <p className="text-red-500 text-xs">{basicInfoValues.email.message}</p> : null
                                                    }
                                                    {
                                                        basicInfoValues.email?.otherErrorMessage?.invalidEmail?.isError ? <p className="text-red-500 text-xs">{basicInfoValues.email?.otherErrorMessage?.invalidEmail.message}</p> : null
                                                    }
                                                </div>
                                            </div>

                                        </>
                                    }
                                    {
                                        currentStep === 2 && <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="position">
                                                        Position
                                                    </Label>
                                                    <Select
                                                        name="position"
                                                        value={assigningInfoValue.position.value}
                                                        onValueChange={(value: string) => handleSelectChange<AssigningInfoTypes>("position", value, assigningInfoValue, setAssigningInfoValue)}>
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
                                                        assigningInfoValue.position.isError ? <p className="text-red-500 text-xs">{assigningInfoValue.position.message}</p> : null
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="department">
                                                        Departments
                                                    </Label>
                                                    <Select
                                                        name="department"
                                                        value={assigningInfoValue.department.value}
                                                        onValueChange={(value: string) => handleSelectChange<AssigningInfoTypes>("department", value, assigningInfoValue, setAssigningInfoValue)}>
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
                                                        assigningInfoValue.department.isError ? <p className="text-red-500 text-xs">{assigningInfoValue.department.message}</p> : null
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    }

                                    {
                                        currentStep === 3 && <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="employeeNumber">
                                                        Employee No.
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="employeeNumber"
                                                        value={accountInfoValues.employeeNumber.value}
                                                        onChange={(event) => handleFormValueChange<AccountInfoTypes>(event, accountInfoValues, setAccountInfoValues)}
                                                    />
                                                    {
                                                        accountInfoValues.employeeNumber.isError ? <p className="text-red-500 text-xs">{accountInfoValues.employeeNumber.message}</p> : null
                                                    }
                                                </div>

                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="firstName">
                                                        Role
                                                    </Label>
                                                    <Select
                                                        name="role"
                                                        value={accountInfoValues.role.value}
                                                        onValueChange={(value: string) => handleSelectChange<AccountInfoTypes>("role", value, accountInfoValues, setAccountInfoValues)}>
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
                                                        accountInfoValues.role.isError ? <p className="text-red-500 text-xs">{accountInfoValues.role.message}</p> : null
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="username">
                                                        Username
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="username"
                                                        value={accountInfoValues.username.value}
                                                        onChange={(event) => handleFormValueChange<AccountInfoTypes>(event, accountInfoValues, setAccountInfoValues)}
                                                    />
                                                    {
                                                        accountInfoValues.username.isError ? <p className="text-red-500 text-xs">{accountInfoValues.username.message}</p> : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="password">
                                                        Password
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="password"
                                                        value={accountInfoValues.password.value}
                                                        onChange={(event) => handleFormValueChange<AccountInfoTypes>(event, accountInfoValues, setAccountInfoValues)}
                                                    />
                                                    {
                                                        accountInfoValues.password.isError ? <p className="text-red-500 text-xs">{accountInfoValues.password.message}</p> : null
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="confirmPassword">
                                                        Confirm Password
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="confirmPassword"
                                                        value={accountInfoValues.confirmPassword.value}
                                                        onChange={(event) => handleFormValueChange<AccountInfoTypes>(event, accountInfoValues, setAccountInfoValues)}
                                                    />
                                                    {
                                                        accountInfoValues.confirmPassword.isError ? <p className="text-red-500 text-xs">{accountInfoValues.confirmPassword.message}</p> : null
                                                    }
                                                    {
                                                        accountInfoValues.confirmPassword?.otherErrorMessage?.invalidConfirmPassword?.isError ? <p className="text-red-500 text-xs">{accountInfoValues.confirmPassword?.otherErrorMessage?.invalidConfirmPassword.message}</p> : null
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default CreateUserSection