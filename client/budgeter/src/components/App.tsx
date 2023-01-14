import '../styles/App.css';
import { useState } from 'react';
import Navigation  from './Navigation';
import Bills from './Bills';
import BillCalendar from './Bill-Calendar';
import BillForm from './BillForm';
import Popup from './Popup';
import { Bill } from '../Models/Bill';

//TODO make props into its own type

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditable, setIsEdit] = useState(false);
  const [popupOpen, setPopup] = useState(false);
  const [item, setItem] = useState<Bill | null>(null);
  return (
    <div>
      <Navigation addBill={setIsOpen}/>
      <div className="bill-container">
        <Bills setItem={setItem} openPopup={setPopup} setIsOpen={setIsOpen} setIsEdit={setIsEdit}/>
      </div>
      
      <BillCalendar />
      <BillForm isOpen={isOpen} handleOpen={setIsOpen} item={item}/>
      <Popup item={item} isPopupOpen={popupOpen} openPopup={setPopup} />
    </div>
  );
}

export default App;
