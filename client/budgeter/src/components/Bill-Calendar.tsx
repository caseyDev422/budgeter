import FullCalendar, {  } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import alllocales from '@fullcalendar/core/locales-all';

function BillCalendar() {
    const handleSelect: any = (e: any) => {
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