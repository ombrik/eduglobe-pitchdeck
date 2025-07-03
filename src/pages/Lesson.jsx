import { useParams, Link } from "react-router-dom";

import { lessonsData } from "../data/lessons";
import { subjectsData } from "../data/subjects";

export default function Lesson() {
  const { lessonId, id, subjectId } = useParams();
  const lesson = lessonsData[lessonId];

  // Find the subject (module)
  const subjectArr = subjectsData[id] || [];
  const subject = subjectArr.find(s => s.id === subjectId);

  // Check: is there a test after this lesson?
  let testId = null;
  if (subject && subject.tests && Array.isArray(subject.tests)) {
    const found = subject.tests.find(t => t.afterLesson === lessonId);
    if (found) testId = found.id;
  }

  if (!lesson) {
    return (
      <>
        <main style={{ padding: "64px", textAlign: "center" }}>
          <h1>Lesson not found</h1>
          <Link to={`/professions/${id}/subject/${subjectId}`}>Back to module</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <main style={{
        maxWidth: "740px",
        margin: "0 auto",
        padding: "38px 16px"
      }}>
        <Link to={`/professions/${id}/subject/${subjectId}`} style={{
          color: "#2868c7",
          display: "inline-block",
          marginBottom: "16px"
        }}>&larr; Back to lessons list</Link>
        <h1 style={{ fontSize: "2rem", color: "#1a2138", marginBottom: "10px" }}>{lesson.title}</h1>
        <p style={{ fontSize: "1.12rem", color: "#2868c7", marginBottom: "22px" }}>{lesson.desc}</p>
        
        {lesson.video && (
          <div style={{ marginBottom: "22px" }}>
            {/* For YouTube — embed iframe */}
            {lesson.video.includes("youtube") ? (
              <iframe
                width="100%"
                height="360"
                src={lesson.video.replace("watch?v=", "embed/")}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "12px" }}
              ></iframe>
            ) : (
              <video width="100%" height="360" controls style={{ borderRadius: "12px" }}>
                <source src={lesson.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        <div style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "26px",
          boxShadow: "0 2px 12px rgba(40,104,199,0.06)",
          marginBottom: "26px"
        }}>
          <p style={{ fontSize: "1.09rem", color: "#1a2138", lineHeight: 1.7 }}>{lesson.content}</p>
        </div>
        
        {/* Show test button only if testId found */}
        {testId && (
          <Link to={`/professions/${id}/subject/${subjectId}/test/${testId}`}>
            <button style={btnStyle}>Take lesson test</button>
          </Link>
        )}
      </main>
    </>
  );
}

const btnStyle = {
  background: "linear-gradient(90deg,#2868c7,#2fd9c0)",
  color: "#fff",
  border: "none",
  borderRadius: "14px",
  padding: "13px 32px",
  fontWeight: 600,
  fontSize: "1.07rem",
  cursor: "pointer"
};
