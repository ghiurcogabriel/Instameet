import React from "react";
import { FaGoogle } from "react-icons/fa";
import "./LoginPage.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLogin } from "../../../hooks/useLogin";

const LoginPage = () => {
  const { login, isPending, error } = useLogin();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Please add your email address"),
    password: Yup.string().required("Please add your password"),
  });

  const handleSubmit = ({ email, password }) => {
    console.log(email, password);
    login(email, password);
  };

  return (
    <div className="login-container">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          touched,
          errors,
          handleBlur,
        }) => {
          return (
            <div className="login-container">
              <div className="form-container">
                <p className="title">Login</p>
                {/* <p>oh, Welcome back, sir!</p> */}
                <form
                  className="login-form"
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                    <span style={{ color: "red" }}>
                      {touched.email && errors.email}
                    </span>
                  </div>
                  <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                    />
                    <span style={{ color: "red" }}>
                      {touched.password && errors.password}
                    </span>
                    <div className="forgot">
                      <a rel="noopener noreferrer" href="#s">
                        Forgot Password ?
                      </a>
                    </div>
                  </div>
                  <button type="submit" className="sign">
                    {isPending ? "Loading.." : "Sign in"}
                  </button>
                  {error && <p>{error}</p>}
                </form>
                <div className="social-message">
                  <div className="line"></div>
                  <p className="message">Or login with google</p>
                  <div className="line"></div>
                </div>
                <div className="social-icons">
                  <button className="icon" type="submit">
                    <FaGoogle />
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginPage;
