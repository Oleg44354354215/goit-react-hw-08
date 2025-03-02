import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/selectors";
import { deleteContact } from "../../redux/contactsOps";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  const dispatch = useDispatch();

  return (
    <ul className={s.list}>
      {contacts.map((item) => (
        <Contact
          key={item.id}
          item={item}
          handleDelete={() => dispatch(deleteContact(item.id))}
        />
      ))}
    </ul>
  );
};

export default ContactList;
