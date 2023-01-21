import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import alllocales from '@fullcalendar/core/locales-all';
import { SetStateAction, useEffect, useState } from 'react';
import { Bill } from '../Models/Bill';

function BillCalendar(props: any) {
  const bills = props.calendarItems;
  const calendarBills: any = [];
  const [initialEvents, setInitialEvents] = useState<any[]>([...bills]);
  
  // useEffect(() => {
  //   if (bills) {
  //     for (const bill of bills) {
  //       const calendarBill = {
  //         id: bill.id,
  //         title: bill.billName,
  //         start: bill.dueDate,
  //         display: 'background'
  //       }
  //       calendarBills.push(calendarBill);
  //     }
  //     console.log(calendarBills);
  //     setInitialEvents(calendarBills);
  //   }
  // }, [])
  console.log('props', props);
 // console.log('bills', bills);

  const handleSelect: any = (e: any) => {
    return e.end.getTime() / 1000 - e.start.getTime() / 1000 <= 86400;
  }

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b>Test Text {eventContent.timeText}</b>
        <b> Test Text 2 {eventContent.event.title}</b>
      </>
    )
    
  }

    return (
      <>
        <div className="calendar-container">
          <FullCalendar
            events={props.calendarItems}
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