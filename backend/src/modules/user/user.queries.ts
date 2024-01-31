export const getUserByEmailQuery = `
query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      email
    }
  }
`;

export const getUserByUsernameQuery = `
query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      username
    }
  }
`;

export const getUserByParamsQuery = `
query getUserByParams($email: String, $username: String, $employeeNumber: String, $id: Int) {
    getUserByParams(email: $email username: $username, employeeNumber: $employeeNumber id: $id) {
      email
      username
      employeeNumber
    }
  }
`;

export const createUserQuery = `
mutation createUser($employeeNumber: String!,
    $username: String!,
    $password: String!,
    $firstName: String!,
    $middleName: String
    $lastName: String!,
    $email: String!,
    $homeAddress: String!,
    $gender: String!,
    $contactNo: String!,
    $role: String!,
    $positionId: Int!,
    $departmentId: Int!,
    $status: String!) {
        createUser(employeeNumber: $employeeNumber,
        username: $username,
        password: $password,
        firstName: $firstName,
        middleName: $middleName
        lastName: $lastName,
        email: $email,
        homeAddress: $homeAddress,
        gender: $gender,
        contactNo: $contactNo,
        role: $role,
        positionId: $positionId,
        departmentId: $departmentId,
        status: $status) {
            id
            employeeNumber
            username
            password
            firstName
            middleName
            lastName
            email
            homeAddress
            gender
            contactNo
            role
            position {
            id
            name
            }
            department {
            id
            name
            }
            status
      }
    }
`;
