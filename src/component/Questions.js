import React, { useEffect, useState } from "react";
import "./Questions.css";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_KEY}/`)
      .then((res) => res.json())
      .then((result) => setState(result))
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <div className="titles">
        <h4>Top Questions</h4>
        <button className="btn" onClick={() => navigate("/askquestion")}>
          Ask Questions
        </button>
      </div>
      {/* <div> */}
      {state ? <GetQuestions data={state} /> : <h2>Loading</h2>}
      {/* </div> */}
    </div>
  );
};
const GetQuestions = ({ data }) => {
  return (
    <div>
      {data.map((data, index) => (
        <Data data={data} key={index} />
      ))}
    </div>
  );
};
const Data = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/answer/${data._id}`)} className="card">
      <h3>{data.topic}</h3>
      <p className="userName">{data.userName}</p>
      <div className="view-answer">
        {/* <p>
          <strong>Votes - </strong>
          {data.votes}
        </p> */}
        <p>
          <strong>Views - </strong>
          {data.views}
        </p>
        <p>
          <strong>Answers - </strong>
          {data.answer.length}
        </p>
      </div>
    </div>
  );
};
export default Questions;
