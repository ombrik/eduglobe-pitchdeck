import { useParams, Link } from "react-router-dom";
import { testsData } from "../data/tests";
import { useState } from "react";

export default function Test() {
  const { id, subjectId, testId } = useParams();
  const test = testsData[testId];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  if (!test) {
    return (
      <main style={{ padding: 64, textAlign: "center" }}>
        <h1>Test not found</h1>
        <Link to={`/professions/${id}/subject/${subjectId}`}>Back to module</Link>
      </main>
    );
  }

  const question = test.questions[step];

  function handleAnswer(index) {
    setAnswers([...answers, index]);
    if (step < test.questions.length - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  }

  function getResult() {
    let correct = 0;
    for (let i = 0; i < test.questions.length; i++) {
      if (test.questions[i].answer === answers[i]) correct++;
    }
    return correct;
  }

  function handleRetry() {
    setAnswers([]);
    setStep(0);
    setFinished(false);
  }

  return (
    <main style={{
      maxWidth: 600,
      margin: "0 auto",
      padding: "36px 10px",
      minHeight: 420
    }}>
      <Link to={`/professions/${id}/subject/${subjectId}`} style={{
        color: "#2868c7",
        marginBottom: 16,
        display: "inline-block"
      }}>&larr; Back to module</Link>

      <h1 style={{ fontSize: "1.5rem", color: "#1a2138" }}>{test.title}</h1>

      {!finished ? (
        <div>
          <div style={{
            margin: "30px 0 16px 0",
            padding: 24,
            background: "#fff",
            borderRadius: "14px",
            boxShadow: "0 2px 12px rgba(40,104,199,0.06)"
          }}>
            <div style={{ marginBottom: 18, fontWeight: 500 }}>
              Question {step + 1} of {test.questions.length}
            </div>
            <div style={{ marginBottom: 18, fontSize: "1.13rem" }}>
              {question.question}
            </div>
            <div>
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  style={testBtnStyle}
                  onClick={() => handleAnswer(idx)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          background: "#e0ffee",
          borderRadius: 12,
          padding: "28px 22px",
          marginTop: 34,
          textAlign: "center"
        }}>
          <div style={{ fontSize: "1.2rem", marginBottom: 18 }}>
            Your result: <b>{getResult()}</b> out of <b>{test.questions.length}</b>
          </div>
          <div style={{
            margin: "12px auto 18px auto",
            textAlign: "left",
            maxWidth: 380
          }}>
            {test.questions.map((q, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 500 }}>
                  {i + 1}. {q.question}
                </div>
                {q.options.map((opt, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: "inline-block",
                      marginRight: 8,
                      marginBottom: 2,
                      padding: "5px 13px",
                      borderRadius: 9,
                      background:
                        idx === q.answer
                          ? "#b7f6e0"
                          : (answers[i] === idx && answers[i] !== q.answer ? "#ffdddd" : "#f6faff"),
                      color:
                        idx === q.answer
                          ? "#0b9774"
                          : (answers[i] === idx && answers[i] !== q.answer ? "#b7322c" : "#1a2138"),
                      fontWeight:
                        idx === q.answer
                          ? 700
                          : (answers[i] === idx && answers[i] !== q.answer ? 600 : 400),
                      border:
                        idx === q.answer
                          ? "1.2px solid #19b786"
                          : (answers[i] === idx && answers[i] !== q.answer ? "1.2px solid #f48b8b" : "1.2px solid #e6eefa"),
                    }}
                  >
                    {opt}
                    {idx === q.answer ? " ✓" : answers[i] === idx && answers[i] !== q.answer ? " ✗" : ""}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div>
            <Link to={`/professions/${id}/subject/${subjectId}`}>
              <button style={testBtnPrimary}>
                Back to lessons
              </button>
            </Link>
            <button style={testBtnSecondary} onClick={handleRetry}>
              Try again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

// Button styles
const testBtnStyle = {
  background: "#eaf4ff",
  color: "#1a2138",
  border: "none",
  borderRadius: 10,
  padding: "10px 26px",
  fontSize: "1.07rem",
  marginBottom: 12,
  marginRight: 8,
  cursor: "pointer",
  display: "block",
  width: "100%",
  textAlign: "left"
};
const testBtnPrimary = {
  background: "linear-gradient(90deg,#2868c7,#2fd9c0)",
  color: "#fff",
  border: "none",
  borderRadius: "14px",
  padding: "12px 32px",
  fontWeight: 600,
  fontSize: "1.07rem",
  cursor: "pointer",
  marginTop: 12,
  marginRight: 10
};
const testBtnSecondary = {
  ...testBtnPrimary,
  background: "#fff",
  color: "#2868c7",
  border: "2px solid #2868c7"
};
