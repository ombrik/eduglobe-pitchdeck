import { Link } from "react-router-dom";

export default function ProfessionCard({ id, title, desc, duration, degree, area }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "18px",
      boxShadow: "0 4px 24px rgba(40,104,199,0.07)",
      padding: "32px 26px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      minHeight: "250px"
    }}>
      {/* Area Badge */}
      <span style={{
        fontSize: "0.88rem",
        color: area === "Digital" ? "#2868c7" : "#19b786",
        background: area === "Digital" ? "#eaf4ff" : "#e1fcf5",
        borderRadius: "7px",
        padding: "3px 12px",
        fontWeight: 600,
        marginBottom: 12
      }}>
        {area === "Digital" ? "Digital/IT" : "University Degree"}
      </span>
      <h2 style={{ fontSize: "1.35rem", color: "#1a2138", marginBottom: "10px" }}>{title}</h2>
      <p style={{ color: "#2868c7", margin: "0 0 12px 0" }}>{desc}</p>
      <div style={{ fontSize: "1rem", marginBottom: "18px" }}>
        <span>Duration: {duration}</span><br />
        <span>Degree: {degree}</span>
      </div>
      <Link to={`/professions/${id}`}>
        <button style={btnStyle}>Learn more</button>
      </Link>
    </div>
  );
}

const btnStyle = {
  background: "linear-gradient(90deg,#2868c7,#2fd9c0)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  padding: "10px 26px",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "auto"
};
