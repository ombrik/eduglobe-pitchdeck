import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Home({ onDemoLogin }) {
  const navigate = useNavigate();

  function handleDemo(role) {
    onDemoLogin(role);
    navigate("/demo");
  }
  function goToPitchDeck() {
    navigate("/pitch-deck");
  }

  return (
    <>
      {/* ----- КНОПКА-ПРЕЗЕНТАЦИЯ: красочная, переливающаяся ----- */}
      <button
        onClick={goToPitchDeck}
        className="pitch-gradient-btn"
        style={{
          position: "fixed",
          top: 74,
          right: 38,
          zIndex: 999,
          minWidth: 235,
          height: 88,
          padding: "0 46px",
          fontWeight: 900,
          fontSize: "1.25rem",
          color: "#fff",
          border: "none",
          borderRadius: "26px",
          boxShadow: "0 6px 32px #fd5c3625, 0 1.5px 16px #fff8",
          letterSpacing: "0.2px",
          textShadow: "0 2px 6px #f7b98a66, 0 0px 14px #fff6",
          outline: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.16s, box-shadow 0.18s",
          overflow: "visible",
          backdropFilter: "blur(2px)",
        }}
        onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
        onMouseUp={e => e.currentTarget.style.transform = ""}
        onMouseLeave={e => e.currentTarget.style.transform = ""}
      >
        <span style={{
          fontWeight: 900,
          fontSize: "1.22em",
          letterSpacing: "0.2px",
        }}>
          View Presentation
        </span>
        {/* АНИМАЦИЯ ГРАДИЕНТА */}
        <style>{`
          .pitch-gradient-btn {
            background: linear-gradient(105deg, #ffa928, #fd5c36 40%, #2fd9c0 80%, #2868c7 100%);
            background-size: 250% 250%;
            animation: gradient-wave 2.7s ease-in-out infinite;
            box-shadow: 0 6px 32px #fd5c362c, 0 0 0px #fff0;
          }
          @keyframes gradient-wave {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .pitch-gradient-btn:hover, .pitch-gradient-btn:focus {
            filter: brightness(1.09) saturate(1.12) drop-shadow(0 0 15px #fd5c3688);
            box-shadow: 0 9px 40px #fd5c36a8, 0 1.5px 18px #fff7;
            transition: filter 0.13s, box-shadow 0.18s;
          }
        `}</style>
      </button>

      {/* ----- КОНТЕНТ: левее! ----- */}
      <main
        style={{
          maxWidth: "1040px",
          margin: "0 auto",
          padding: "40px 0 60px 0",
          background: "linear-gradient(135deg, #f6faff 60%, #fff 100%)",
          position: "relative",
          left: "-90px", // смещение влево
        }}
      >
        <section style={{ textAlign: "center", marginBottom: "38px" }}>
          <h1
            style={{
              fontSize: "2.7rem",
              fontWeight: 800,
              marginBottom: "18px",
              color: "#1a2138",
              letterSpacing: "-1px",
            }}
          >
            Welcome to EduGlobe —{" "}
            <span style={{ color: "#2fd9c0" }}>the online university of the future</span>
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#2868c7",
              marginBottom: "28px",
            }}
          >
            Get a profession, diploma, and recognition<br />
            without borders or bureaucracy!
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "32px",
              flexWrap: "wrap",
              marginBottom: 34,
            }}
          >
            <button style={bigBtnStyle} onClick={() => handleDemo("student")}>
              Enter demo mode as a student
            </button>
            <button style={bigBtnStyleAlt} onClick={() => handleDemo("teacher")}>
              Enter demo mode as a teacher
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <a href="/register-student">
              <button style={btnStylePrimary}>Become a student</button>
            </a>
            <a href="/register-teacher">
              <button style={btnStyleOutline}>Become a teacher</button>
            </a>
            <a href="/contacts">
              <button style={btnStyle}>Contacts</button>
            </a>
          </div>
        </section>

        <section
          style={{
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 4px 24px rgba(40,104,199,0.08)",
            padding: "34px 32px",
            margin: "0 auto 44px",
            maxWidth: 800,
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              color: "#2868c7",
              fontWeight: 700,
              marginBottom: "14px",
              textAlign: "center",
            }}
          >
            How does it work?
          </h2>
          <ol
            style={{
              fontSize: "1.09rem",
              color: "#1a2138",
              lineHeight: 1.7,
              paddingLeft: 22,
              maxWidth: 660,
              margin: "0 auto",
            }}
          >
            <li>Choose your profession — dozens of in-demand specializations</li>
            <li>Study lessons and take tests at your own pace, no required breaks</li>
            <li>Take all assessments and exams online — always with a live instructor</li>
            <li>Defend your diploma and receive an official electronic (and, if desired, paper) EduGlobe diploma</li>
            <li>Study from anywhere in the world, and employers can see your achievements!</li>
          </ol>
        </section>

        <section
          style={{
            background: "#e0ffee",
            borderRadius: "18px",
            padding: "28px 30px",
            margin: "0 auto 34px",
            maxWidth: 800,
            textAlign: "center",
          }}
        >
          <div style={{ fontWeight: 500, fontSize: "1.13rem", color: "#2868c7" }}>
            Are you an employer?{" "}
            <a
              href="/employer-partner"
              style={{ color: "#2868c7", textDecoration: "underline" }}
            >
              Become our partner
            </a>
          </div>
        </section>

        <section style={{ textAlign: "center" }}>
          <p style={{ color: "#1a2138", fontSize: "1.15rem" }}>
            <strong>
              EduGlobe — your path to a profession, independence, and international education!
            </strong>
          </p>
        </section>
      </main>
    </>
  );
}

// ---- КНОПКИ ----
const bigBtnStyle = {
  background: "linear-gradient(90deg,#2868c7,#2fd9c0)",
  color: "#fff",
  fontWeight: 800,
  fontSize: "1.22rem",
  padding: "22px 48px",
  border: "none",
  borderRadius: "16px",
  cursor: "pointer",
  boxShadow: "0 2px 12px rgba(46,104,199,0.11)",
};
const bigBtnStyleAlt = {
  ...bigBtnStyle,
  background: "linear-gradient(90deg,#2fd9c0,#2868c7)",
  color: "#fff",
};
const btnStylePrimary = {
  background: "linear-gradient(90deg,#2868c7,#2fd9c0)",
  color: "#fff",
  fontWeight: 700,
  fontSize: "1.14rem",
  padding: "15px 36px",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(46,104,199,0.09)",
  marginBottom: 6,
  transition: "opacity 0.2s",
};
const btnStyle = {
  background: "#f3f7ff",
  color: "#2868c7",
  fontWeight: 600,
  fontSize: "1.09rem",
  padding: "15px 36px",
  border: "1.5px solid #2868c7",
  borderRadius: "999px",
  cursor: "pointer",
  marginBottom: 6,
  transition: "background 0.2s, color 0.2s",
};
const btnStyleOutline = {
  ...btnStyle,
  background: "#fff",
  border: "2px solid #2868c7",
  color: "#2868c7",
};
