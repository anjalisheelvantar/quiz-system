import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Student() {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const [results, setResults] = useState(
  JSON.parse(localStorage.getItem("results")) || {}
);

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close profile on outside click
  useEffect(() => {
    const close = () => setShowProfile(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  //  Quiz list
  const quizzes = [
    { id: 1, name: "HTML Basics" },
    { id: 2, name: "JavaScript" },
    { id: 3, name: "React" },
    { id: 4, name: "CSS" }
  ];

  const totalQuizzes = quizzes.length;
  const completedQuizzes = Object.keys(results).length;

  const averageScore =
    completedQuizzes === 0
      ? 0
      : Math.round(
          Object.values(results).reduce((a, b) => a + b, 0) /
          completedQuizzes
        );

  const filteredQuizzes = quizzes.filter(q =>
    q.name.toLowerCase().includes(search.toLowerCase())
  );

  //  Render content
  const renderContent = () => {
    if (active === "dashboard") {
      return (
        <div style={{ padding: "20px" }}>
          <h2>Welcome Back </h2>

          <div style={grid}>
          <div 
  style={{ ...card, cursor: "pointer" }} 
  onClick={() => setActive("all")}
>
  Total Quizzes<br /><b>{totalQuizzes}</b>
</div>

<div 
  style={{ ...card, cursor: "pointer" }} 
  onClick={() => setActive("completed")}
>
   Completed<br /><b>{completedQuizzes}</b>
</div>

<div 
  style={{ ...card, cursor: "pointer" }} 
  onClick={() => setActive("scores")}
>
   Average Score<br /><b>{averageScore}%</b>
</div>
          </div>
        </div>
      );
    }
if (active === "all") {
  return (
    <div style={{ padding: "20px" }}>
      <h2>All Quizzes </h2>

      {quizzes.map(q => (
        <div key={q.id} style={card}>
          {q.name}
        </div>
      ))}

      <button
        style={backBtnSecondary}
        onClick={() => setActive("dashboard")}
      >
        ⬅ Back
      </button>
    </div>
  );
}



if (active === "scores") {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Scores </h2>

      {Object.keys(results).length === 0 ? (
        <div style={card}>No scores available</div>
      ) : (
        Object.entries(results).map(([id, score]) => {
          const quiz = quizzes.find(q => q.id == id);

          return (
            <div key={id} style={card}>
              {quiz?.name} → <b>{score}%</b>
            </div>
          );
        })
      )}

      <button
        style={backBtnSecondary}
        onClick={() => setActive("dashboard")}
      >
        ⬅ Back
      </button>
    </div>
  );
}

    if (active === "quizzes") {
      return (
        <div style={{ padding: "20px" }}>
          <h2>Available Quizzes</h2>

          <input
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={input}
          />

          {filteredQuizzes.map((quiz) => {
            const completed = results[quiz.id] !== undefined;

            return (
              <div key={quiz.id} style={quizBox}>
                <div>
                  <p style={{ margin: 0 }}>{quiz.name}</p>
                  {completed && (
                    <small style={{ color: "green" }}>
                      Score: {results[quiz.id]}%
                    </small>
                  )}
                </div>

                <button
                  style={{
                    ...btn,
                    background: completed ? "green" : "#111827"
                  }}
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                >
                  {completed ? "Retake" : "Start"}
                </button>
                
              </div>
            );
          })}
        </div>
      );
    }

    if (active === "completed") {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Completed Quizzes </h2>

      {Object.keys(results).length === 0 ? (
        <div style={card}>No quizzes completed</div>
      ) : (
        Object.keys(results).map(id => {
          const quiz = quizzes.find(q => q.id == id);

          return (
            <div key={id} style={card}>
              {quiz?.name}
            </div>
          );
        })
      )}

      <button
        style={backBtnSecondary}
        onClick={() => setActive("dashboard")}
      >
        ⬅ Back
      </button>
    </div>
  );
}

    if (active === "results") {
      return (
        <div style={{ padding: "20px" }}>
          <h2>Results </h2>

          {Object.keys(results).length === 0 ? (
            <div style={card}>No quizzes completed yet.</div>
          ) : (
            Object.entries(results).map(([id, score]) => {
              const quiz = quizzes.find(q => q.id == id);

              return (
                <div key={id} style={card}>
                  {quiz?.name} → <b>{score}%</b>
                </div>
                
              );
            })
          )}
          <div>


            <button
              style={backBtnSecondary}
              onClick={() => setActive("dashboard")}
            >
              Back to home !
            </button>
          </div>
        </div>
      );
    }
  }

  <button
  onClick={() => {
    const prev = JSON.parse(localStorage.getItem("results")) || {};

    prev[id] = Math.round((score / questions.length) * 100);

    localStorage.setItem("results", JSON.stringify(prev));

    navigate(-1); //GO BACK (not login page)
  }}
  style={btn}
>
  Finish
</button>

  return (
    <div style={{ display: "flex", fontFamily: "Arial" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#111827",
        color: "#fff",
        padding: "20px",
        position: isMobile ? "fixed" : "relative",
        height: "100vh",
        left: open ? "0" : "-220px",
        transition: "0.3s",
        zIndex: 1000
      }}>
        <h2>QuizMaster</h2>

        {[
          { id: "dashboard", label: "Dashboard" },
          { id: "quizzes", label: "Quizzes" },
          { id: "results", label: "Results" }
        ].map((item) => (
          <p
            key={item.id}
            onClick={() => {
              setActive(item.id);
              if (isMobile) setOpen(false);
            }}
            style={{
              ...menu,
              background: active === item.id ? "#1f2937" : "transparent"
            }}
          >
            {item.label}
          </p>
        ))}
      </div>

      {/* Overlay */}
      {isMobile && open && (
        <div onClick={() => setOpen(false)} style={overlay} />
      )}

      {/* Main */}
      <div style={{
  flex: 1,
  marginLeft: !isMobile && open ? "220px" : "0",
  background: "#f3f4f6",
  minHeight: "100vh",
  transition: "0.3s",
  boxSizing: "border-box"
}}>
  

        {/* Topbar */}
        <div style={topbar}>
          <span onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
            ☰
          </span>

          <h3 style={{ margin: 0 }}>{active.toUpperCase()}</h3>

          {/* Profile */}
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
            <p
              style={{ cursor: "pointer", margin: 0 }}
              onClick={() => setShowProfile(!showProfile)}
            >
              👤 {localStorage.getItem("name") || localStorage.getItem("user") || "Student"} ⌄
            </p>

            {showProfile && (
              <div style={profileBox}>
                <p style={dropdown} onClick={() => navigate("/profile")}>
                   Profile
                </p>

                <p style={dropdown} onClick={handleLogout}>
                   Logout
                </p>
              </div>
            )}
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

/* styles */
const menu = {
  margin: "10px 0",
  cursor: "pointer",
  padding: "8px",
  borderRadius: "5px"
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
};

const quizBox = {
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  marginTop: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const btn = {
  padding: "8px 12px",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const backBtn = {
  padding: "10px",
  background: "green",
  color: "#fff",
  border: "none",
  borderRadius: "6px"
};

const backBtnSecondary = {
  padding: "10px",
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: "6px"
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  zIndex: 500
};

const topbar = {
  padding: "15px",
  background: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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

const profileBox = {
  position: "absolute",
  right: 0,
  top: "35px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  padding: "10px",
  width: "160px"
};

const dropdown = {
  padding: "8px",
  cursor: "pointer",
  borderRadius: "5px"
};

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  return (
    <div>
      <h2>Student Dashboard</h2>

      {students.map((s) => (
        <div key={s.id}>
          <p>Name: {s.name}</p>
          <p>Course: {s.course}</p>
        </div>
      ))}
    </div>
  );
}

export default Student;