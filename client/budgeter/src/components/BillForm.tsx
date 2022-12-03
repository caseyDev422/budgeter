import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {NumericFormat} from 'react-number-format';
import * as yup from 'yup';

import { Bill } from '../Models/Bill';

function BillForm(props: any) {

  const validation = yup.object({
    billName: yup
    .string()
    .required("Must include a bill name")
    .max(20),
    amount: yup
    .string()
    .required("Must enter an amount")
  })
  
  const handleFormSubmit = (formValues: Bill) => {
      formValues.picked === 'Yes' ? formValues.hasAutoDraft = true : formValues.hasAutoDraft = false;
      console.log('formValues', formValues);
  }
  return (
    <div>
      <Dialog
        open={props.isOpen}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle>Add a Bill</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              billName: "",
              amount: "",
              hasAutoDraft: false,
              picked: ""
            }}
            validationSchema={validation}
            onSubmit={(values: Bill) => handleFormSubmit(values)}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <div className='billForm'>
                  <Field
                    render={(errors: any, touched: any) => (
                      <TextField
                        className='billForm-item'
                        name="billName"
                        label="Bill name"
                        value={values.billName}
                        onChange={handleChange}
                    />
                    
                    )}
                  />
                  {errors.billName && touched.billName ? <small className='bill-error-text'>{errors.billName}</small> : null}
                  <Field
                    render={() => (
                      <NumericFormat
                        label="Amount"
                        className='billForm-item'
                        name="amount"
                        prefix='$'
                        type='text'
                        customInput={TextField}
                        allowNegative={false}
                        value={values.amount}
                        thousandSeparator={true}
                        onChange={handleChange}
                      />
                    )}
                  />
                  {touched.amount ? <small className='amount-error-text'>{errors.amount}</small> : null}
                  <div id="my-radio-group">Auto draft?</div>
                  <div role="group" aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="picked" value="Yes" />
                      Yes
                    </label>
                    <label style={{paddingLeft: '20px'}}>
                      <Field type="radio" name="picked" value="No" />
                      No
                    </label>
                  </div>
                  <DialogActions>
                    <Button onClick={() => props.handleOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                  </DialogActions>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BillForm;