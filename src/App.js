import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import AskQn from "./routes/AskQn";
import Question from "./routes/Question";
import Answer from "./routes/Answer";
import Users from "./routes/Users";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/questions"
          element={
            <ProtectedRoute>
              <Question />
            </ProtectedRoute>
          }
        />
        <Route
          path="/askQuestion"
          element={
            <ProtectedRoute>
              <AskQn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/answer/:id"
          element={
            <ProtectedRoute>
              <Answer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
