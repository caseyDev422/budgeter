import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DELETE_ITEM } from "../Mutation/itemMutations";
import { GET_ITEMS } from "../Query/itemQueries";
import { useMutation } from "@apollo/client/react/hooks";

function Popup(props: any) {
    

    const handleDelete = () => {
        console.log(typeof props.item.id);
        const id = props.item.id;
        console.log('id', id);
        deleteItem({variables: {id}});
        props.openPopup(false);
    }
    const [deleteItem, {data, loading, error}] = useMutation(DELETE_ITEM, {
        refetchQueries: [
          {query: GET_ITEMS},
          'getAllItems'
        ]
      });
    return (
      <div>
        <Dialog
         open={props.isPopupOpen}>
          <DialogTitle>Delete Bill</DialogTitle>
          <DialogContent>
            <p>{`Are you sure you want to delete ${props.item?.billName}`}</p>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Yes, Delete
            </Button>
            <Button variant="contained" color="primary" onClick={() => {props.openPopup(false)}}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default Popup;