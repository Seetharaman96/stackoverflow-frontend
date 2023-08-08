import { useFormik } from "formik";
import "./AskQuestion.css";
import React from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const formValidationSchema = yup.object({
  topic: yup.string().required(),
  description: yup.string().required(),
  userName: yup.string().required(),
});

const AskQuestion = () => {
  const navigate = useNavigate();
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        topic: "",
        description: "",
        userName: "",
        views: 0,
        answer: [],
      },
      validationSchema: formValidationSchema,
      onSubmit: (newQn) => {
        console.log(newQn);
        addQuestion(newQn);
      },
    });
  const addQuestion = async (newQn) => {
    await fetch(`${process.env.REACT_APP_API_KEY}/createQn`, {
      method: "POST",
      body: JSON.stringify(newQn),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token"),
      },
    });
    alert("Your Question Added Successfully");
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit} className="question-form">
      <h2>Post your question</h2>
      <div className="question-form-container">
        <TextField
          variant="outlined"
          placeholder="Question Topic"
          onChange={handleChange}
          onBlur={handleBlur}
          name="topic"
          value={values.topic}
          error={touched.topic && errors.topic}
          helperText={touched.topic && errors.topic ? errors.topic : null}
        />
        <TextField
          id="outlined-textarea"
          multiline
          rows={8}
          placeholder="Question Description"
          onChange={handleChange}
          onBlur={handleBlur}
          name="description"
          value={values.description}
          error={touched.description && errors.description}
          helperText={
            touched.description && errors.description
              ? errors.description
              : null
          }
        />
        <TextField
          variant="outlined"
          placeholder="Your name"
          onChange={handleChange}
          onBlur={handleBlur}
          name="userName"
          value={values.userName}
          error={touched.userName && errors.userName}
          helperText={
            touched.userName && errors.userName ? errors.userName : null
          }
        />
        <Button variant="contained" type="submit">
          Post Your Question
        </Button>
      </div>
    </form>
  );
};

export default AskQuestion;
