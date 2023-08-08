import React from "react";
import "./UserSignup.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const formValidationSchema = yup.object({
  userName: yup.string().required().email(),
  password: yup.string().required().min(8),
});

const UserSignup = () => {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (newUser) => {
        // console.log("Form values", newUser);
        // addUser(newUser);
        const data = await fetch(`${process.env.REACT_APP_API_KEY}/users/signup`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        if (data.status === 400) {
          // console.log(Error);
          alert("UserName already exist(redirecting to login page)");
          navigate("/users/login");
        } else {
          alert("User added successfully");
          navigate("/users/login");
        }
      },
    });
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Signup Form</h1>
      <div className="login-form-container">
        <TextField
          label="Email"
          variant="outlined"
          name="userName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.userName}
          error={touched.userName && errors.userName}
          helperText={
            touched.userName && errors.userName ? errors.userName : null
          }
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={touched.password && errors.password}
          helperText={
            touched.password && errors.password ? errors.password : null
          }
        />
        <Button variant="contained" type="submit">
          Sign Up
        </Button>
        <Button variant="text" onClick={() => navigate("/users/login")}>
          Already an user? Login
        </Button>
      </div>
    </form>
  );
};

export default UserSignup;
