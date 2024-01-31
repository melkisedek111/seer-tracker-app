import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Logo from "../assets/logo.svg"
import { useSigninMutation } from '@/redux/features/auth/authApi'
import { useAppDispatch } from '@/redux/reduxHook'
import { setIsLoading, setMessage } from '@/redux/features/global/globalSlice'
import { delay, errorShowHandler } from '@/helpers/global.helper'
import { setCredentials } from '@/redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

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

export type SignInUserType = {
    username: ValueFormType,
    password: ValueFormType
}

const SignInPage = () => {
    const initialSignInValue: SignInUserType = {
        username: {
            value: "",
            message: "username is required.",
            isError: false,
            isRequired: true
        },
        password: {
            value: "",
            message: "password is required.",
            isError: false,
            isRequired: true
        },
    }

    const [signInValue, setSignInValue] = useState<SignInUserType>(JSON.parse(JSON.stringify(initialSignInValue)));
    const [sigin] = useSigninMutation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            dispatch(setIsLoading({ isLoading: true }));
            const response = await sigin({ username: signInValue.username.value, password: signInValue.password.value })

            if ("data" in response) {
                dispatch(setCredentials({ ...response.data.data }));
                dispatch(setMessage({ message: response.data.message }));
                dispatch(setIsLoading({ isLoading: false }))
                navigate("/", { replace: true })
            }

            errorShowHandler(response, dispatch, setMessage);
        } catch (error) {
            console.log(error)
        } finally {
            delay(2000, () => {
                dispatch(setIsLoading({ isLoading: false }))
            });
        }
    }
    return (
        <section className="h-screen flex items-center justify-center">
            <Card className="w-[450px]">
                <CardContent className="p-4">
                    <img src={Logo} alt="logo" className="mb-5" />
                    <h2 className="text-4xl font-semibold">Sign In</h2>
                    <p className="leading-7">Please sign in your account credentials</p>

                    <form action="" className="mt-5 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="username">
                                Username / Email / Employee No.
                            </Label>
                            <Input
                                type="text"
                                name="username"
                                placeholder="Please enter your username / email / employee number"
                                value={signInValue.username.value}
                                onChange={(event) => handleFormValueChange<SignInUserType>(event, signInValue, setSignInValue)}
                            />
                            {
                                signInValue.username.isError ? <p className="text-red-500 text-xs">{signInValue.username.message}</p> : null
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">
                                Password
                            </Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Please enter your password"
                                value={signInValue.password.value}
                                onChange={(event) => handleFormValueChange<SignInUserType>(event, signInValue, setSignInValue)}
                            />
                            {
                                signInValue.password.isError ? <p className="text-red-500 text-xs">{signInValue.password.message}</p> : null
                            }
                        </div>
                        <Button onClick={handleSubmit}>Sign In</Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    )
}

export default SignInPage