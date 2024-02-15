import React from 'react'
import { FaPlus, FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@radix-ui/react-select'

export type TDesignationCard = {
    id: number;
    name: string;
    image: string;
    role: string;
    department: string;
    position: string;
    designation: string;
    isActive: boolean;
}

const DesignationCard = (props: TDesignationCard): React.JSX.Element => {

    return (
        <Card className="w-[350px] p-5">
            <CardContent className="p-3 flex flex-col gap-1 items-center">
                <Avatar className="w-full h-auto max-w-[100px]">
                    <AvatarImage src={props.image} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Badge className="text-sm font-medium mt-2 mb-2" variant="outline">{props.role}</Badge>

                <h3 className="text-lg font-semibold">{props.name}</h3>
                <small className="text-sm text-muted-foreground">{props.position}</small>

                <Badge className="text-sm font-medium mt-2 mb-2 text-center mt-3" >{props.department} </Badge>

                <div className="flex gap-1 justify-between w-full mt-5">
                    <Button variant="destructive" className="flex items-center gap-2"><FaRegCircleXmark /> Remove</Button>
                    {
                        props.isActive ? <Button variant="secondary" className="flex items-center gap-2"><FaRegCircleCheck /> Inactive</Button> : <Button className="flex items-center gap-2 bg-green-500"><FaRegCircleCheck /> Active</Button>
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default DesignationCard;