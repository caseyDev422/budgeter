import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik, Form, Field } from "formik";
import { NumericFormat } from "react-number-format";
import * as yup from "yup";
import { Bill } from "../Models/Bill";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_ITEMS } from "../Query/itemQueries";
import { CREATE_ITEM } from "../Mutation/itemMutations";

function BillForm(props: any) {
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [createItem, {data, loading, error}] = useMutation(CREATE_ITEM, {
    refetchQueries: [
      {query: GET_ITEMS},
      'getAllItems'
    ]
  });

  const validation = yup.object({
    billName: yup.string().required("Must include a bill name").max(20),
    amount: yup.string().required("Must enter an amount"),
    dueDate: yup.string().required("Please enter a due date"),
  });

  const handleFormSubmit = (formValues: Bill) => {
    formValues.picked === "Yes"
      ? (formValues.hasAutoDraft = true)
      : (formValues.hasAutoDraft = false);
    delete formValues.picked;
    if (dueDate?.toString() !== formValues.dueDate) {
      formValues.dueDate = dueDate?.toString()!;
    }
    const formattedAmount = formValues.amount.slice(1);
    formValues.amount = +formattedAmount;
    console.log("formValues", formValues);
    createItem({variables: formValues});
    setDueDate(new Date());
    props.handleOpen(false);
  };
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
              picked: "",
              dueDate: new Date().toString(),
            }}
            validationSchema={validation}
            onSubmit={(values: Bill) => handleFormSubmit(values)}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <div className="billForm">
                  <Field
                    render={() => (
                      <TextField
                        className="billForm-item"
                        name="billName"
                        label="Bill name"
                        value={values.billName}
                        onChange={handleChange}
                      />
                    )}
                  />
                  {errors.billName && touched.billName ? (
                    <small className="bill-error-text">{errors.billName}</small>
                  ) : null}
                  <Field
                    render={() => (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          className="billForm-item"
                          label="Due Date"
                          value={dueDate}
                          onChange={setDueDate}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    )}
                  />
                  {touched.dueDate ? (
                    <small className="amount-error-text">{errors.dueDate}</small>
                  ) : null}
                  <Field
                    
                    render={() => (
                      <NumericFormat
                        label="Amount"
                        className="billForm-item"
                        name="amount"
                        prefix="$"
                        type="text"
                        customInput={TextField}
                        allowNegative={false}
                        value={values.amount}
                        thousandSeparator={true}
                        onChange={handleChange}
                      />
                    )}
                  />
                  {touched.amount ? (
                    <small className="amount-error-text">{errors.amount}</small>
                  ) : null}
                  <div id="my-radio-group">Auto draft?</div>
                  <div role="group" aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="picked" value="Yes" />
                      Yes
                    </label>
                    <label style={{ paddingLeft: "20px" }}>
                      <Field type="radio" name="picked" value="No" />
                      No
                    </label>
                  </div>
                  <DialogActions>
                    <Button onClick={() => {
                      setDueDate(new Date());
                      props.handleOpen(false)}}>
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

const nameField = (props: any) => {
  <NumericFormat
    label="Amount"
    className="billForm-item"
    name="amount"
    prefix="$"
    type="text"
    customInput={TextField}
    allowNegative={false}
    value={props.values.amount}
    thousandSeparator={true}
    onChange={props.handleChange}
  />;
}

export default BillForm;
