import { gql, useQuery } from '@apollo/client';
import {
    Box,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GET_ITEMS } from '../Query/itemQueries';

function Bills(props: any) {
    const {loading, error, data} = useQuery(GET_ITEMS, {
        notifyOnNetworkStatusChange: true,
        pollInterval: 5000
    });
    // TODO show loading symbol instead of text
    if (loading) return(<div>Loading...</div>);
    if (error) return(<div>Error!! {error.message}</div>);
    return(
        <Box sx={{width: 'fit-content'}}>
            <List>
                <ListItem>
                    
                    {data.getAllItems.length > 0 ? data.getAllItems.map((item: any, index: number) => (
                        <div className='item-container' key={item.id}>
                            <ListItemText primary={`Name: ${item.billName} Amount: ${item.amount}`} /> 
                            <ModeEditIcon onClick={() => {
                                props.setIsOpen(true)
                                props.setIsEdit(true)
                                props.setItem(item)
                            }}/> 
                            <DeleteIcon onClick={() => {
                                props.openPopup(true) 
                                props.setItem(item)
                                }} />
                        </div>
                        
                    )) : `You need to add bills for the month!`}
                    
                </ListItem>
            </List>
        </Box>
    )
}

export default Bills;