import { useNavigate, useParams } from "react-router-dom";
import "./Answers.css";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const formValidationSchema = yup.object({
  userNameAnswer: yup.string().required(),
  answer: yup.string().required().min(8),
});

const Answers = () => {
  const [state, setState] = useState(null);
  const { id } = useParams();
  // const getQues = () => {
  //   fetch(`${API}/answer/${id}`)
  //     .then((res) => res.json())
  //     .then((result) => setState(result));
  // };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_KEY}/answer/${id}`, {
      headers: {
        "x-auth-token": sessionStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((result) => setState(result));
  }, [id]);
  return (
    <div>{state ? <GetQuestion data={state} /> : <h2>Loading...</h2>}</div>
  );
};

const GetQuestion = ({ data }) => {
  // const [vote, setVote] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
    initialValues: {
      userNameAnswer: "",
      answer: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (value) => {
      postAnswer(value);
    },
  });
  const ans = data.answer;
  // console.log(ans);
  const postAnswer = async (value) => {
    await fetch(
      `${process.env.REACT_APP_API_KEY}/answer/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(value),
        headers: { "Content-Type": "application/json" },
      },
      [id]
    );
    alert("Your Answer Added Successfully");
    // getQues();
    navigate("/");
  };
  return (
    <div>
      <div className="card">
        <h2>{data.topic}</h2>
        <p>{data.description}</p>
        <p>{data.userName}</p>
        {/* <button onClick={()=>}>Votes: {data.votes}</button> */}
      </div>
      <div className="answer">
        {ans.map((res, index) => (
          <GetAnswer res={res} key={index} />
        ))}
      </div>
      <form className="answer-form" onSubmit={handleSubmit}>
        <div className="answer-form-container">
          <TextField
            variant="outlined"
            placeholder="Your Name"
            name="userNameAnswer"
            value={values.userNameAnswer}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.userNameAnswer && errors.userNameAnswer}
            helperText={
              touched.userNameAnswer && errors.userNameAnswer ? errors.userNameAnswer : null
            }
          />
          <TextField
            id="outlined-textarea"
            multiline
            rows={8}
            placeholder="Post Your Answer"
            name="answer"
            value={values.answer}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.answer && errors.answer}
            helperText={
              touched.answer && errors.answer ? errors.answer : null
            }
          />
          <Button variant="contained" type="submit">
            Post Your Answer
          </Button>
        </div>
      </form>
    </div>
  );
};
const GetAnswer = ({ res }) => {
  return (
    <div>
      <p>{res.userNameAnswer}</p>
      <p>{res.answer}</p>
    </div>
  );
};

export default Answers;
