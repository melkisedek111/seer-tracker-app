export const delay = async (ms: number, callback: () => void | undefined) => {
    if (callback === undefined) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setTimeout(callback, ms);
}

export const errorShowHandler = (response: any, dispatch: any, setMessage: any) => {
    if("error" in response) {
        if ("data" in response.error) {
            const data = response?.error?.data as any;
            dispatch(setMessage({message: data.message, statusCode: data.status}));
        }
    }
}