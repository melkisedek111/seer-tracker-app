export type ResponseTypes<T = any> = {
	message?: string;
	error?: boolean;
	data?: T;
	status?: number;
};

export const ErrorCatchMessage = (
	error: any,
	json: ResponseTypes
): void => {
	console.log(error);
	json.status = 500;
	json.message = "Server Error";
	json.error = true;
};


export const SetRequestResponse = <T = any>(props: ResponseTypes<T>): ResponseTypes<T> => {
     const responseJson: ResponseTypes = {
        message: props.message || "",
        error: props.error || false,
        data: props.data || undefined,
        status: props?.status || 200,
    };

    return responseJson;
}

