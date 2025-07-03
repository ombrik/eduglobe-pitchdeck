import { useState } from "react";

// Demo teachers for search
const allTeachers = [
  {
    id: 1,
    name: "Dmitry Martynov",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    specializations: ["Mathematics", "Physics"],
    langs: ["Russian", "English"],
    verified: true,
    birthdate: "1986-02-15"
  },
  {
    id: 2,
    name: "Olga Berezina",
    photo: "https://randomuser.me/api/portraits/women/25.jpg",
    specializations: ["Frontend Development", "JavaScript"],
    langs: ["Russian", "English", "Spanish"],
    verified: false,
    birthdate: "1993-08-30"
  },
  {
    id: 3,
    name: "Michael Chen",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    specializations: ["Finance", "Accounting"],
    langs: ["English", "Chinese (Mandarin)"],
    verified: true,
    birthdate: "1981-05-14"
  }
];

// Languages and specializations options for filters
const LANGS = ["Russian", "English", "Spanish", "Chinese (Mandarin)", "Physics", "Mathematics", "JavaScript", "Finance", "Frontend Development", "Accounting"];

// "My friends" teachers
const initialFriends = [
  allTeachers[0], // Dmitry Martynov
  allTeachers[2], // Michael Chen
];

const teacherProfile = {
  name: "Ekaterina Sokolova",
  verified: true,
  birthdate: "1992-04-11",
  photo: "https://randomuser.me/api/portraits/women/68.jpg",
  specializations: ["Frontend Development", "JavaScript", "React"],
  examLangs: ["Russian", "English"],
  documents: [
    { name: "Bachelor's Diploma.pdf", url: "/fake/bakalavr.pdf", type: "pdf" },
    { name: "React Certificate.jpg", url: "/fake/react_cert.jpg", type: "img" },
    { name: "High School Certificate.pdf", url: "/fake/attestat.pdf", type: "pdf" }
  ]
};

const students = [
  { name: "Ivan Ivanov", profession: "Frontend Developer", subject: "JS/React", date: "2025-07-05", status: "Pending" },
  { name: "Anna Petrova", profession: "Business Administration", subject: "Finance", date: "2025-07-06", status: "Pending" },
];

function fileIcon(type) {
  if (type === "pdf") return <span style={{color:"#e85c43"}}>📄</span>;
  if (type === "img") return <span style={{color:"#389afc"}}>🖼️</span>;
  return <span style={{color:"#6c757d"}}>📎</span>;
}

const initialChatHistory = {
  "Ivan Ivanov": [{ from: "teacher", text: "Hello Ivan! Ready for the exam?" }],
  "Anna Petrova": [{ from: "teacher", text: "Anna, please check the finance materials." }],
  "Dmitry Martynov": [{ from: "teacher", text: "Dmitry, hi! How are you?" }],
  "Michael Chen": [{ from: "teacher", text: "Hi Michael! Ready for next week?" }]
};

export default function TeacherDashboard({ onLogout }) {
  // States for filters, friends, chats, docs
  const [openChat, setOpenChat] = useState(null);
  const [chatHistory, setChatHistory] = useState(initialChatHistory);
  const [chatMsg, setChatMsg] = useState("");
  const [friendTeachers, setFriendTeachers] = useState(initialFriends);
  const [docView, setDocView] = useState(null); // {name, url, type} | null

  // Filters for teacher search
  const [langFilter, setLangFilter] = useState("");
  const [specFilter, setSpecFilter] = useState("");
  // Demo: search among allTeachers, excluding already added
  const teacherIdsInFriends = friendTeachers.map(t => t.id);
  const filteredTeachers = allTeachers.filter(t =>
    !teacherIdsInFriends.includes(t.id) &&
    (!langFilter || t.langs.includes(langFilter)) &&
    (!specFilter || t.specializations.includes(specFilter))
  );

  function sendMsg(name) {
    if (!chatMsg.trim()) return;
    setChatHistory(h => ({
      ...h,
      [name]: [...(h[name] || []), { from: "teacher", text: chatMsg }]
    }));
    setChatMsg("");
  }

  function handleAddFriend(t) {
    setFriendTeachers(arr => [...arr, t]);
  }

  function handleRemoveFriend(id) {
    setFriendTeachers(arr => arr.filter(t => t.id !== id));
  }

  // Document viewer
  function renderDocViewer(doc) {
    return (
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        background: "rgba(20,28,45,0.18)",
        zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <div style={{
          background: "#fff", borderRadius: 13, boxShadow: "0 6px 36px rgba(40,104,199,0.15)",
          minWidth: 330, maxWidth: 540, width: "97vw", minHeight: 240, maxHeight: 540,
          padding: "18px 22px", position: "relative", display: "flex", flexDirection: "column", alignItems: "center"
        }}>
          <div style={{ fontWeight: 700, fontSize: "1.14rem", marginBottom: 10 }}>{fileIcon(doc.type)} {doc.name}</div>
          <div style={{ flex: 1, width: "100%", maxHeight: 370, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {doc.type === "pdf" ?
              <iframe src="https://mozilla.github.io/pdf.js/web/viewer.html?file=sample.pdf" // placeholder
                style={{ width: "98%", height: 340, border: "1.5px solid #d3e5ff", borderRadius: 8 }} title={doc.name} />
              : doc.type === "img"
                ? <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600" // placeholder
                  alt={doc.name} style={{ maxWidth: "98%", maxHeight: 330, borderRadius: 7, border: "1px solid #cde" }} />
                : <div>Unknown file type</div>
            }
          </div>
          <button style={{
            position: "absolute", right: 13, top: 11, background: "none", border: "none",
            color: "#888", fontSize: "1.43rem", cursor: "pointer"
          }}
            onClick={() => setDocView(null)}
            title="Close"
          >×</button>
        </div>
      </div>
    );
  }

  // --- JSX ---

  return (
    <>
      <main style={{
        maxWidth: "1170px",
        margin: "0 auto",
        padding: "44px 16px",
        minHeight: "70vh"
      }}>
        {/* TEACHER PROFILE */}
        <section style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 32,
          marginBottom: 38,
          background: "#f6faff",
          borderRadius: "15px",
          padding: "26px 22px",
          boxShadow: "0 2px 14px rgba(40,104,199,0.06)"
        }}>
          <img src={teacherProfile.photo} alt="Teacher photo"
            style={{
              width: 86, height: 86, borderRadius: "50%", border: "4px solid #e0ffee", objectFit: "cover"
            }}
          />
          <div style={{ flex: 1, minWidth: 250 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
              <div style={{ fontWeight: 800, fontSize: "1.36rem", color: "#1a2138" }}>
                {teacherProfile.name}
              </div>
              {teacherProfile.verified && (
                <span style={{
                  color: "#13bb63", fontWeight: 700, fontSize: "1.05rem", display: "flex", alignItems: "center", gap: 4
                }}>
                  <span style={{
                    display: "inline-block", width: 16, height: 16, background: "#13bb63", borderRadius: "50%",
                    boxShadow: "0 1px 4px #a8e6c2", marginRight: 2, position: "relative"
                  }}>
                    <svg width="13" height="13" style={{position:"absolute",top:2,left:2}}><circle cx="6" cy="6" r="6" fill="#13bb63"/><path d="M4 6.5l2 2 3-4" stroke="#fff" strokeWidth="1.6" fill="none"/></svg>
                  </span>
                  Verified
                </span>
              )}
            </div>
            <div style={{ fontSize: "1.08rem", color: "#2868c7", marginBottom: 4 }}>
              {teacherProfile.specializations.join(", ")}
            </div>
            <div style={{ color: "#888", fontSize: "1rem", marginBottom: 4 }}>Teacher</div>
            <div style={{ color: "#607d8b", fontSize: "0.97rem" }}>
              Birthdate: <b>{new Date(teacherProfile.birthdate).toLocaleDateString()}</b>
            </div>
            <div style={{ color: "#607d8b", fontSize: "0.97rem", marginTop: 2 }}>
              Exam languages: <b>{teacherProfile.examLangs.join(", ")}</b>
            </div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <button
              onClick={onLogout}
              style={{
                background: "linear-gradient(90deg,#2fd9c0,#2868c7)",
                color: "#fff",
                border: "none",
                borderRadius: "14px",
                padding: "11px 24px",
                fontWeight: 600,
                fontSize: "1.01rem",
                cursor: "pointer"
              }}
            >
              Exit to main page (Home)
            </button>
          </div>
        </section>

        {/* --- DOCUMENTS --- */}
        <section style={{
          background: "#fff",
          borderRadius: "13px",
          padding: "23px 28px",
          boxShadow: "0 2px 14px rgba(40,104,199,0.06)",
          marginBottom: 34,
          marginTop: -16,
          display: "flex",
          alignItems: "flex-start",
          gap: 36
        }}>
          <div style={{ minWidth: 180, fontWeight: 600, color: "#2868c7", fontSize: "1.07rem", marginTop: 8 }}>
            Attached documents:
          </div>
          <div>
            {teacherProfile.documents.length === 0
              ? <span style={{ color: "#aaa", fontSize: "0.99rem" }}>No documents uploaded</span>
              : (
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {teacherProfile.documents.map((doc, idx) =>
                    <li key={idx} style={{
                      fontSize: "1.01rem",
                      marginBottom: 9,
                      display: "flex",
                      alignItems: "center",
                      gap: 11
                    }}>
                      {fileIcon(doc.type)}
                      <span style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block" }}>
                        {doc.name}
                      </span>
                      <a href={doc.url} download style={{
                        background: "#eaf2ff",
                        borderRadius: 7,
                        padding: "4px 11px",
                        fontSize: "0.97rem",
                        color: "#2d75c2",
                        textDecoration: "none",
                        marginLeft: 5
                      }}>Download</a>
                      <button
                        style={{
                          background: "#eaf2ff",
                          borderRadius: 7,
                          padding: "4px 11px",
                          fontSize: "0.97rem",
                          color: "#28b280",
                          marginLeft: 7,
                          border: "none",
                          cursor: "pointer"
                        }}
                        onClick={() => setDocView(doc)}
                      >View</button>
                    </li>
                  )}
                </ul>
              )
            }
          </div>
        </section>

        {/* --- FRIENDS / TEACHERS --- */}
        <section style={{
          display: "flex",
          gap: 32,
          marginBottom: 36,
          flexWrap: "wrap"
        }}>
          {/* Teacher search */}
          <div style={{
            flex: 1,
            background: "#f7fbff",
            borderRadius: "12px",
            padding: "20px 24px",
            minWidth: 300,
            maxWidth: 460,
            boxShadow: "0 2px 12px rgba(40,104,199,0.06)"
          }}>
            <div style={{ fontWeight: 700, color: "#2868c7", fontSize: "1.08rem", marginBottom: 10 }}>
              Find teachers
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
              <select value={specFilter} onChange={e => setSpecFilter(e.target.value)} style={filterStyle}>
                <option value="">All specializations</option>
                {[...new Set(LANGS.filter(x=>!x.includes("language")).concat(allTeachers.flatMap(t=>t.specializations)))].map((sp, i) =>
                  <option key={i} value={sp}>{sp}</option>
                )}
              </select>
              <select value={langFilter} onChange={e => setLangFilter(e.target.value)} style={filterStyle}>
                <option value="">All languages</option>
                {[...new Set(allTeachers.flatMap(t=>t.langs))].map((lang, i) =>
                  <option key={i} value={lang}>{lang}</option>
                )}
              </select>
            </div>
            <div>
              {filteredTeachers.length === 0 &&
                <div style={{ color: "#aaa", fontSize: "1.01rem" }}>No suitable teachers found</div>
              }
              {filteredTeachers.map(t => (
                <div key={t.id} style={{
                  display: "flex", alignItems: "center", gap: 13, marginBottom: 15,
                  background: "#fff", borderRadius: 9, padding: "7px 11px"
                }}>
                  <img src={t.photo} alt={t.name} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                  <div>
                    <div style={{ fontWeight: 600, color: "#2b3347" }}>{t.name} {t.verified && <span style={{ color: "#13bb63", marginLeft: 4 }}>✔️</span>}</div>
                    <div style={{ fontSize: "0.98rem", color: "#4d79b4" }}>{t.specializations.join(", ")}</div>
                    <div style={{ fontSize: "0.93rem", color: "#888" }}>Languages: {t.langs.join(", ")}</div>
                  </div>
                  <button
                    style={{
                      marginLeft: "auto", background: "#2fd9c0", color: "#fff", border: "none",
                      borderRadius: 8, padding: "8px 13px", fontWeight: 600, fontSize: "0.97rem", cursor: "pointer"
                    }}
                    onClick={() => handleAddFriend(t)}
                  >Add</button>
                </div>
              ))}
            </div>
          </div>

          {/* My teacher friends */}
          <div style={{
            flex: 1,
            background: "#f7fbff",
            borderRadius: "12px",
            padding: "20px 24px",
            minWidth: 300,
            maxWidth: 460,
            boxShadow: "0 2px 12px rgba(40,104,199,0.06)"
          }}>
            <div style={{ fontWeight: 700, color: "#2868c7", fontSize: "1.08rem", marginBottom: 10 }}>
              My colleagues / friends
            </div>
            {friendTeachers.length === 0 &&
              <div style={{ color: "#aaa", fontSize: "1.01rem" }}>No added teachers</div>
            }
            {friendTeachers.map(t => (
              <div key={t.id} style={{
                display: "flex", alignItems: "center", gap: 13, marginBottom: 15,
                background: "#fff", borderRadius: 9, padding: "7px 11px"
              }}>
                <img src={t.photo} alt={t.name} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                <div>
                  <div style={{ fontWeight: 600, color: "#2b3347" }}>{t.name} {t.verified && <span style={{ color: "#13bb63", marginLeft: 4 }}>✔️</span>}</div>
                  <div style={{ fontSize: "0.98rem", color: "#4d79b4" }}>{t.specializations.join(", ")}</div>
                  <div style={{ fontSize: "0.93rem", color: "#888" }}>Languages: {t.langs.join(", ")}</div>
                </div>
                <button
                  style={{
                    marginLeft: "auto", background: "#2868c7", color: "#fff", border: "none",
                    borderRadius: 8, padding: "8px 13px", fontWeight: 600, fontSize: "0.97rem", cursor: "pointer"
                  }}
                  onClick={() => setOpenChat(t.name)}
                >Chat</button>
                <button
                  style={{
                    marginLeft: 8, background: "#e8e8e8", color: "#888", border: "none",
                    borderRadius: 8, padding: "7px 11px", fontSize: "0.97rem", cursor: "pointer"
                  }}
                  onClick={() => handleRemoveFriend(t.id)}
                >Remove</button>
              </div>
            ))}
          </div>
        </section>

        {/* STUDENTS TABLE */}
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "32px 28px",
          boxShadow: "0 2px 14px rgba(40,104,199,0.08)",
          marginBottom: "32px"
        }}>
          <h2 style={{ margin: "8px 0 16px 0", color: "#2868c7", fontSize: "1.14rem" }}>
            List of students for exams/tests
          </h2>
          <table style={{
            width: "100%",
            background: "#f7faff",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(40,104,199,0.03)"
          }}>
            <thead>
              <tr style={{ background: "#e0ffee", color: "#2868c7", fontWeight: 600 }}>
                <th style={thStyle}>Student</th>
                <th style={thStyle}>Profession</th>
                <th style={thStyle}>Subject</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={idx} style={{ textAlign: "center", background: "#fff" }}>
                  <td style={tdStyle}>{s.name}</td>
                  <td style={tdStyle}>{s.profession}</td>
                  <td style={tdStyle}>{s.subject}</td>
                  <td style={tdStyle}>{s.date}</td>
                  <td style={tdStyle}>{s.status}</td>
                  <td style={tdStyle}>
                    <button style={{ ...actionBtnStyle, marginRight: 8 }} disabled>Start session</button>
                    <button
                      style={{
                        ...actionBtnStyle,
                        background: "#2fd9c0",
                        color: "#fff",
                        cursor: "pointer"
                      }}
                      onClick={() => setOpenChat(s.name)}
                      type="button"
                    >Chat</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chat window */}
        {openChat && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(20,28,45,0.22)",
            zIndex: 99, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{
              background: "#fff", borderRadius: 15, boxShadow: "0 6px 36px rgba(40,104,199,0.17)",
              minWidth: 350, maxWidth: 420, width: "94vw",
              padding: "24px 20px", position: "relative"
            }}>
              <div style={{ fontWeight: 700, color: "#2868c7", fontSize: "1.12rem", marginBottom: 7 }}>
                Chat: {openChat}
              </div>
              <div style={{
                background: "#f6faff",
                borderRadius: 9,
                minHeight: 120,
                maxHeight: 260,
                padding: "11px 9px 7px 12px",
                overflowY: "auto",
                fontSize: "1.05rem",
                marginBottom: 14
              }}>
                {(chatHistory[openChat] || []).map((msg, idx) => (
                  <div key={idx}
                    style={{
                      margin: "6px 0",
                      color: msg.from === "teacher" ? "#242" : "#17399a",
                      textAlign: msg.from === "teacher" ? "right" : "left"
                    }}>
                    <span style={{
                      background: msg.from === "teacher" ? "#e4faeb" : "#eaf2ff",
                      padding: "5px 12px",
                      borderRadius: 12,
                      display: "inline-block"
                    }}>
                      {msg.text}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  value={chatMsg}
                  placeholder="Message..."
                  style={{
                    flex: 1,
                    padding: "9px 11px",
                    borderRadius: 7,
                    border: "1.2px solid #d6e3fa",
                    fontSize: "1.04rem"
                  }}
                  onChange={e => setChatMsg(e.target.value)}
                  onKeyDown={e => (e.key === "Enter" && sendMsg(openChat))}
                  autoFocus
                />
                <button
                  style={{
                    background: "linear-gradient(90deg,#2fd9c0,#2868c7)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "7px",
                    padding: "8px 22px",
                    fontWeight: 600,
                    fontSize: "1.01rem",
                    cursor: chatMsg.trim() ? "pointer" : "not-allowed",
                    opacity: chatMsg.trim() ? 1 : 0.6
                  }}
                  onClick={() => sendMsg(openChat)}
                  type="button"
                  disabled={!chatMsg.trim()}
                >Send</button>
              </div>
              <button
                style={{
                  position: "absolute", right: 10, top: 10, background: "none", border: "none",
                  color: "#888", fontSize: "1.43rem", cursor: "pointer"
                }}
                onClick={() => setOpenChat(null)}
                title="Close"
              >×</button>
            </div>
          </div>
        )}

        {/* Document viewer */}
        {docView && renderDocViewer(docView)}

        <div style={{ color: "#888", fontSize: "1.02rem" }}>
          <ul>
            <li>Exam and test schedule</li>
            <li>Video calls with students</li>
            <li>Student progress history</li>
            <li>Teacher profile and settings</li>
          </ul>
          <p>
            All of this will be available in the full platform!
          </p>
        </div>
      </main>
    </>
  );
}

const thStyle = { padding: "9px 5px", fontSize: "1rem" };
const tdStyle = { padding: "8px 5px", fontSize: "1.01rem", borderBottom: "1px solid #eaf2ff" };
const actionBtnStyle = {
  background: "#2868c7",
  color: "#fff",
  border: "none",
  borderRadius: "7px",
  padding: "6px 16px",
  fontWeight: 600,
  fontSize: "1.01rem",
  cursor: "not-allowed"
};
const filterStyle = {
  borderRadius: 8, border: "1.3px solid #b8c7e7", fontSize: "1.03rem", padding: "7px 12px"
};
