import { cn } from "@/lib/utils"
import SystemLogo from "../assets/logo.svg";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import React, { useState } from 'react'
import { ChatBubbleIcon, DashboardIcon, GearIcon, PersonIcon } from '@radix-ui/react-icons';
import { BsGear, BsPersonGear } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/reduxHook";
import { setIsLoading } from "@/redux/features/global/globalSlice";
import { delay } from "@/helpers/global.helper";
import { removeCredentials } from "@/redux/features/auth/authSlice";
import { purgePersistor } from "@/redux/store";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]




const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

type NavLinksType = {
    id: number;
    isSelectedLink: boolean;
    title: string;
    link: string;
    classNames: string;
    icon: React.ReactNode;
}

function Navbar() {
    const [openProfileDropdown, setOpenProfileDropdown] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const navLinks: NavLinksType[] = [
        {
            id: 1,
            isSelectedLink: true,
            title: "Dashboard",
            link: "/",
            classNames: "",
            icon: <DashboardIcon />
        },
        {
            id: 2,
            isSelectedLink: false,
            title: "Request",
            link: "/requests",
            classNames: "",
            icon: <ChatBubbleIcon />
        },
        {
            id: 3,
            isSelectedLink: false,
            title: "Service",
            link: "/services",
            classNames: "",
            icon: <BsPersonGear />
        },
        {
            id: 4,
            isSelectedLink: false,
            title: "Users",
            link: "/users",
            classNames: "",
            icon: <PersonIcon />
        },
        {
            id: 5,
            isSelectedLink: false,
            title: "Settings",
            link: "/settings",
            classNames: "",
            icon: <BsGear />
        },
    ]

    const handleLogout = (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setOpenProfileDropdown(false);
            dispatch(setIsLoading({ isLoading: true }));

            delay(2000, () => {
                dispatch(removeCredentials());
                purgePersistor();
                navigate("/signin", { replace: true });
                dispatch(setIsLoading({ isLoading: false }));
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-screen-2xl items-center">
                    <div className="mr-4 hidden md:flex">
                        <a className="mr-6 flex items-center space-x-2" href="/">
                            <img src={SystemLogo} alt="logo" className="h-12 w-auto" />
                        </a>
                        <NavigationMenu>
                            <NavigationMenuList>
                                {
                                    navLinks.map((nav: NavLinksType) => (
                                        <NavigationMenuItem key={nav.title}>
                                            <Link to={nav.link} className={navigationMenuTriggerStyle() + " flex items-center gap-1 bg-transparent " + nav.classNames}>
                                                {nav.icon} {nav.title}
                                            </Link>
                                        </NavigationMenuItem>
                                    ))
                                }
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <DropdownMenu open={openProfileDropdown} onOpenChange={(e) => setOpenProfileDropdown(e)}>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Profile
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Billing
                                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Keyboard shortcuts
                                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>Email</DropdownMenuItem>
                                                <DropdownMenuItem>Message</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>More...</DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuItem>
                                        New Team
                                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>GitHub</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuItem disabled>API</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    Log out
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
            <Outlet />
        </div>
    )
}

export default Navbar


