import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { professions } from "../data/professions";
import { useState } from "react";

export default function Diploma() {
  const { id } = useParams();
  const prof = professions.find(p => p.id === id);

  // In real app: fetch status from API/database
  // For MVP: just state "pending" or "approved"
  const [approved, setApproved] = useState(false);

  function handleFakeApprove() {
    setApproved(true);
  }

  return (
    <>
      <main style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "50px 16px",
        minHeight: 480,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          background: "#fff",
          borderRadius: "24px",
          border: "4px solid #2fd9c0",
          boxShadow: "0 8px 30px rgba(40,104,199,0.13)",
          padding: "40px 28px",
          marginBottom: "40px",
          textAlign: "center",
          width: "100%",
          maxWidth: 480
        }}>
          {approved ? (
            <>
              <div style={{ fontSize: "1.2rem", color: "#2868c7", marginBottom: 14 }}>
                🎉 Congratulations!
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 14, color: "#1a2138" }}>
                Your diploma is approved!
              </div>
              <div style={{ fontSize: "1.15rem", marginBottom: 30 }}>
                <b>Profession:</b> <span style={{ color: "#2fd9c0" }}>{prof ? prof.title : id}</span>
              </div>
              <div style={{
                margin: "18px 0 28px 0",
                fontSize: "1.07rem",
                color: "#1a2138"
              }}>
                You have successfully passed the final defense. The diploma is available for download!
              </div>
              <button
                style={{
                  background: "linear-gradient(90deg,#2868c7,#2fd9c0)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "14px",
                  padding: "12px 38px",
                  fontWeight: 600,
                  fontSize: "1.13rem",
                  cursor: "pointer",
                  marginBottom: "16px"
                }}
                onClick={() => alert("Diploma download is not yet implemented (MVP)")}
              >
                Download diploma (PDF)
              </button>
            </>
          ) : (
            <>
              <div style={{ fontSize: "1.3rem", color: "#d99a0e", marginBottom: 18 }}>
                Your diploma has not been approved by the teacher yet
              </div>
              <div style={{
                marginBottom: "24px",
                fontSize: "1.11rem",
                color: "#6a5e36"
              }}>
                After successful defense and teacher approval, your diploma will be available for download.
              </div>
              {/* In future: integration with API/CRM */}
              <button
                style={{
                  background: "#ecd095",
                  color: "#473907",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 30px",
                  fontWeight: 600,
                  fontSize: "1.04rem",
                  cursor: "pointer",
                  marginTop: "10px"
                }}
                onClick={handleFakeApprove}
              >
                (Test MVP) Manually approve diploma
              </button>
            </>
          )}
          <br />
          <Link to="/professions">
            <button
              style={{
                background: "#eee",
                color: "#2868c7",
                border: "none",
                borderRadius: "14px",
                padding: "12px 38px",
                fontWeight: 600,
                fontSize: "1.07rem",
                cursor: "pointer"
              }}
            >
              Back to professions
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
