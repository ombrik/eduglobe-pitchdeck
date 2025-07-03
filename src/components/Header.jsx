import { Link } from "react-router-dom";

export default function Header({ mode, demoRole }) {
  return (
    <header style={{
      background: "#1a2138",
      color: "#fff",
      padding: "16px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      marginBottom: "24px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px"
      }}>
        <Link to="/" style={{
          textDecoration: "none",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1.5rem",
          letterSpacing: ".03em"
        }}>
          EduGlobe
        </Link>
        <nav style={{ display: "flex", gap: "24px" }}>
          {/* Only for demo mode student — Professions, Dashboard */}
          {mode === "demo" && demoRole === "student" && (
            <>
              <Link to="/professions" style={navLinkStyle}>Professions</Link>
              <Link to="/dashboard" style={navLinkStyle}>Student Dashboard</Link>
            </>
          )}
          {/* Only for demo mode teacher */}
          {mode === "demo" && demoRole === "teacher" && (
            <Link to="/teacher-dashboard" style={navLinkStyle}>Teacher Dashboard</Link>
          )}
          {/* How it works and Contacts — always */}
          <Link to="/employer-partner" style={navLinkStyle}>Employers and Partners</Link>
          <Link to="/pitch-deck" style={navLinkStyle}>Pitch Deck</Link>
          <Link to="/how-it-works" style={navLinkStyle}>How It Works</Link>
          <Link to="/contacts" style={navLinkStyle}>Contacts</Link>
        </nav>
      </div>
    </header>
  );
}

const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1.1rem",
  fontWeight: 500,
  letterSpacing: ".01em",
  transition: "color 0.2s",
  padding: "4px 8px"
};
