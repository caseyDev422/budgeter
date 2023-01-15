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
import { useFormik } from "formik";
import { NumericFormat } from "react-number-format";
import * as yup from "yup";
import { Bill } from "../Models/Bill";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_ITEMS } from "../Query/itemQueries";
import { CREATE_ITEM, UPDATE_ITEM } from "../Mutation/itemMutations";

function BillForm(props: any) {
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


  if (props.isEditable) {
    console.log(props.item);
    initialValues = {...props.item};
  }

  const handleFormSubmit = (formValues: Bill) => {
    
    if (props.isEditable) {
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
    formik.resetForm();
    props.handleOpen(false);
  };

  const validation = yup.object({
    billName: yup.string().required("Must include a bill name").max(20),
    amount: yup.string().required("Must enter an amount"),
    dueDate: yup.date().required("Please enter a due date"),
  });

  let formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: (values: Bill) => handleFormSubmit(values)
  });
  
  return (
    <div>
      <Dialog
        open={props.isOpen}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle>{props.isEditable ? "Edit" : "Add"} Bill</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit} className="billForm">
            <TextField
              className="billForm-item"
              name="billName"
              label="Bill name"
              value={formik.values.billName}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.billName) && formik.touched.billName}
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
                    //formik.values.hasAutoDraft = e.target.checked;
                    setChecked(e.target.checked);
                  }}
                />
              } label="Auto Draft" />
            </FormGroup>
            <DialogActions>
              <Button
                onClick={() => {
                  formik.resetForm();
                  formik.setValues(initialValues);
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
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BillForm;