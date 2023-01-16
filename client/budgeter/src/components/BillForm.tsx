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
import { Formik, FormikErrors, FormikHandlers, useFormik } from "formik";
import { NumericFormat } from "react-number-format";
import * as yup from "yup";
import { Bill } from "../Models/Bill";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_ITEMS } from "../Query/itemQueries";
import { CREATE_ITEM, UPDATE_ITEM } from "../Mutation/itemMutations";

function BillForm(formProps: any) {
  console.log('isEditable', formProps.isEditable);
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
  })


  let initialValues = {
    billName: "",
    amount: "",
    hasAutoDraft: false,
    picked: "",
    dueDate: new Date().toString(),
  }

  const handleFormSubmit = (formValues: Bill) => {
    
    if (formProps.isEditable) {
      console.log('formValues', formValues);
    //  updateItem({ variables: formValues});
    } else {
      formValues.picked === "Yes"
        ? (formValues.hasAutoDraft = true)
        : (formValues.hasAutoDraft = false);
      delete formValues.picked;
      if (dueDate?.toString() !== formValues.dueDate) {
        formValues.dueDate = dueDate?.toString()!;
      }
      const formattedAmount = formValues.amount.slice(1);
      formValues.amount = +formattedAmount;
      createItem({ variables: formValues });
      setDueDate(new Date());
    }
   // formik.resetForm();
    formProps.handleOpen(false);
  };

  const validation = yup.object({
    billName: yup.string().required("Must include a bill name").max(20),
    amount: yup.string().required("Must enter an amount"),
    dueDate: yup.date().required("Please enter a due date"),
  });

  console.log('FORMPROP', formProps);
  
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
            initialValues={initialValues || formProps.item}
            enableReinitialize
            validationSchema={validation}
            onSubmit={(values: Bill, actions) => {
              handleFormSubmit(values)
            }}
          >
            {props => (
              <form onSubmit={props.handleSubmit} className="billForm">
                <TextField
                  className="billForm-item"
                  name="billName"
                  label="Bill name"
                  value={props.values.billName}
                  onChange={props.handleChange}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="billForm-item"
                    label="Due Date"
                    value={props.values.dueDate}
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
                  value={props.values.amount}
                  thousandSeparator={true}
                  error={Boolean(props.touched.amount)}
                  onChange={props.handleChange}
                />

                <FormGroup>
                  <FormControlLabel control={
                    <Checkbox
                      checked={checked}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setChecked(e.target.checked);
                        // props.values.hasAutoDraft = checked;
                        // console.log(props.values.hasAutoDraft);
                        
                      }}
                    />
                  } label="Auto Draft" />
                </FormGroup>

                <DialogActions>
              <Button
                onClick={() => {
                  console.log('cancel initialValues', initialValues);
                  props.resetForm();
                  props.setValues({
                    billName: '',
                    amount: '',
                    dueDate: new Date().toString(),
                    picked: '',
                    hasAutoDraft: false
                  });
                  setDueDate(new Date());
                  formProps.setIsEdit(false);
                  formProps.setItem(null);
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
          {/* <form onSubmit={formik.handleSubmit} className="billForm">
            <TextField
              className="billForm-item"
              name="billName"
              label="Bill name"
            //  value={formik.values.billName}
            //  onChange={formik.handleChange}
            //  error={Boolean(formik.errors.billName) && formik.touched.billName}
            />
            {formik.errors.billName && formik.touched.billName ? (
                    <small className="bill-error-text">{formik.errors.billName}</small>
                  ) : null}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className="billForm-item"
                label="Due Date"
                value={formik.values.dueDate}
                onChange={setDueDate}
                renderInput={(params) => <TextField error={Boolean(formik.errors.dueDate) && formik.touched.dueDate} {...params} />}
              />
            </LocalizationProvider>
            {formik.touched.dueDate ? (
              <small className="amount-error-text">
                {formik.errors.dueDate}
              </small>
            ) : null}
            <NumericFormat
              label="Amount"
              className="billForm-item"
              name="amount"
              prefix="$"
              type="text"
              customInput={TextField}
              allowNegative={false}
              value={formik.values.amount}
              thousandSeparator={true}
              error={formik.touched.amount}
              onChange={formik.handleChange}
            />
            {formik.touched.amount ? (
                    <small className="amount-error-text">{formik.errors.amount}</small>
                  ) : null}
            <FormGroup>
              <FormControlLabel control={
                <Checkbox
                  checked={checked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setChecked(e.target.checked);
                  }}
                />
              } label="Auto Draft" />
            </FormGroup>
            <DialogActions>
              <Button
                onClick={() => {
                  console.log('cancel initialValues', initialValues);
                  formik.resetForm();
                  formik.setValues({
                    billName: '',
                    amount: '',
                    dueDate: new Date().toString(),
                    picked: '',
                    hasAutoDraft: false
                  });
                  setDueDate(new Date());
                  props.setIsEdit(false);
                  props.setItem(null);
                  props.handleOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BillForm;