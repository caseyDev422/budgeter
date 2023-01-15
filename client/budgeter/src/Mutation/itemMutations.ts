import { gql } from "@apollo/client";

export const CREATE_ITEM = gql`
    mutation($billName: String!, $amount: Float!, $dueDate: String!, $hasAutoDraft: Boolean!) {
        createItem(billName: $billName, amount: $amount, dueDate: $dueDate, hasAutoDraft: $hasAutoDraft) {
            id
            billName
        }
    }
`;

export const UPDATE_ITEM = gql`
    mutation($id: ID!, $billName: String, $amount: Float, $dueDate: String, $hasAutoDraft: Boolean) {
        id
        billName
        amount
        dueDate
        hasAutoDraft
    }
`;

export const DELETE_ITEM = gql`
    mutation($id: ID!) {
        deleteItem(id: $id)
    }
`;