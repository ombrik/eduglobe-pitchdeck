import { useState } from "react";

// Demo company data
const COMPANIES = [
  {
    id: 1,
    name: "TechVision",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    description: "Leading IT company. Looking for young talented frontend and data science specialists.",
    site: "https://techvision.com",
    contacts: "hr@techvision.com",
    vacancies: [
      { id: 101, title: "Junior Frontend Developer", profession: "Frontend Developer", active: true },
      { id: 102, title: "Intern Data Scientist", profession: "Data Scientist", active: true }
    ]
  },
  {
    id: 2,
    name: "FinExpert",
    logo: "https://cdn-icons-png.flaticon.com/512/4299/4299926.png",
    description: "Financial group. We invite graduates and interns.",
    site: "https://finexpert.com",
    contacts: "jobs@finexpert.com",
    vacancies: [
      { id: 201, title: "Financial Analyst", profession: "Financial Specialist", active: true }
    ]
  }
];

// Example students for preview
const STUDENTS = [
  { id: 1, name: "Ivan Petrov", profession: "Frontend Developer", diploma: true, score: 92, email: "ivan@email.com" },
  { id: 2, name: "Anna Markova", profession: "Data Scientist", diploma: false, score: 77, email: "anna@email.com" },
  { id: 3, name: "Alex Chen", profession: "Financial Specialist", diploma: true, score: 88, email: "alex@email.com" }
];

export default function EmployerPartner() {
  const [activeCompany, setActiveCompany] = useState(COMPANIES[0].id);
  const company = COMPANIES.find(c => c.id === activeCompany);

  // Partner registration
  const [regOpen, setRegOpen] = useState(false);
  const [regForm, setRegForm] = useState({ name: "", site: "", contact: "" });
  const [regSuccess, setRegSuccess] = useState(false);

  // Filter students by relevant profession (for selected company)
  const filteredStudents = STUDENTS.filter(
    s => company.vacancies.some(v => v.profession === s.profession)
  );

  function handleRegSubmit(e) {
    e.preventDefault();
    setRegSuccess(true);
    setRegForm({ name: "", site: "", contact: "" });
    setTimeout(() => {
      setRegOpen(false);
      setRegSuccess(false);
    }, 1800);
  }

  return (
    <main style={{ maxWidth: 1150, margin: "0 auto", padding: "38px 18px" }}>
      <h1 style={{ color: "#2868c7", marginBottom: 20, fontSize: "1.28rem" }}>
        Employers / Partners of the Platform
      </h1>

      {/* Partner registration button */}
      <div style={{ marginBottom: 32 }}>
        <button
          style={{
            background: "linear-gradient(90deg,#2fd9c0,#2868c7)",
            color: "#fff",
            border: "none",
            borderRadius: "13px",
            padding: "15px 42px",
            fontWeight: 800,
            fontSize: "1.13rem",
            cursor: "pointer",
            letterSpacing: ".5px",
            boxShadow: "0 2px 16px #2868c722"
          }}
          onClick={() => setRegOpen(true)}
        >
          🚀 Become a Partner / Post a Vacancy
        </button>
      </div>

      {/* Registration modal */}
      {regOpen && (
        <div style={modalBg}>
          <div style={modalWin}>
            {!regSuccess ? (
              <>
                <div style={{ fontWeight: 700, fontSize: "1.13rem", marginBottom: 16 }}>
                  Employer / Partner Registration
                </div>
                <form onSubmit={handleRegSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <input
                    placeholder="Company name"
                    value={regForm.name}
                    onChange={e => setRegForm(f => ({ ...f, name: e.target.value }))}
                    style={inputS}
                    required
                  />
                  <input
                    placeholder="Company website (https://...)"
                    value={regForm.site}
                    onChange={e => setRegForm(f => ({ ...f, site: e.target.value }))}
                    style={inputS}
                  />
                  <input
                    placeholder="Email or phone for contact"
                    value={regForm.contact}
                    onChange={e => setRegForm(f => ({ ...f, contact: e.target.value }))}
                    style={inputS}
                    required
                  />
                  <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
                    <button
                      type="button"
                      onClick={() => setRegOpen(false)}
                      style={{ ...btnStyleGray, flex: 1 }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ ...btnStyle, flex: 1 }}
                      disabled={!regForm.name || !regForm.contact}
                    >
                      Register
                    </button>
                  </div>
                  <div style={{ color: "#aaa", fontSize: ".98rem", marginTop: 6 }}>
                    After registration, we will contact you within 2 days.
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: 32 }}>
                <div style={{ fontSize: "2.1rem", marginBottom: 17 }}>🎉</div>
                <div style={{ fontWeight: 700, fontSize: "1.14rem", color: "#13bb63" }}>
                  Thank you! Your application has been received.
                </div>
                <div style={{ color: "#888", marginTop: 8, fontSize: ".98rem" }}>
                  Please wait for an email from the EduGlobe team.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Company switcher */}
      <div style={{ display: "flex", gap: 19, marginBottom: 28 }}>
        {COMPANIES.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCompany(c.id)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              background: activeCompany === c.id ? "linear-gradient(90deg,#2fd9c0,#2868c7)" : "#f7fbff",
              color: activeCompany === c.id ? "#fff" : "#2868c7",
              border: "none", borderRadius: 13, padding: "10px 22px", fontWeight: 700,
              cursor: "pointer", fontSize: "1.07rem", boxShadow: "0 1px 8px #2868c71b"
            }}
          >
            <img src={c.logo} alt={c.name} style={{ width: 30, height: 30, borderRadius: "50%" }} />
            {c.name}
          </button>
        ))}
      </div>

      {/* Company info */}
      <section style={{
        background: "#fff", borderRadius: 15, boxShadow: "0 2px 14px #2868c709",
        padding: "28px 25px", marginBottom: 32
      }}>
        <div style={{ display: "flex", gap: 25, alignItems: "flex-start" }}>
          <img src={company.logo} alt="logo" style={{ width: 64, height: 64, borderRadius: "17px", border: "2.5px solid #e0ffee" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: "1.19rem", color: "#1a2138" }}>{company.name}</div>
            <div style={{ color: "#4a7fbc", fontSize: "1.03rem", margin: "4px 0 7px" }}>
              <a href={company.site} target="_blank" rel="noopener noreferrer" style={{ color: "#2fd9c0" }}>
                {company.site.replace(/^https?:\/\//, "")}
              </a>
            </div>
            <div style={{ color: "#3d5068", fontSize: "1.04rem" }}>{company.description}</div>
            <div style={{ color: "#8bbf9d", marginTop: 4, fontSize: "0.98rem" }}>
              Contacts: <a href={`mailto:${company.contacts}`}>{company.contacts}</a>
            </div>
          </div>
        </div>

        {/* Vacancies */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontWeight: 600, color: "#2868c7", fontSize: "1.08rem", marginBottom: 9 }}>
            Open vacancies:
          </div>
          {company.vacancies.length === 0 && <span style={{ color: "#aaa" }}>No active vacancies</span>}
          <ul style={{ paddingLeft: 17, margin: 0 }}>
            {company.vacancies.map(v => (
              <li key={v.id} style={{ marginBottom: 5, color: v.active ? "#2868c7" : "#bbb" }}>
                <b>{v.title}</b> — <span style={{ color: "#333" }}>{v.profession}</span>
                <span style={{
                  marginLeft: 15, color: "#fff", background: "#2fd9c0", borderRadius: 7,
                  fontSize: "0.98rem", padding: "3px 10px", cursor: "pointer"
                }}
                  onClick={() => alert("Application sent! (MVP feature)")}
                >Apply</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Students for hire */}
      <section style={{
        background: "#fff", borderRadius: 14, boxShadow: "0 2px 12px #2868c710",
        padding: "24px 25px"
      }}>
        <div style={{ fontWeight: 700, fontSize: "1.13rem", color: "#2868c7", marginBottom: 12 }}>
          Recommended students
        </div>
        <table style={{ width: "100%", borderRadius: 12, background: "#f7fbff" }}>
          <thead>
            <tr style={{ background: "#e0ffee", color: "#2868c7" }}>
              <th style={thS}>Name</th>
              <th style={thS}>Profession</th>
              <th style={thS}>Diploma</th>
              <th style={thS}>Score</th>
              <th style={thS}>Email</th>
              <th style={thS}></th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 &&
              <tr><td colSpan={6} style={{ color: "#aaa", textAlign: "center" }}>No students in this field</td></tr>
            }
            {filteredStudents.map(st => (
              <tr key={st.id} style={{ background: "#fff" }}>
                <td style={tdS}>{st.name}</td>
                <td style={tdS}>{st.profession}</td>
                <td style={tdS}>{st.diploma ? "✅" : "—"}</td>
                <td style={tdS}>{st.score}</td>
                <td style={tdS}>{st.email}</td>
                <td style={tdS}>
                  <button style={{
                    background: "#2868c7", color: "#fff", border: "none", borderRadius: 8,
                    padding: "5px 13px", fontWeight: 600, cursor: "pointer", fontSize: "0.97rem"
                  }}
                    onClick={() => alert("Contacting a candidate is temporarily unavailable (MVP)!")}
                  >Contact</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

// --- Styles ---
const inputS = {
  borderRadius: 8,
  border: "1.3px solid #b8c7e7",
  fontSize: "1.03rem",
  padding: "8px 14px"
};
const btnStyle = {
  background: "linear-gradient(90deg,#2868c7,#2fd9c0)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  padding: "12px 28px",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer"
};
const btnStyleGray = {
  background: "#eee",
  color: "#2868c7",
  border: "none",
  borderRadius: "12px",
  padding: "9px 18px",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer"
};
const modalBg = {
  position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
  background: "rgba(0,0,0,0.14)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center"
};
const modalWin = {
  background: "#fff", borderRadius: 13, boxShadow: "0 6px 36px #2868c733",
  minWidth: 340, padding: 32, position: "relative"
};
const thS = { padding: "9px 7px", fontSize: "1rem", fontWeight: 600 };
const tdS = { padding: "8px 7px", fontSize: "1.01rem", borderBottom: "1px solid #eaf2ff" };
