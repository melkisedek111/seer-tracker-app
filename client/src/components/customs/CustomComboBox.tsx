import * as React from "react"
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

type TCustomComboBox = {
    label: string;
    items: {
        value: string;
        label: string;
    }[],
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const CustomComboBox = (props: TCustomComboBox) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {props.value
                        ? props.items.find((item) => item.value === props.value)?.label
                        : `Select ${props.label.toLowerCase()}`}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder={`Search for ${props.label.toLowerCase()}`} className="h-9" />
                    <CommandEmpty>{props.label ? "Select " + props.label : "No items found."}</CommandEmpty>
                    <CommandGroup>
                        {props.items.map((item) => (
                            <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={(currentValue: any) => {
                                    props.setValue(currentValue === props.value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                {item.label}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        props.value === item.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default CustomComboBox
