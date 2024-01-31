export const handleFormValueChange = <T extends {}>(
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

export const handleSelectChange = <T extends {}>(key: string, value: string, formValues: T, setFormValues: React.Dispatch<React.SetStateAction<T>>) => {
    if (formValues[key as keyof T]) {
        setFormValues({ ...formValues, [key]: { ...formValues[key as keyof T], value } });
    }
}