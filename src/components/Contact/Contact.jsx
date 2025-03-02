import s from "./Contact.module.css";
import { MdPerson } from "react-icons/md";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";

const Contact = ({ item, handleDelete, edit }) => {
  return (
    <li className={s.item}>
      <div>
        <p className={s.text}>
          <MdPerson />
          {item.name}
        </p>
        <p className={s.nimber}>
          <BsFillTelephoneOutboundFill />
          {item.number}
        </p>
      </div>
      <button className={s.button} onClick={edit}>
        <FaPen />
        Edit
      </button>
      <button onClick={() => handleDelete(item.id)} className={s.button}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
