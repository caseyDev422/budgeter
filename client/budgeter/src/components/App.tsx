import '../styles/App.css';
import { useState, Suspense } from 'react';
import Navigation  from './Navigation';
import Bills from './Bills';
import BillCalendar from './Bill-Calendar';
//import BillForm from './BillForm';
//import Popup from './Popup';
import { Bill } from '../Models/Bill';
import React from 'react';


const BillForm = React.lazy(() => import('./BillForm'));
const Popup = React.lazy(() => import('./Popup'));
//TODO make props into its own type

const initialValues = {
  billName: "",
  amount: "",
  hasAutoDraft: false,
  picked: "",
  dueDate: new Date().toString(),
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditable, setIsEdit] = useState(false);
  const [popupOpen, setPopup] = useState(false);
  const [item, setItem] = useState<Bill>(initialValues);
  return (
    <div>
      <Navigation addBill={setIsOpen} isEditable={isEditable} setIsEdit={setIsEdit}/>
      <div className="bill-container">
        <Bills setItem={setItem} openPopup={setPopup} setIsOpen={setIsOpen} setIsEdit={setIsEdit}/>
      </div>
      
      <BillCalendar />
      <Suspense fallback={<div>Loading</div>}>
        <BillForm isOpen={isOpen} handleOpen={setIsOpen} setItem={setItem} item={item} setIsEdit={setIsEdit} isEditable={isEditable}/>
      </Suspense>
      
      <Suspense fallback={<div>Loading</div>}>
        <Popup item={item} setItem={setItem} isPopupOpen={popupOpen} openPopup={setPopup} />
      </Suspense>
     
    </div>
  );
}

export default App;
