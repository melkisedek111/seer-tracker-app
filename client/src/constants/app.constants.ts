export const REQUEST_SERVICE_CONSTANTS = {
    MANAGEMENT_INFORMATION_SYSTEM: "Management Information System",
    BUILDING_AND_GROUNDS_SERVICES: "Building and Grounds Services",
    COMPUTER_PROBLEM: "Computer Problem",
    NETWORK_PROBLEM: "Network Problem",
    CARPENTRY_OR_MASONRY: "Carpentry/Masonry",
    PLUMBING: "Plumbing",
    PLANTING: "Planting",
    HAULING: "Hauling",
    GROUND_MAINTENANCE: "Ground Maintenance",
    MECHANICAL_WORKS: "Mechanical Works",
    ELECTRICAL: "Electrical",
    WIELDING: "Wielding",
}

export type ROLE_KEYS = "Super Admin" | "Admin" | "Regular";

export const ROLES: {
    SUPER_ADMIN: ROLE_KEYS;
    ADMIN: ROLE_KEYS;
    REGULAR: ROLE_KEYS;
} = {
    SUPER_ADMIN: "Super Admin",
    ADMIN: "Admin",
    REGULAR: "Regular",
}


export const ROLE_COLOR: { [key in ROLE_KEYS]: string } = {
    "Super Admin": "bg-yellow-400",
    "Admin": "bg-orange-400",
    "Regular": "bg-green-400",
}

export const ALLOWED_PAGE_BY_ROLE = {
    [ROLES.SUPER_ADMIN]: [
        "/",
        "/settings",
        "/users",
        "/requests"
    ]
}