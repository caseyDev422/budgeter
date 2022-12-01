import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';

import Radio from '@mui/material';
import RadioGroup from '@mui/material';
import FormControl from '@mui/material';
import FormControlLabel from '@mui/material';
import FormLabel from '@mui/material';
import { Bill } from '../Models/Bill';

function BillForm(props: any) {
    const handleFormSubmit = (formValues: Bill) => {
        formValues.picked === 'Yes' ? formValues.hasAutoDraft = true : formValues.hasAutoDraft = false;
        console.log('formValues', formValues);
    }
    return(
        <div>
            <Dialog open={props.isOpen} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
                <DialogTitle>Add a Bill</DialogTitle>
                <DialogContent>
                    <Formik initialValues={{
                        billName: '',
                        amount: '',
                        hasAutoDraft: false,
                        picked: ''
                    }} onSubmit={(values: Bill) => handleFormSubmit(values)}>
                        {({values, handleChange}) => (
                            <Form>
                                <TextField name='billName' label="Bill name" value={values.billName} onChange={handleChange}/>
                                <TextField name='amount' label="Amount" value={values.amount} onChange={handleChange}/>
                                <div id="my-radio-group">Picked</div>
                                    <div role="group" aria-labelledby="my-radio-group">
                                    <label>
                                    <Field type="radio" name="picked" value="Yes"/>
                                    Yes
                                    </label>
                                    <label>
                                    <Field type="radio" name="picked" value="No"/>
                                    No
                                    </label>
                                </div>
                               <DialogActions>
                                <Button onClick={() => props.handleOpen(false)}>Cancel</Button>
                                <Button type='submit'>Submit</Button>
                               </DialogActions> 
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
                
            </Dialog>
        </div>
    )
}

export default BillForm;