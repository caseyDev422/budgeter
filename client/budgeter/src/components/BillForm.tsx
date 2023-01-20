import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik } from "formik";
import { NumericFormat } from "react-number-format";
import * as yup from "yup";
import { Bill } from "../Models/Bill";
import { ChangeEvent, useState } from "react";
import { throwServerError, useMutation } from "@apollo/client";
import { GET_ITEMS } from "../Query/itemQueries";
import { CREATE_ITEM, UPDATE_ITEM } from "../Mutation/itemMutations";
import { useEffect } from "preact/hooks";

function BillForm(formProps: any) {
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [checked, setChecked] = useState<boolean>(false);
  const [createItem] = useMutation(CREATE_ITEM, {
    refetchQueries: [
      {query: GET_ITEMS},
      'getAllItems'
    ]
  });
  const [updateItem] = useMutation(UPDATE_ITEM, {
    refetchQueries: [
      { query: GET_ITEMS},
      'getAllItems'
    ]
  });

  const handleFormSubmit = (formValues: Bill) => {
    if (formProps.isEditable) {
      console.log('formValues', formValues);
      // TODO refactor into one fn
      const formattedAmount = formValues.amount.slice(1);
      formValues.amount = +formattedAmount;
      if (dueDate?.toString() !== formValues.dueDate) {
        formValues.dueDate = dueDate?.toString()!;
      }
      updateItem({ variables: formValues});
    } else {
      if (dueDate?.toString() !== formValues.dueDate) {
        formValues.dueDate = dueDate?.toString()!;
      }
      const formattedAmount = formValues.amount.slice(1);
      formValues.amount = +formattedAmount;
      createItem({ variables: formValues });
      setDueDate(new Date());
    }
    formProps.handleOpen(false);
  };

  const validation = yup.object({
    billName: yup.string().required("Must include a bill name").max(20),
    amount: yup.string().required("Must enter an amount"),
    dueDate: yup.date().required("Please enter a due date"),
  });


  return (
    <div>
      <Dialog
        open={formProps.isOpen}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle>{formProps.isEditable ? "Edit" : "Add"} Bill</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={formProps.item}
            enableReinitialize
            validationSchema={validation}
            onSubmit={(values: Bill) => {
              handleFormSubmit(values)
            }}
          >
            {formikProps => (
              <form onSubmit={formikProps.handleSubmit} className="billForm">
                <TextField
                  className="billForm-item"
                  name="billName"
                  label="Bill name"
                  value={formikProps.values.billName}
                  onChange={formikProps.handleChange}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="billForm-item"
                    label="Due Date"
                    value={formikProps.values.dueDate}
                    onChange={setDueDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <NumericFormat
                  label="Amount"
                  className="billForm-item"
                  name="amount"
                  prefix="$"
                  type="text"
                  customInput={TextField}
                  allowNegative={false}
                  value={formikProps.values.amount}
                  thousandSeparator={true}
                  error={Boolean(formikProps.touched.amount)}
                  onChange={formikProps.handleChange}
                />
                <FormGroup>
                  <FormControlLabel control={
                    <Checkbox
                      checked={formikProps.values.hasAutoDraft}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        formikProps.setFieldValue('hasAutoDraft', checked);
                      }}
                    />
                  } label="Auto Draft" />
                </FormGroup>

                <DialogActions>
              <Button
                onClick={() => {
                  formikProps.resetForm();
                  setDueDate(new Date());
                  formProps.setIsEdit(false);
                  formProps.setItem({
                    billName: '',
                    amount: '',
                    dueDate: new Date().toString(),
                    picked: '',
                    hasAutoDraft: false
                  });
                  formProps.handleOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BillForm;