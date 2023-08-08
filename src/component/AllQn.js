import "./AllQn.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllQn = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_KEY}/questions`, {
      headers: {
        "x-auth-token": sessionStorage.getItem("token")
      }
    })
    .then((res)=>res.json())
    .then((result)=>setState(result))
  },[]);
  console.log(state);
  return (
    <div>
      <div className="titles">
        <h4>All Questions</h4>
        <button className="btn" onClick={() => navigate("/askquestion")}>
          Ask Questions
        </button>
      </div>
      {state ? <GetAllQuestions data={state} /> : <h1>Loading...</h1>}
    </div>
  );
};
const GetAllQuestions = ({data}) => {
  return(<div className="card-home-map">
    {data.map((data, index)=> <Data data={data} key={index} />)}
  </div>)
}
const Data = ({data}) => {
  const navigate = useNavigate();
  return(<div  onClick={()=>navigate(`/answer/${data._id}`)} className="card-home">
    <h3>{data.topic}</h3>
    <p>{data.description}</p>
    <p>{data.userName}</p>
  </div>)
}
export default AllQn;
