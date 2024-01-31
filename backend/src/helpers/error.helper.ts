export type ResponseTypes = {
	message?: string;
	error?: boolean;
	data?: any;
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


export const SetRequestResponse = (props: ResponseTypes): ResponseTypes => {
     const responseJson: ResponseTypes = {
        message: props.message || "",
        error: props.error || false,
        data: props.data || {},
        status: props?.status || 200,
    };

    return responseJson;
}

