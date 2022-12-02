import { 
    Drawer,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    SelectChangeEvent,
    Box, 
    Typography, 
    Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { View } from '../Models/enums/Views';
import { useState } from 'react';

function Navigation(props: any) {
    const [view, setView] = useState(View.MONTHLY);
    const handleView = (event: SelectChangeEvent) => {
        setView(event.target.value as View);
    }

    const handleAddButton = (data: any) => {
      props.addBill(true);
    }
    return (
      <Drawer open={true} variant="permanent" anchor="left">
        <Box p={2} width="250px" textAlign="center" role="presentation">
          {/*Default view is monthly */}
          <Typography variant="h6" component="div" style={{marginRight: '47px'}}>
            Current View: {view}
          </Typography>
          <Button variant="outlined" style={{ margin: '25% 52% 25% 0' }} onClick={handleAddButton}>
            <AttachMoneyIcon color="success" /> Add Bill
          </Button>
          <FormControl fullWidth>
            <InputLabel>View</InputLabel>
            <Select label="View" onChange={handleView}>
              <MenuItem value={View.MONTHLY}>{View.MONTHLY}</MenuItem>
              <MenuItem value={View.WEEKLY}>{View.WEEKLY}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Drawer>
    );
}

export default Navigation;