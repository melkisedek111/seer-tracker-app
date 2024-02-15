import {} from "@elysiajs/apollo";

export const getDepartmentsQuery = `
query getDepartments {
    getDepartments {
        id
        name
        acronym
        createdAt
        updatedAt
    }
}
`;

export const getDepartmentByParamsQuery = `
    query getDepartmentByParams($id: Int, $name: String, $acronym: String) {
        getDepartmentByParams(id: $id name: $name acronym: $acronym) {
            id 
            name
            acronym
        }
    }
 `;

export const createDepartmentQuery = `
    mutation createDepartment($name: String!, $acronym: String!) {
        createDepartment(name: $name acronym: $acronym) {
            id
            name
            acronym
        }
    }
 `;

export const updateDepartmentQuery = `
    mutation updateDepartment($id: Int!, $name: String!, $acronym: String!) {
        updateDepartment(id: $id name: $name acronym: $acronym) {
            id
            name
            acronym
        }
    }
 `;
