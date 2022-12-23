import { gql } from "@apollo/client";

export const CREATE_ITEM = gql`
    mutation($billName: String!, $amount: Float!, $dueDate: String!, $hasAutoDraft: Boolean!) {
        createItem(billName: $billName, amount: $amount, dueDate: $dueDate, hasAutoDraft: $hasAutoDraft) {
            id
            billName
        }
    }
`;

export const DELETE_ITEM = gql`
    mutation($id: ID!) {
        deleteItem(id: $id)
    }
`;