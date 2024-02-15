import React from 'react'
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
import { Badge } from '@/components/ui/badge'
import { FaCirclePlus } from "react-icons/fa6";
import { Checkbox } from '@/components/ui/checkbox'

export type ComboBoxValueTypes = { value: string | undefined, label: string }
type CustomMultiComboBoxTypes = {
    data: ComboBoxValueTypes[];
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    open?: boolean;
    value: string | ComboBoxValueTypes[]
    setValue: React.Dispatch<React.SetStateAction<string | ComboBoxValueTypes[]>>;
    title: string
}

const CustomMultiComboBox = ({ data, setOpen, open, value, setValue, title }: CustomMultiComboBoxTypes): React.ReactNode => {
    const isArray = Array.isArray(value);

    const handleMultiSelect = (currentValue: string) => {
        if (isArray) {
            const items = [...value];
            const existedSelectedItems = items.find(item => item?.value && item?.value.toLowerCase() === currentValue);
            let updatedServices: ComboBoxValueTypes[] = [];

            if (existedSelectedItems) {
                updatedServices = items.filter(item => item?.value && item.value.toLowerCase() !== currentValue);
            } else {
                const selectedItem = data.find((item) => item?.value && item.value.toLowerCase() === currentValue);

                if (selectedItem) {
                    updatedServices = [...items, selectedItem]
                }
            }

            setValue(updatedServices);
        } else {
            setValue(currentValue);
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="flex items-center gap-2"
                >
                    {
                        isArray ? (
                            <>
                                <FaCirclePlus className="shrink-0 opacity-50" />
                                {title}
                                <div className="flex items-center gap-1 text-sm border-l pl-2">
                                    {
                                        value.length > 2 ? <Badge variant="secondary">{value.length} Selected</Badge>
                                            : value.map(item => (
                                                <Badge key={item.label} variant="secondary">{item.label}</Badge>
                                            ))
                                    }
                                </div>
                            </>
                        ) : (
                            <>
                                {value
                                    ? data.find((item) => item.value === value)?.label
                                    : "Select item..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />

                            </>
                        )
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Department" className="h-9" />
                    <CommandEmpty>No {title} Found.</CommandEmpty>
                    <CommandGroup>
                        {
                            isArray ?
                                data.map((item) => {
                                    const isChecked = !!value.find(selectedItem => selectedItem.value === item.value)
                                    return (
                                        <CommandItem
                                            key={item.value}
                                            value={item.value}
                                            onSelect={handleMultiSelect}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Checkbox id="terms" checked={isChecked} className="rounded-sm" />
                                                {item.label}
                                            </div>
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    isChecked ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    )
                                })
                                : data.map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        value={item.value}
                                        onSelect={handleMultiSelect}
                                    >
                                        {item.label}
                                        {
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    value === item.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        }

                                    </CommandItem>
                                ))
                        }

                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default CustomMultiComboBox