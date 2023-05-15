import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { useSignUp } from "../../hooks/useSignUp";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuthState } from "react-firebase-hooks/auth";

// import { useAuthContext } from "../../hooks/useAuthContext";
import { authUser } from "../../firebase/config";

const Signup = () => {
  const navigate = useNavigate();

  const { user } = useAuthState(authUser);
  console.log(user);

  const { signUp, error, isPending } = useSignUp();

  const validationSchema = Yup.object().shape({
    displayName: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Please add your name!"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Please add your email address!"),
    password: Yup.string()
      .min(6, "Password must be al least 6 chars long!")
      .max(12, "Password cannot be longer than 12 chars!")
      .required("Add a password!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password required"),
    acceptTOS: Yup.bool().oneOf(
      [true],
      "You must accept our Terms and Conditions!"
    ),
  });

  const handleSubmit = ({ displayName, email, password }) => {
    console.log(email, password, displayName);
    signUp(email, password, displayName);
  };

  useEffect(() => {
    if (user) {
      console.log('logged in');
      navigate("/login");
    }
  });

  return (
    <div className="login-container">
      <Formik
        initialValues={{
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptTOS: false,
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
          handleBlur
        }) => {
          return (
            <div className="login-container">
              <div className="form-container">
                <p className="title">Sign up</p>
                <form
                  className="login-form"
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <div className="input-group">
                    <label htmlFor="username">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="username"
                      placeholder="Name"
                      value={values.displayName}
                      onChange={handleChange("displayName")}
                      onBlur={handleBlur("displayName")}
                    />
                    <span style={{ color: "red" }}>
                      {touched.displayName && errors.displayName}
                    </span>
                  </div>
                  <div className="input-group">
                    <label htmlFor="password">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                    <span style={{ color: "red" }}>
                      {touched.email && errors.email}
                    </span>
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
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                    />
                    <span style={{ color: "red" }}>
                      {touched.confirmPassword && errors.confirmPassword}
                    </span>
                    <div className="forgot">
                      <input
                        type="checkbox"
                        checked={values.acceptTOS}
                        onChange={handleChange("acceptTOS")}
                        onBlur={handleBlur("acceptTOS")}
                      />{" "}
                      Accept Terms and Conditions
                      <span style={{ color: "red" }}>
                        {touched.acceptTOS && errors.acceptTOS}
                      </span>
                    </div>
                  </div>
                  {error && <p>{error}</p>}
                  <button type="submit" className="sign">
                    {isPending ? "Loading.." : "Sign up"}
                  </button>
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Signup;
