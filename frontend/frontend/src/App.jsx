import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import logo from "./assets/logo.png";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  const login = () => {
  const savedPassword = localStorage.getItem("password");

  if (!email || !password) {
    alert("Enter email & password");
    return;
  }

  // ✅ First time setup
  if (!savedPassword) {
    localStorage.setItem("password", password);
    localStorage.setItem("user", email);

    if (role === "student") navigate("/student");
    else navigate("/admin");

    return;
  }

  // ❌ Wrong password
  if (password !== savedPassword) {
    alert("Wrong password ❌");
    return;
  }

  // ✅ Login success
  localStorage.setItem("user", email);

  // 🔥 THIS IS THE IMPORTANT FIX
  if (role === "student") {
    navigate("/student");
  } else {
    navigate("/admin");
  }
};

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#eef2f7"
    }}>
      <div style={{
        width: "350px",
        padding: "30px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
  <img 
    src={logo} 
    alt="QuizMaster Logo" 
    style={{ width: "70px", height: "70px", marginBottom: "5px" }} 
  />
  <h2>QuizMaster</h2>
</div>
        {/* Role Switch */}
        <div style={{ display: "flex", marginBottom: "15px" }}>
          {["student", "admin"].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                flex: 1,
                padding: "8px",
                background: role === r ? "#000" : "#ddd",
                color: role === r ? "#fff" : "#000",
                border: "none"
              }}
            >
              {r}
            </button>
          ))}
        </div>

        <input
          placeholder="Email"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "10px",
            background: "#000",
            color: "#fff",
            border: "none"
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default App;