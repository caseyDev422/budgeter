import { useState } from 'react';
import  Box  from '@mui/material/Box';
import startOfToday from 'date-fns/startOfToday';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


function BillCalendar() {
    const today = startOfToday();
    const [value, setValue] = useState<Date | null>(today);
    const handleDate = (event: Date | null) => {
        setValue(event);
        console.log('event', event);
    }
    return (
      <Box>
        <FullCalendar
        plugins={[dayGridPlugin]}
        />
      </Box>
    );
}

export default BillCalendar;