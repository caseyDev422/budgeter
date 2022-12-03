import '../styles/App.css';
import * as React from 'react';
import Navigation  from './Navigation';
import Bills from './Bills';
import BillCalendar from './Bill-Calendar';
import BillForm from './BillForm';
import Grid from '@mui/material/Unstable_Grid2';

function App() {
  //TODO refactor to use useState
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <Navigation addBill={setIsOpen}/>
      <div className="bill-container">
        <Bills />
      </div>
      
      <BillCalendar />
      <BillForm isOpen={isOpen} handleOpen={setIsOpen} />
    </div>
  );
}

export default App;
