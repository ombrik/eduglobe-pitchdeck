import { useParams, Link } from "react-router-dom";
import { subjectsData } from "../data/subjects";
import { lessonsData } from "../data/lessons";

export default function SubjectDetail() {
  const { id, subjectId } = useParams();
  const subjectArr = subjectsData[id] || [];
  const subject = subjectArr.find(s => s.id === subjectId);

  if (!subject) {
    return (
      <main style={{ padding: "64px", textAlign: "center" }}>
        <h1>Module not found</h1>
        <Link to={`/professions/${id}`}>Back to profession</Link>
      </main>
    );
  }

  // Enroll to exam button
  function handleExamRequest() {
    alert("Your request for the module exam has been sent!\nPlease wait for the teacher's invitation to the online session.");
  }

  return (
    <main style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "40px 18px"
    }}>
      <h1 style={{ fontSize: "2rem", color: "#1a2138", marginBottom: "16px" }}>
        {subject.title}
      </h1>
      <h2 style={{ fontSize: "1.1rem", color: "#2868c7", marginBottom: "24px" }}>
        Lesson list:
      </h2>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "30px" }}>
        {subject.lessons && subject.lessons.length > 0 ? (
          subject.lessons.map((lessonId, idx) => {
            const lesson = lessonsData[lessonId];
            const test = subject.tests
              ? subject.tests.find(t => t.afterLesson === lessonId)
              : null;

            return (
              <div key={lessonId}>
                <li style={{
                  background: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 2px 12px rgba(40,104,199,0.06)",
                  marginBottom: "10px",
                  padding: "14px 22px",
                  fontSize: "1.05rem"
                }}>
                  {lesson ? (
                    <Link
                      to={`/professions/${id}/subject/${subjectId}/lesson/${lessonId}`}
                      style={{ color: "#2868c7", fontWeight: 500 }}
                    >
                      {lesson.title}
                    </Link>
                  ) : (
                    <span style={{ color: "#888" }}>Lesson not found</span>
                  )}
                </li>
                {test && (
                  <li style={{
                    margin: "0 0 16px 18px",
                    padding: "6px 0 10px 0",
                    listStyle: "none"
                  }}>
                    <Link
                      to={`/professions/${id}/subject/${subjectId}/test/${test.id}`}
                      style={{
                        color: "#fff",
                        background: "#2868c7",
                        borderRadius: "10px",
                        padding: "8px 26px",
                        fontWeight: 500,
                        fontSize: "1rem",
                        marginLeft: "8px",
                        display: "inline-block"
                      }}
                    >
                      Take test for lesson {idx + 1}
                    </Link>
                  </li>
                )}
              </div>
            );
          })
        ) : (
          <li style={{ color: "#888", fontSize: "1.05rem", padding: "10px 0" }}>
            Lessons for this module have not been added yet.
          </li>
        )}
      </ul>

      {/* Enroll to module exam */}
      {subject.exam && (
        <button style={btnStyle} onClick={handleExamRequest}>
          Enroll for module exam
        </button>
      )}
    </main>
  );
}

const btnStyle = {
  background: "linear-gradient(90deg,#2868c7,#2fd9c0)",
  color: "#fff",
  border: "none",
  borderRadius: "14px",
  padding: "14px 32px",
  fontWeight: 600,
  fontSize: "1.1rem",
  cursor: "pointer",
  marginTop: "16px"
};
