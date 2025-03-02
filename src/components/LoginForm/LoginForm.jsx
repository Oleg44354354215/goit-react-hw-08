import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import c from "./LoginForm.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { FaPen } from "react-icons/fa";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logIn(values))
      .unwrap()
      .then((response) => {
        toast.success(`Welcome, ${response.user.name}`);
        navigate("/contacts", { replace: true });
      })
      .catch(() => toast.error("Wrong email or password"));

    resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={c.form}>
          <div className={c.inputContainer}>
            <label htmlFor="email">Email</label>
            <div className={c.inputWrapper}>
              <Field type="email" name="email" placeholder="Email" />
              <FaPen className={c.icon} />
            </div>
            <ErrorMessage className={c.error} name="email" component="span" />
          </div>
          <div className={c.inputContainer}>
            <label htmlFor="password">Password</label>
            <div className={c.inputWrapper}>
              <Field type="password" name="password" placeholder="Password" />
              <FaPen className={c.icon} />
            </div>
            <ErrorMessage
              className={c.error}
              name="password"
              component="span"
            />
          </div>

          <button className={c.btnForm} type="submit">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
