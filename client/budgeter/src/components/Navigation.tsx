import { 
    Drawer,
    Box, 
    Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Bill } from '../Models/Bill';

function Navigation(props: any) {
    const initialBill: Bill = {
      billName: '',
      amount: undefined,
      hasAutoDraft: false,
      dueDate: new Date().toString()
    }
    const handleAddButton = (data: any) => {
      props.addBill(true);
      if(props.isEditable) {
        props.setIsEdit(false);
      }
    }
    return (
      <Drawer open={true} variant="permanent" anchor="left">
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <Button variant="outlined" style={{ margin: '0% 52% 25% 0' }} onClick={handleAddButton}>
            <AttachMoneyIcon color="success" /> Add Bill
          </Button>
        </Box>
      </Drawer>
    );
}

export default Navigation;