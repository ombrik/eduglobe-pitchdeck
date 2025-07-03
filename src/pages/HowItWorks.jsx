import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HowItWorks() {
  return (
    <>
      <main style={{ maxWidth: 820, margin: "0 auto", padding: "48px 16px", minHeight: "70vh" }}>
        <h1 style={{
          fontSize: "2.1rem",
          color: "#2868c7",
          fontWeight: 800,
          marginBottom: 24,
          textAlign: "center"
        }}>
          How does it work?
        </h1>
        <ol style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "32px 32px",
          boxShadow: "0 2px 14px rgba(40,104,199,0.08)",
          fontSize: "1.13rem",
          color: "#1a2138",
          lineHeight: 1.8,
          margin: "0 auto",
          maxWidth: 650
        }}>
          <li>Choose your profession online (Frontend, Marketing, Business, etc.)</li>
          <li>Go through lessons, watch videos, complete assignments</li>
          <li>Take tests and pass module exams — always with a live instructor online</li>
          <li>At the end of your studies — final exam and diploma defense</li>
          <li>Receive your diploma (electronic, or printed and delivered if you wish)</li>
          <li>Your entire learning history is in your dashboard — employers see your progress!</li>
        </ol>
        <div style={{ marginTop: 30, textAlign: "center", color: "#2fd9c0", fontWeight: 600 }}>
          <span>Study, pass exams, get your diploma — all online!</span>
        </div>
      </main>
      
    </>
  );
}
