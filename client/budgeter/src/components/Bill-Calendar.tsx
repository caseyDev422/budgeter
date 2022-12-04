import { useState } from 'react';
import startOfToday from 'date-fns/startOfToday';
import FullCalendar, {  } from '@fullcalendar/react';
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
    const handleSelect: any = (e: any) => {
      console.log(new Date());
      
      console.log('e', );
      return e.end.getTime() / 1000 - e.start.getTime() / 1000 <= 86400;
    }

    return (
      <>
        <div className="calendar-container">
          <FullCalendar
            handleWindowResize={true}
            height={"auto"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            editable={true}
            selectable={true}
            selectAllow={handleSelect}
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