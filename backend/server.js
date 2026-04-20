const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9740084257",
  database: "quizmaster"
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// LOGIN API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      res.json({
        message: "Login successful",
        role: result[0].role
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// TEST
app.get("/", (req, res) => {
  res.send("Server Running");
});

// Sample student data
let students = [
  { id: 1, name: "Raghavi", course: "CSE" },
  { id: 2, name: "Anu", course: "IT" }
];

// API to get students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// API to add student
app.post("/api/students", (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.json({ message: "Student added", students });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});