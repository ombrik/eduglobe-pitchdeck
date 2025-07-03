import { useParams, Link } from "react-router-dom";
import { examsData } from "../data/exams";

export default function Exam() {
  const { id, subjectId, examId } = useParams();
  const exam = examsData[examId];

  function handleExamRequest() {
    alert(
      "Your request for the online exam has been submitted!\nThe instructor will contact you and schedule a video session. Good luck!"
    );
  }

  if (!exam) {
    return (
      <main style={{ padding: 64, textAlign: "center" }}>
        <h1>Exam not found</h1>
        <Link to={`/professions/${id}/subject/${subjectId}`}>Back to module</Link>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "36px 10px",
        minHeight: 420,
      }}
    >
      <Link
        to={`/professions/${id}/subject/${subjectId}`}
        style={{
          color: "#2868c7",
          marginBottom: 16,
          display: "inline-block",
        }}
      >
        &larr; Back to module
      </Link>

      <h1 style={{ fontSize: "1.5rem", color: "#1a2138", marginBottom: 20 }}>
        {exam.title}
      </h1>

      <div
        style={{
          margin: "30px 0 16px 0",
          padding: 24,
          background: "#fff",
          borderRadius: "14px",
          boxShadow: "0 2px 12px rgba(40,104,199,0.06)",
          fontSize: "1.13rem",
        }}
      >
        <div style={{ marginBottom: 14 }}>
          <b>Attention!</b>
          <br />
          This exam is held only online with an instructor via video call or chat.
          <br />
          After submitting your request, the instructor will contact you to agree on the time.
        </div>
        <button
          onClick={handleExamRequest}
          style={{
            background: "linear-gradient(90deg,#2868c7,#2fd9c0)",
            color: "#fff",
            border: "none",
            borderRadius: "14px",
            padding: "12px 32px",
            fontWeight: 600,
            fontSize: "1.1rem",
            cursor: "pointer",
            marginTop: 16,
          }}
        >
          Sign up for online exam
        </button>
      </div>
    </main>
  );
}
