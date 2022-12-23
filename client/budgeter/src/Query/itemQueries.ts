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

