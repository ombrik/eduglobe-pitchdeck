import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ThesisDefense() {
  const { id } = useParams();

  function handleThesisRequest() {
    alert(
      "Your application for the thesis defense has been submitted!\nA panel of professors will contact you to schedule your online defense."
    );
  }

  return (
    <>
      <main style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "36px 10px",
        minHeight: 420
      }}>
        <Link to={`/professions/${id}`} style={{
          color: "#2868c7",
          marginBottom: 16,
          display: "inline-block"
        }}>&larr; Back to profession</Link>

        <h1 style={{ fontSize: "1.6rem", color: "#1a2138", marginBottom: 18 }}>
          Thesis Defense
        </h1>

        <div style={{
          margin: "30px 0 16px 0",
          padding: 24,
          background: "#fff",
          borderRadius: "14px",
          boxShadow: "0 2px 12px rgba(40,104,199,0.06)",
          fontSize: "1.13rem"
        }}>
          <div style={{ marginBottom: 16 }}>
            <b>Attention!</b><br />
            The thesis defense is held online only, with a panel of professors.<br />
            After you submit your application, our staff will contact you to schedule the time and format of your defense.
          </div>
          <button
            onClick={handleThesisRequest}
            style={{
              background: "linear-gradient(90deg,#2868c7,#2fd9c0)",
              color: "#fff",
              border: "none",
              borderRadius: "14px",
              padding: "12px 32px",
              fontWeight: 600,
              fontSize: "1.1rem",
              cursor: "pointer",
              marginTop: 16
            }}
          >
            Apply for Thesis Defense
          </button>
        </div>
      </main>
    </>
  );
}
