import React, { useRef } from "react";
import { useUpdate } from "../hooks/useUpdate";
//formik
import { Formik } from "formik";
import * as Yup from "yup";

import { TailSpin } from "react-loading-icons";


const EditProfile = ({showForm, updateProfile}) => {
  const { loading } = useUpdate();
  const fileRef = useRef(null);

  // console.log(user.currentUser);
  const FILE_SIZE = 4 * 1024 * 1024;


  const validationSchema = Yup.object().shape({
    displayName: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Please add your name!"),
    file: Yup.mixed()
      .required("File is required")
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= FILE_SIZE
      ),
  });
  return (
    <div>
      <Formik
        initialValues={{
          displayName: "",
          file: "",
        }}
        onSubmit={(values, { resetForm }) => {
          updateProfile(values);
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
          setFieldValue,
        }) => {
          return (
            <div>
              {showForm && (
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <label htmlFor="displayName">
                    <span>Edit Name</span>
                    <input
                      placeholder="Change display name"
                      type="text"
                      name="displayName"
                      value={values.displayName}
                      onChange={handleChange("displayName")}
                      onBlur={handleBlur("displayName")}
                      className="name-input"
                    />
                  </label>
                  <span style={{ color: "red" }}>
                    {touched.displayName && errors.displayName}
                  </span>
                  <label htmlFor="photo">
                    <input
                      style={{
                        width: "100%",
                        backgroundColor: "#e7e6e6",
                      }}
                      type="file"
                      name="photo"
                      ref={fileRef}
                      id="file-input"
                      onChange={(e) => setFieldValue("file", e.target.files[0])}
                    />
                  </label>
                  <span style={{ color: "red" }}>
                    {touched.file && errors.file}
                  </span>

                  {loading ? (
                    <TailSpin color="white" strokeWidth={3} size={25} />
                  ) : (
                    <button type="submit" className="save-user">
                      save changes
                    </button>
                  )}
                </form>
              )}
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditProfile;
