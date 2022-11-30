import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import Box from '@mui/material/Box';

function BillForm(props: any) {
    return(
        <div>
            <Dialog open={props.isOpen} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
                <DialogTitle>Add a Bill</DialogTitle>
                <DialogContent>
                    <DialogContentText>Form data goes here</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.handleOpen(false)}>Cancel</Button>
                    <Button>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default BillForm;