import { gql } from "@elysiajs/apollo";


export const getDepartmentQuery = gql`
    query getDepartments {
        getDepartments {
            id
            name
            acrony
            createdAt
            updatedAt
        }
    }

`;

export const getDepartmentByParamsQuery = gql`
    query getDepartmentByParams($id: Int, $name: String, $acronym: String) {
        getDepartmentByParams(id: $id name: $name acronym: $acronym) {
            id 
            name
            acronym
        }
    }
 `;

 export const createDepartmentQuery = gql`
    mutation createDepartment($name: String!, $acronym: String!) {
        createDepartment(name: $name acronym: $acronym) {
            id
            name
            acronym
        }
    }
 `;

 export const updateDepartmentQuery = gql`
    mutation updateDepartment($id Int!, $name: String!, $acronym: String!) {
        updateDepartment(id: $id name: $name acronym: $acronym) {
            id
            name
            acronym
        }
    }
 `;