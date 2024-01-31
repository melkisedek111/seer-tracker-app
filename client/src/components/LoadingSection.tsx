import React, { useEffect, useRef } from 'react'
import { Toaster } from './ui/toaster'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHook'
import Loading from "../assets/loading.svg";
import { useToast } from "@/components/ui/use-toast"
import { setMessage } from '@/redux/features/global/globalSlice';
import { FaCircleExclamation } from "react-icons/fa6";
import { ToastProps } from './ui/toast';

const LoadingSection = () => {
    const { isLoading, message, statusCode } = useAppSelector((state) => state.globalState);
    const ref = useRef<HTMLDivElement | null>(null);
    const { toast } = useToast();
    const dispatch = useAppDispatch();

    const errorStatuses = [400, 401, 404, 403]

    useEffect(() => {
        if (ref) {
            if (ref.current) {
                ref.current.addEventListener("click", (event: MouseEvent) => {
                    event.stopPropagation();
                })
            }
        }

        const isError = errorStatuses.includes(statusCode || 200);

        if (message) {
            toast({
                title: message,
                variant: isError ? "destructive" : "default",
                action: <FaCircleExclamation />
            })
        }

        dispatch(setMessage({ message: "" }))
    }, [message, isLoading])


    return (
        <div ref={ref} >
            <Toaster />
            {
                isLoading ? (<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[51]">
                    <img src={Loading} alt="loading" />
                </div>) : null
            }
        </div>
    )
}

export default LoadingSection