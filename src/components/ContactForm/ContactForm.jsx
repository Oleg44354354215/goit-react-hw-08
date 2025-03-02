import { Field, Form, Formik, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import s from "./ContactForm.module.css";
import * as Yup from "yup";
import { useCallback } from "react";
import { addContact } from "../../redux/contacts/operations";

const PatternonlyLetters = /^[A-Za-zА-Яа-яЄєІіЇїҐґ-\s]+$/;
const PatternPhone = /^(\d{3}-\d{2}-\d{2}|\d{7})$/;
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "min 3 characters")
    .max(30, "max 50 characters")
    .required("This field is required")
    .matches(PatternonlyLetters, "Enter only letters"),
  number: Yup.string()
    .length(9, "Format xxx-xx-xx")
    .matches(PatternPhone, "Format xxx-xx-xx")
    .required("Enter a number"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const hadleSubmit = useCallback(
    (values, { resetForm }) => {
      dispatch(addContact(values));
      resetForm();
    },
    [dispatch]
  );

  return (
    <div className={s.div}>
      <Formik
        initialValues={{ name: "", number: "" }}
        onSubmit={hadleSubmit}
        validationSchema={ContactSchema}
      >
        <Form className={s.form}>
          <label className={s.labell}>
            Name
            <Field
              className={s.input}
              type="text"
              name="name"
              id="name"
              placeholder="your name..."
            />
            <div>
              <ErrorMessage name="name" className={s.color} component="span" />
            </div>
          </label>
          <label className={s.label}>
            Number
            <Field
              className={s.input}
              type="text"
              name="number"
              id="number"
              placeholder="your number..."
            />
            <div>
              <ErrorMessage
                name="number"
                className={s.color}
                component="span"
              />
            </div>
          </label>
          <button className={s.but} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
