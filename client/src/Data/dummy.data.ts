import { ServiceRequestCardTypes } from "@/components/RequestPage";

export const REQUEST_DATA: ServiceRequestCardTypes[] = [
	{
		requestId: 1,
		requestNo: "20230115-0001",
		isPriority: true,
		title: "Network connection issue",
		createdAt: "2024-01-14T09:45:00Z",
		problemType: "Network Problem",
		serviceType: "Management Information System",
		completedAt: "2024-01-16T10:15:00Z",
		requestBy: "Evelyn Rodriguez",
		requesterDepartment: "Department of Computer Science",
		requestDetails: "Network cables are not functioning properly",
		process: {
			details: {
				status: "COMPLETED",
			},
			unitApproval: {
				status: "COMPLETED",
				assignedPerson: "David E. Smith",
			},
			recommendingApproval: {
				status: "COMPLETED",
				assignedPerson: "Sarah J. Turner",
			},
			serviceApproval: {
				status: "COMPLETED",
				assignedPerson: "Sarah J. Turner",
			},
			serviceAssigned: {
				status: "PENDING",
				assignedPerson: "Michael A. Johnson",
			},
			completion: {
				status: "PENDING",
			},
		},
	},
	{
		requestId: 2,
		requestNo: "20230115-0002",
		isPriority: false,
		title: "Leaking faucet in the restroom",
		createdAt: "2024-01-14T10:30:00Z",
		problemType: "Plumbing",
		serviceType: "Building and Grounds Services",
		completedAt: "2024-01-16T11:00:00Z",
		requestBy: "Andrew Baker",
		requesterDepartment: "Department of Facilities Management",
		requestDetails: "Faucet in the third-floor restroom is leaking",
		process: {
			details: {
				status: "COMPLETED",
			},
			unitApproval: {
				status: "COMPLETED",
				assignedPerson: "Jennifer L. Davis",
			},
			recommendingApproval: {
				status: "COMPLETED",
				assignedPerson: "Robert M. Thompson",
			},
			serviceApproval: {
				status: "COMPLETED",
				assignedPerson: "Robert M. Thompson",
			},
			serviceAssigned: {
				status: "PENDING",
				assignedPerson: "Linda P. White",
			},
			completion: {
				status: "PENDING",
			},
		},
	},
	{
		requestId: 3,
		requestNo: "20230115-0003",
		isPriority: true,
		title: "Computer not powering on",
		createdAt: "2024-01-14T11:15:00Z",
		problemType: "Computer Problem",
		serviceType: "Management Information System",
		completedAt: "2024-01-16T11:45:00Z",
		requestBy: "Alexis Foster",
		requesterDepartment: "Department of Information Technology",
		requestDetails: "Computer in room 203 is not turning on",
		process: {
			details: {
				status: "COMPLETED",
			},
			unitApproval: {
				status: "COMPLETED",
				assignedPerson: "Daniel K. Lee",
			},
			recommendingApproval: {
				status: "COMPLETED",
				assignedPerson: "Megan R. Turner",
			},
			serviceApproval: {
				status: "COMPLETED",
				assignedPerson: "Megan R. Turner",
			},
			serviceAssigned: {
				status: "PENDING",
				assignedPerson: "Kevin J. Murphy",
			},
			completion: {
				status: "PENDING",
			},
		},
	},
	{
		requestId: 4,
		requestNo: "20230115-0004",
		isPriority: false,
		title: "Broken window in the conference room",
		createdAt: "2024-01-14T12:00:00Z",
		problemType: "Carpentry/Masonry",
		serviceType: "Building and Grounds Services",
		completedAt: "2024-01-16T12:30:00Z",
		requestBy: "Brandon Clark",
		requesterDepartment: "Department of Architecture",
		requestDetails: "Window in the conference room needs repair",
		process: {
			details: {
				status: "COMPLETED",
			},
			unitApproval: {
				status: "COMPLETED",
				assignedPerson: "Olivia M. Taylor",
			},
			recommendingApproval: {
				status: "COMPLETED",
				assignedPerson: "Samuel A. Davis",
			},
			serviceApproval: {
				status: "COMPLETED",
				assignedPerson: "Samuel A. Davis",
			},
			serviceAssigned: {
				status: "PENDING",
				assignedPerson: "Jessica L. White",
			},
			completion: {
				status: "PENDING",
			},
		},
	},
	{
		requestId: 5,
		requestNo: "20230115-0005",
		isPriority: true,
		title: "Power outage in room 301",
		createdAt: "2024-01-14T12:45:00Z",
		problemType: "Electrical",
		serviceType: "Building and Grounds Services",
		completedAt: "2024-01-16T13:15:00Z",
		requestBy: "Cameron Turner",
		requesterDepartment: "Department of Electrical Engineering",
		requestDetails: "No power in room 301, need immediate attention",
		process: {
			details: {
				status: "COMPLETED",
			},
			unitApproval: {
				status: "COMPLETED",
				assignedPerson: "Emily S. Johnson",
			},
			recommendingApproval: {
				status: "COMPLETED",
				assignedPerson: "Brian M. White",
			},
			serviceApproval: {
				status: "COMPLETED",
				assignedPerson: "Brian M. White",
			},
			serviceAssigned: {
				status: "PENDING",
				assignedPerson: "Christopher E. Baker",
			},
			completion: {
				status: "PENDING",
			},
		},
	},
	{
		requestId: 6,
		requestNo: "20230115-0006",
		isPriority: false,
		title: "Hauling of old furniture",
		createdAt: "2024-01-14T13:30:00Z",
		problemType: "Hauling",
		serviceType: "Building and Grounds Services",
		completedAt: "2024-01-16T14:00:00Z",
		requestBy: "Diana Roberts",
		requesterDepartment: "Department of Interior Design",
		requestDetails: "Dispose of old furniture in room 102",
		process: {
			details: {
				status: "COMPLETED",
			},
			unitApproval: {
				status: "COMPLETED",
				assignedPerson: "Gary J. Turner",
			},
			recommendingApproval: {
				status: "COMPLETED",
				assignedPerson: "Melissa A. Garcia",
			},
			serviceApproval: {
				status: "COMPLETED",
				assignedPerson: "Melissa A. Garcia",
			},
			serviceAssigned: {
				status: "PENDING",
				assignedPerson: "Victoria L. Clark",
			},
			completion: {
				status: "PENDING",
			},
		},
	},
	{
		requestId: 7,
		requestNo: "20230115-0007",
		isPriority: true,
		title: "Mechanical issue with lab equipment",
		createdAt: "2024-01-14T14:15:00Z",
		problemType: "Mechanical Works",
		serviceType: "Management Information System",
		completedAt: "2024-01-16T14:45:00Z",
		requestBy: "Ethan Turner",
		requesterDepartment: "Department of Mechanical Engineering",
		requestDetails: "Lab equipment in room 404 has a mechanical problem",
		process: {
			details: {
				status: "COMPLETED",
			},
			unitApproval: {
				status: "COMPLETED",
				assignedPerson: "Nathan R. Davis",
			},
			recommendingApproval: {
				status: "COMPLETED",
				assignedPerson: "Emma L. Turner",
			},
			serviceApproval: {
				status: "COMPLETED",
				assignedPerson: "Emma L. Turner",
			},
			serviceAssigned: {
				status: "PENDING",
				assignedPerson: "Christopher J. Clark",
			},
			completion: {
				status: "PENDING",
			},
		},
	},
	{
		requestId: 8,
		requestNo: "20230115-0008",
		isPriority: false,
		title: "Landscaping in the courtyard",
		createdAt: "2024-01-14T15:00:00Z",
		problemType: "Planting",
		serviceType: "Building and Grounds Services",
		completedAt: "2024-01-16T15:30:00Z",
		requestBy: "Fiona Baker",
		requesterDepartment: "Department of Environmental Science",
		requestDetails: "Plant new flowers in the courtyard",
		process: {
			details: {
				status: "COMPLETED",
			},
			unitApproval: {
				status: "COMPLETED",
				assignedPerson: "Nicholas E. Turner",
			},
			recommendingApproval: {
				status: "COMPLETED",
				assignedPerson: "Isabella M. Garcia",
			},
			serviceApproval: {
				status: "COMPLETED",
				assignedPerson: "Isabella M. Garcia",
			},
			serviceAssigned: {
				status: "PENDING",
				assignedPerson: "John D. Baker",
			},
			completion: {
				status: "PENDING",
			},
		},
	},
	{
		requestId: 9,
		requestNo: "20230115-0009",
		isPriority: true,
		title: "Repairing a broken chair",
		createdAt: "2024-01-14T15:45:00Z",
		problemType: "Carpentry/Masonry",
		serviceType: "Building and Grounds Services",
		completedAt: "2024-01-16T16:15:00Z",
		requestBy: "Grace Turner",
		requesterDepartment: "Department of Art and Design",
		requestDetails: "Chair in room 201 needs repair",
		process: {
			details: {
				status: "COMPLETED",
			},
			unitApproval: {
				status: "COMPLETED",
				assignedPerson: "Sophia A. Davis",
			},
			recommendingApproval: {
				status: "COMPLETED",
				assignedPerson: "Jack M. Thompson",
			},
			serviceApproval: {
				status: "COMPLETED",
				assignedPerson: "Jack M. Thompson",
			},
			serviceAssigned: {
				status: "PENDING",
				assignedPerson: "Mia L. Turner",
			},
			completion: {
				status: "PENDING",
			},
		},
	},
	{
		requestId: 10,
		requestNo: "20230115-0010",
		isPriority: false,
		title: "Welding work for a metal cabinet",
		createdAt: "2024-01-14T16:30:00Z",
		problemType: "Wielding",
		serviceType: "Building and Grounds Services",
		completedAt: "2024-01-16T17:00:00Z",
		requestBy: "Henry Clark",
		requesterDepartment: "Department of Industrial Design",
		requestDetails: "Welding needed for a metal cabinet in the workshop",
		process: {
			details: {
				status: "COMPLETED",
			},
			unitApproval: {
				status: "COMPLETED",
				assignedPerson: "Liam J. Turner",
			},
			recommendingApproval: {
				status: "COMPLETED",
				assignedPerson: "Ella M. Thompson",
			},
			serviceApproval: {
				status: "COMPLETED",
				assignedPerson: "Ella M. Thompson",
			},
			serviceAssigned: {
				status: "PENDING",
				assignedPerson: "Andrew K. Baker",
			},
			completion: {
				status: "PENDING",
			},
		},
	},
];
