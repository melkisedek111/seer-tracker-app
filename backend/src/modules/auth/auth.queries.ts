export const getUserAuthSigninQuery = `
query getUserAuthSignin($username: String!) {
  getUserAuthSignin(username: $username) {
    id
    username
    email
    employeeNumber
    password
    role
    position {
      id
      name
    }
    department {
      acronym
      id
      name
    }
    refreshToken {
      id
      userId
      token
    }
  }
}
`;

export const saveRefreshTokenQuery = `
mutation saveRefreshToken($userId: Int!,
  $token: [String!]) {
    saveRefreshToken(userId: $userId,
      token: $token) {
        id
        userId
        token
    }
  }
`;

export const getRefreshTokenQuery = `
query getRefreshToken($id: Int, $userId: Int, $token: String){
  getRefreshToken(id: $id userId: $userId token: $token){
    id
    userId
    token
  }
}
`;

export const updateRefreshTokenQuery = `
mutation UpdateRefreshToken($findToken: String, $data: UpdateRefreshTokenData, $isRemoveToken: Boolean) {
updateRefreshToken(findToken: $findToken, data: $data, isRemoveToken: $isRemoveToken) {
  id
  userId
  token
  user {
      id
      username
      email
      employeeNumber
      role
      position {
        id
        name
      }
      department {
        acronym
        id
        name
      }
  }
}
}

`;
