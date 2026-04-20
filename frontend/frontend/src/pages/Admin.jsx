import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [active, setActive] = useState("dashboard");
  const [newQuiz, setNewQuiz] = useState("");
  const [quizzes, setQuizzes] = useState([]);

  const [showAddQ, setShowAddQ] = useState(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);

  const navigate = useNavigate();

  //  Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("quizzes")) || [];
    setQuizzes(stored);
  }, []);

  const addQuiz = () => {
    if (!newQuiz) return alert("Enter quiz name");

    const updated = [
      ...quizzes,
      { id: Date.now(), name: newQuiz, questions: [] }
    ];

    setQuizzes(updated);
    localStorage.setItem("quizzes", JSON.stringify(updated));
    setNewQuiz("");
  };

  const deleteQuiz = (id) => {
    const updated = quizzes.filter(q => q.id !== id);
    setQuizzes(updated);
    localStorage.setItem("quizzes", JSON.stringify(updated));
  };

  const addQuestion = (quizId) => {
    if (!question || options.some(o => !o)) {
      alert("Fill all fields");
      return;
    }

    const updated = quizzes.map(q => {
      if (q.id === quizId) {
        return {
          ...q,
          questions: [
            ...q.questions,
            { q: question, a: options, correct }
          ]
        };
      }
      return q;
    });

    setQuizzes(updated);
    localStorage.setItem("quizzes", JSON.stringify(updated));

    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrect(0);
    setShowAddQ(null);
  };

  const renderContent = () => {
    if (active === "dashboard") {
      return (
        <div style={{ padding: "20px" }}>
          <h2>Admin Dashboard</h2>

          <div style={grid}>
            <div
              style={{ ...card, cursor: "pointer" }}
              onClick={() => setActive("view")}
            >
               Total Quizzes<br /><b>{quizzes.length}</b>
            </div>
          </div>
        </div>
      );
    }

    if (active === "add") {
      return (
        <div style={{ padding: "20px" }}>
          <h2>Add Quiz</h2>

          <input
            placeholder="Enter quiz name"
            value={newQuiz}
            onChange={(e) => setNewQuiz(e.target.value)}
            style={input}
          />

          <button style={btn} onClick={addQuiz}>
             Add Quiz
          </button>
        </div>
      );
    }

    if (active === "view") {
      return (
        <div style={{ padding: "20px" }}>
          <h2>All Quizzes</h2>

          {quizzes.length === 0 ? (
            <div style={card}>No quizzes added</div>
          ) : (
            quizzes.map(q => (
              <div key={q.id} style={quizBox}>
                <div>
                  <p style={{ margin: 0 }}>{q.name}</p>
                  <small>Questions: {q.questions?.length || 0}</small>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    style={previewBtn}
                    onClick={() => alert(`Quiz: ${q.name}\nQuestions: ${q.questions.length}`)}
                  >
                    Preview
                  </button>

                  <button
                    style={btn}
                    onClick={() => setShowAddQ(q.id)}
                  >
                    Add Q
                  </button>

                  <button
                    style={deleteBtn}
                    onClick={() => deleteQuiz(q.id)}
                  >
                    Delete
                  </button>
                </div>

                {showAddQ === q.id && (
                  <div style={{ marginTop: "15px" }}>
                    <input
                      placeholder="Question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      style={input}
                    />

                    {options.map((opt, i) => (
                      <input
                        key={i}
                        placeholder={`Option ${i + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...options];
                          newOpts[i] = e.target.value;
                          setOptions(newOpts);
                        }}
                        style={input}
                      />
                    ))}

                    <select
                      value={correct}
                      onChange={(e) => setCorrect(Number(e.target.value))}
                      style={input}
                    >
                      <option value={0}>Correct: Option 1</option>
                      <option value={1}>Correct: Option 2</option>
                      <option value={2}>Correct: Option 3</option>
                      <option value={3}>Correct: Option 4</option>
                    </select>

                    <button
                      style={btn}
                      onClick={() => addQuestion(q.id)}
                    >
                      Save Question
                    </button>
                  </div>
                )}
              </div>
            ))
          )}

          <button
            style={backBtn}
            onClick={() => setActive("dashboard")}
          >
            ⬅ Back
          </button>
        </div>
      );
    }
  };

  return (
    <div style={{ display: "flex", fontFamily: "Arial" }}>
      <div style={sidebar}>
        <h2>Admin</h2>

        <p style={menu} onClick={() => setActive("dashboard")}> Dashboard</p>
        <p style={menu} onClick={() => setActive("add")}> Add Quiz</p>
        <p style={menu} onClick={() => setActive("view")}> View Quizzes</p>

        {/*  Logout */}
        <p style={{ ...menu, marginTop: "40px", color: "#f87171" }} onClick={handleLogout}>
           Logout
        </p>
      </div>

      <div style={main}>
        {renderContent()}
      </div>
    </div>
  );
}

const sidebar = {
  width: "220px",
  background: "#111827",
  color: "#fff",
  padding: "20px",
  height: "100vh"
};

const main = {
  flex: 1,
  background: "#f3f4f6",
  minHeight: "100vh"
};

const menu = {
  margin: "15px 0",
  cursor: "pointer"
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginTop: "20px"
};

const input = {
  padding: "10px",
  width: "100%",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const btn = {
  padding: "10px 15px",
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const quizBox = {
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  marginTop: "10px"
};

const previewBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer"
};

const backBtn = {
  marginTop: "20px",
  padding: "10px",
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Admin;