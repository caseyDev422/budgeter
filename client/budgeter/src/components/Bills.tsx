import { gql, useQuery } from '@apollo/client';
import {
    Box,
    List,
    ListItem,
    ListItemText
} from '@mui/material';

function Bills() {
    const ITEMS = gql`
        query GetAllItems {
            getAllItems {
                name
                amount
                dueDate
                hasAutoDraft
                id
            }
        }
    `
    const {loading, error, data} = useQuery(ITEMS);
    // TODO show loading symbol instead of text
    if (loading) return(<div>Loading...</div>);
    if (error) return(<div>Error!! {error.message}</div>);
    return(
        <Box sx={{width: 'fit-content'}}>
            <List>
                <ListItem>
                    {data && data.getAllItems.map((item: any) => (
                        <ListItemText primary={`Name: ${item.name} Amount: ${item.amount}`} />
                    ))}
                </ListItem>
            </List>
        </Box>
    )
}

export default Bills;