import "./UserDetails.css";
import React, { useEffect, useState } from "react";

const UserDetails = () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_KEY}/users`, {
      headers: { "x-auth-token": sessionStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((result) => setState(result));
  }, []);
  console.log(state);
  return <div>{state ? <GetUser data={state} /> : <h2>Loading...</h2>}</div>;
};

const GetUser = ({ data }) => {
  return (
    <div className="user">
      {data.map((data, index) => (
        <User data={data} key={index} />
      ))}
    </div>
  );
};

const User = ({ data }) => {
  return (
    <div className="user-card">
      <p className="user-name">
        <strong className="user-title">User Name : </strong>
        {data.userName}
      </p>
    </div>
  );
};

export default UserDetails;
