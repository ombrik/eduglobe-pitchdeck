import { useParams, Link } from "react-router-dom";
import { professions } from "../data/professions";
import { subjectsData } from "../data/subjects";

export default function ProfessionDetail() {
  const { id } = useParams();
  const prof = professions.find(p => p.id === id);
  const subjects = subjectsData[id] || prof?.subjects || [];

  if (!prof) {
    return (
      <main style={{ padding: "64px", textAlign: "center" }}>
        <h1>Profession not found</h1>
        <Link to="/professions">Back to list of professions</Link>
      </main>
    );
  }

  // Final exam and thesis defense (always true for MVP)
  const hasFinalExam = true;
  const hasThesisDefense = true;

  return (
    <main style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "40px 18px"
    }}>
      {/* Category Badge */}
      <span style={{
        fontSize: "0.95rem",
        color: prof.area === "Digital" ? "#2868c7" : "#19b786",
        background: prof.area === "Digital" ? "#eaf4ff" : "#e1fcf5",
        borderRadius: "8px",
        padding: "5px 18px",
        fontWeight: 600,
        marginBottom: 18,
        display: "inline-block",
        letterSpacing: ".02em"
      }}>
        {prof.area === "Digital" ? "Digital/IT" : "University program"}
      </span>
      <h1 style={{ fontSize: "2.25rem", color: "#1a2138", margin: "12px 0 2px" }}>{prof.title}</h1>
      <p style={{ color: "#2868c7", fontSize: "1.16rem", marginBottom: "26px" }}>{prof.desc}</p>
      <div style={{
        display: "flex",
        gap: "36px",
        marginBottom: "32px",
        flexWrap: "wrap"
      }}>
        <div>
          <strong>Duration:</strong> {prof.duration}
        </div>
        <div>
          <strong>Diploma:</strong> {prof.degree}
        </div>
      </div>

      <h2 style={{ fontSize: "1.16rem", marginBottom: "14px", color: "#1a2138" }}>Subjects (modules):</h2>
      {subjects.length > 0 ? (
        <ul style={{
          padding: 0,
          marginBottom: "34px",
          listStyle: "none"
        }}>
          {subjects.map(subj => (
            <li key={subj.id} style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 12px rgba(40,104,199,0.06)",
              marginBottom: "10px",
              padding: "16px 24px",
              fontSize: "1.05rem"
            }}>
              <Link to={`/professions/${prof.id}/subject/${subj.id}`} style={{ color: "#2868c7", fontWeight: 600 }}>
                {subj.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ color: "#888", marginBottom: "34px" }}>The list of subjects will appear soon.</div>
      )}

      {/* Final exam and thesis defense buttons */}
      <div style={{ display: "flex", gap: "18px", marginBottom: "40px" }}>
        {hasFinalExam && (
          <Link to={`/professions/${prof.id}/final-exam`}>
            <button style={btnExam}>Final exam</button>
          </Link>
        )}
        {hasThesisDefense && (
          <Link to={`/professions/${prof.id}/thesis-defense`}>
            <button style={btnDiploma}>Thesis defense</button>
          </Link>
        )}
      </div>
    </main>
  );
}

const btnExam = {
  background: "#2868c7",
  color: "#fff",
  border: "none",
  borderRadius: "14px",
  padding: "16px 36px",
  fontWeight: 600,
  fontSize: "1.08rem",
  cursor: "pointer"
};
const btnDiploma = {
  background: "#2fd9c0",
  color: "#fff",
  border: "none",
  borderRadius: "14px",
  padding: "16px 36px",
  fontWeight: 600,
  fontSize: "1.08rem",
  cursor: "pointer"
};
