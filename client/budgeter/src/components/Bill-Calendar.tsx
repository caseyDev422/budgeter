import {
    Box,
    TextField
} from '@mui/material';
import { useState } from 'react';
const moment = require('moment');

function BillCalendar() {
    let now = moment().format('LLLL');

    const [value, setValue] = useState(new Date());
    return(
        <Box sx={{width: 'fit-content'}}>
            {now}
        </Box>
    )
}

export default BillCalendar;