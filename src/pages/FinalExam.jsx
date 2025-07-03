import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { examsData } from "../data/exams";

export default function FinalExam() {
  const { id } = useParams();
  const examId =
    id === "frontend"
      ? "frontendFinalExam"
      : id === "digital-marketing"
      ? "digitalMarketingFinalExam"
      : id === "business-admin"
      ? "businessAdminFinalExam"
      : null;

  const exam = examsData[examId];

  function handleFinalExamRequest() {
    alert(
      "Your request for the final exam has been submitted!\nThe exam is only conducted online with an instructor. Please wait for your invitation and video call instructions."
    );
  }

  if (!exam) {
    return (
      <main style={{ padding: 64, textAlign: "center" }}>
        <h1>Exam not found</h1>
        <Link to={`/professions/${id}`}>Back to profession</Link>
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
        to={`/professions/${id}`}
        style={{
          color: "#2868c7",
          marginBottom: 16,
          display: "inline-block",
        }}
      >
        &larr; Back to profession
      </Link>

      <h1 style={{ fontSize: "1.5rem", color: "#1a2138", marginBottom: 18 }}>
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
          The final exam is only held online with an instructor via video call or chat.
          <br />
          After submitting your request, the instructor will contact you to schedule the time.
        </div>
        <button
          onClick={handleFinalExamRequest}
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
          Sign up for the final exam
        </button>
      </div>
    </main>
  );
}
