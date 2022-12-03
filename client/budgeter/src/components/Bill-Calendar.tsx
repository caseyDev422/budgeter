import { useState } from 'react';
import  Box  from '@mui/material/Box';
import startOfToday from 'date-fns/startOfToday';
import FullCalendar, { AllowFunc } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import alllocales from '@fullcalendar/core/locales-all';

function BillCalendar() {
    const today = startOfToday();
    const [value, setValue] = useState<Date | null>(today);
    const handleDate = (event: Date | null) => {
        setValue(event);
        console.log('event', event);
    }

    return (
      <>
        <div className="calendar-container">
          <FullCalendar
            handleWindowResize={true}
            height={"auto"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            selectable={true}
            eventConstraint={{
              start: '00:00',
              end: '24:00'
            }}
            headerToolbar={{
              left: 'prev,next,today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            locales={alllocales}
            locale={'en'}
            buttonText={{
              day: 'Day',
              prev: 'Back',
              nextYear: 'Next Year',
              prevYear: 'Previous Year',
              next: 'Next',
              month: 'Month',
              today: 'Today',
              week: 'Week'
            }}
          />
        </div>
      </>
    );
}

export default BillCalendar;