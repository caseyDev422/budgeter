import { gql, useQuery } from '@apollo/client';
import {
    Box,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import { GET_ITEMS } from '../Queries/itemQueries';

function Bills() {
    const {loading, error, data} = useQuery(GET_ITEMS, {
        notifyOnNetworkStatusChange: true,
    });
    // TODO show loading symbol instead of text
    if (loading) return(<div>Loading...</div>);
    if (error) return(<div>Error!! {error.message}</div>);
    return(
        <Box sx={{width: 'fit-content'}}>
            <List>
                <ListItem>
                    {data && data.getAllItems.map((item: any) => (
                        <ListItemText key={item.id} primary={`Name: ${item.billName} Amount: ${item.amount}`} />
                    ))}
                </ListItem>
            </List>
        </Box>
    )
}

export default Bills;