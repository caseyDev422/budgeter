import {
    Box,
    TextField,
    TextFieldProps
} from '@mui/material';
import { useState } from 'react';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import startOfToday from 'date-fns/startOfToday';


function BillCalendar() {
    const today = startOfToday();
    const [value, setValue] = useState<Date | null>(today);
    const handleDate = (event: Date | null) => {
        setValue(event);
        console.log('event', event);
    }
    return (
      <Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={handleDate}
            renderInput={(params) => <TextField {...params} />}
            dayOfWeekFormatter={(day) => `${day}.`}
            toolbarFormat="MM/dd/yyyy"
            showToolbar
          />
        </LocalizationProvider>
      </Box>
    );
}

export default BillCalendar;