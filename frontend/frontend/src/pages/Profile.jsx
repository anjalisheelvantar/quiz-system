import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
  const savedEmail = localStorage.getItem("user");
  const savedName = localStorage.getItem("name");

  if (!savedEmail) {
    navigate("/");
    return;
  }

  setEmail(savedEmail);
  setName(savedName || "Student");
}, [navigate]);

  // Save profile
  const handleSave = () => {
    localStorage.setItem("name", name);

    alert("Profile updated successfully ");

    navigate("/student");
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={container}>
      <div style={box}>
        <h2>👤 Edit Profile</h2>

        {/* Name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          style={input}
        />

        {/* Email (readonly) */}
        <input
          value={email}
          disabled
          style={{ ...input, background: "#eee" }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        {/* Buttons */}
        <button style={btn} onClick={handleSave}>
          Save Changes
        </button>

        <button style={secondaryBtn} onClick={() => navigate("/student")}>
          Back
        </button>

        <button style={logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

/* styles */
const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f3f4f6"
};

const box = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  width: "320px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  marginTop: "10px",
  cursor: "pointer"
};

const secondaryBtn = {
  width: "100%",
  padding: "10px",
  background: "#6b7280",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  marginTop: "10px",
  cursor: "pointer"
};

const logoutBtn = {
  width: "100%",
  padding: "10px",
  background: "red",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  marginTop: "10px",
  cursor: "pointer"
};
export default Profile;