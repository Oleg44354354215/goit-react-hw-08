import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/filters/selectors";
import { deleteContact, editContact } from "../../redux/contacts/operations";
import { useState } from "react";

import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { toast } from "react-hot-toast";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsEditOpen(true);
  };

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setIsDeleteOpen(true);
  };

  const confirmEdit = () => {
    dispatch(editContact(selectedContact));
    toast.success("Contact edited");
    setIsEditOpen(false);
  };

  const confirmDelete = () => {
    dispatch(deleteContact(selectedContact.id));
    toast.success("Contact deleted");
    setIsDeleteOpen(false);
  };

  return (
    <ul className={s.list}>
      {contacts.map((item) => (
        <Contact
          key={item.id}
          item={item}
          handleDelete={() => handleDelete(item.id)}
          edit={() => handleEdit(item)}
        />
      ))}
      {editContact && (
        <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
          <DialogTitle>Edit contact</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={selectedContact?.name || ""}
              onChange={(e) =>
                setSelectedContact({ ...selectedContact, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="number"
              label="Number"
              type="text"
              fullWidth
              variant="standard"
              value={selectedContact?.number || ""}
              onChange={(e) =>
                setSelectedContact({
                  ...selectedContact,
                  number: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={() => confirmEdit()}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
      {deleteContact && (
        <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
          <DialogTitle>Delete contact</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this contact?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button onClick={() => confirmDelete()}>Delete</Button>
          </DialogActions>
        </Dialog>
      )}
    </ul>
  );
};

export default ContactList;
