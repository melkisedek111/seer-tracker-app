export const getPositionByParamsQuery = `
query getPositionByParams($id: Int, $name: String) {
    getPositionByParams(id: $id name: $name) {
      id
      name
    }
  }
`;

export const createPositionQuery = `
mutation createPosition ($name: String!) {
  createPosition(name: $name){
    id
    name
  }
}
`;

export const getPositionsQuery = `
query getPosition {
  getPositions {
    id
    name
    createdAt
    updatedAt
  }
}
`;

export const updatePositionQuery = `
  mutation updatePosition($id: Int, $name: String) {
    updatePosition(id: $id name: $name) {
      id
      name
    }
  }
`;
