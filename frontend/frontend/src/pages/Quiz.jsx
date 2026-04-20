import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Quiz() {
  const { id } = useParams(); //  get subject id

  

  //  All quiz data
  const quizData = {
    1: [
      { q: "What does HTML stand for?", a: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Mark Language", "Home Tool Markup Language"], correct: 0 },
      { q: "Which tag is used for paragraph?", a: ["<p>", "<h1>", "<div>", "<span>"], correct: 0 },
      { q: "Which tag creates a link?", a: ["<a>", "<link>", "<href>", "<url>"], correct: 0 },
      { q: "HTML is used for?", a: ["Structure", "Styling", "Logic", "Database"], correct: 0 },
      { q: "Which is an empty tag?", a: ["<br>", "<p>", "<div>", "<h1>"], correct: 0 }
    ],
    2: [
      { q: "Which is a JS keyword?", a: ["let", "define", "varr", "dim"], correct: 0 },
      { q: "JS runs in?", a: ["Browser", "Compiler", "Database", "Server only"], correct: 0 },
      { q: "Which symbol is for comments?", a: ["//", "<!-- -->", "#", "**"], correct: 0 },
      { q: "Which is a data type?", a: ["String", "Style", "Design", "HTML"], correct: 0 },
      { q: "Which function prints output?", a: ["console.log()", "print()", "echo()", "display()"], correct: 0 }
    ],
    3: [
      { q: "React is?", a: ["Library", "Language", "Framework", "Database"], correct: 0 },
      { q: "Hook example?", a: ["useState", "setState", "getState", "makeState"], correct: 0 },
      { q: "React is used for?", a: ["UI", "Database", "Networking", "Storage"], correct: 0 },
      { q: "JSX stands for?", a: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "Java Extended"], correct: 0 },
      { q: "Which command creates app?", a: ["npx create-react-app", "npm install react", "react start", "node react"], correct: 0 }
    ],
    4: [
      { q: "CSS is used for?", a: ["Styling", "Structure", "Logic", "Backend"], correct: 0 },
      { q: "Property for text color?", a: ["color", "font", "text-style", "bg"], correct: 0 },
      { q: "Which is correct syntax?", a: ["color: red;", "color=red;", "color->red;", "set color red"], correct: 0 },
      { q: "Which property changes size?", a: ["font-size", "text-size", "size", "font-style"], correct: 0 },
      { q: "CSS stands for?", a: ["Cascading Style Sheets", "Creative Style System", "Color Style Sheet", "Computer Style Syntax"], correct: 0 }
    ]
  };

  const questions = quizData[id] || [];

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(30);
  const [finished, setFinished] = useState(false);

  // ⏱ TIMER
  useEffect(() => {
    if (finished) return;

    if (time === 0) {
      setFinished(true);
      return;
    }

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, finished]);

  //  NEXT
  const handleNext = () => {
    if (selected === questions[index].a[questions[index].correct]) {
      setScore(score + 1);
    }

    setSelected(null);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  //  RESULT
  if (finished) {
    return (
      <div style={container}>
        <div style={box}>
          <h1>🎉 Quiz Completed</h1>
          <h2>Your Score: {score} / {questions.length}</h2>

          <button
  onClick={() => {
    const prev = JSON.parse(localStorage.getItem("results")) || {};

    // save score in %
    prev[id] = Math.round((score / questions.length) * 100);

    localStorage.setItem("results", JSON.stringify(prev));

    //  go back to dashboard
    window.location.href = "/student";
  }}
  style={btn}
>
  Finish
</button>
        </div>
      </div>
    );
  }

  //  safety
  if (!questions.length) {
    return <h2 style={{ padding: "20px" }}>No Quiz Found</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h3 style={{ textAlign: "right" }}>⏱️ {time}s</h3>

      <p>Question {index + 1} / {questions.length}</p>

      <h2>{questions[index].q}</h2>

      {questions[index].a.map((opt, i) => (
        <button
          key={i}
          onClick={() => setSelected(opt)}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            width: "250px",
            background: selected === opt ? "#111827" : "#e5e7eb",
            color: selected === opt ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px"
          }}
        >
          {opt}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={!selected}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: selected ? "#111827" : "gray",
          color: "#fff",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Quiz;

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
  padding: "40px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
};

const btn = {
  marginTop: "20px",
  padding: "10px 20px",
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: "5px"
};