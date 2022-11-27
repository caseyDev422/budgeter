import '../styles/App.css';
import * as React from 'react';
import Navigation  from './Navigation';
import Bills from './Bills';
import BillCalendar from './Bill-Calendar';
import Grid from '@mui/material/Unstable_Grid2';

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="items-container">
        <Grid container spacing={2}>
          <Grid>
            <Bills />
          </Grid>
          <Grid>
            <BillCalendar />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
