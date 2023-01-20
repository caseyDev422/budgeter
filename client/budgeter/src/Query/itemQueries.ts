import { gql } from "@apollo/client"

export const GET_ITEMS = gql`
query GetAllItems {
    getAllItems {
        billName
        amount
        dueDate
        hasAutoDraft
        id
    }
}
`;

export const GET_ITEM = gql`
query GetItem($id: ID) {
    getItem(id: $id) {
        billName
        amount
        dueDate
        hasAutoDraft
        id
    }
}
`