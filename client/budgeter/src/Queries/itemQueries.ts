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

export const CREATE_ITEM = gql`
    mutation($billName: String!, $amount: Float!, $dueDate: String!, $hasAutoDraft: Boolean!) {
        createItem(billName: $billName, amount: $amount, dueDate: $dueDate, hasAutoDraft: $hasAutoDraft) {
            id
            billName
        }
    }
`;
