import {
    Box,
    List,
    ListItem,
    ListItemText
} from '@mui/material';

function Bills() {
    const item = {
        name: 'Item1',
        amount: 123.45
    }
    return(
        <Box sx={{width: 'fit-content'}}>
            <List>
                <ListItem>
                    <ListItemText primary={`Name: ${item.name} Amount: ${item.amount}`} />
                </ListItem>
            </List>
        </Box>
    )
}

export default Bills;