import { useState } from "react";

// ---------------------------
// MOCK-ДАННЫЕ: ПРОФИЛЬ СТУДЕНТА
// ---------------------------
const studentProfile = {
  name: "Alexander Bobrikov",
  photo: "https://randomuser.me/api/portraits/men/48.jpg",
  verified: true,
  email: "my@email.com",
  birthdate: "1995-05-29",
  passportVerified: true,
  documents: [
    { name: "Passport.pdf", url: "/fake/passport.pdf", type: "pdf" },
    { name: "Frontend Certificate.jpg", url: "/fake/frontend_cert.jpg", type: "img" }
  ]
};

// --- Остальные MOCK-данные для dashboard ---
const PROFESSIONS_LIST = [
  { id: "frontend", title: "Frontend Developer" },
  { id: "marketing", title: "Digital Marketer" },
  { id: "data-science", title: "Data Scientist" },
  { id: "finance", title: "Financial Specialist" }
];
const ALL_TEACHERS = [
  {
    id: 1,
    name: "Dmitry Martynov",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    specializations: ["Frontend Developer", "Data Scientist"],
    langs: ["Russian", "English"],
    verified: true
  },
  {
    id: 2,
    name: "Olga Berezina",
    photo: "https://randomuser.me/api/portraits/women/25.jpg",
    specializations: ["Frontend Developer", "Digital Marketer"],
    langs: ["Russian", "English", "Spanish"],
    verified: false
  },
  {
    id: 3,
    name: "Michael Chen",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    specializations: ["Financial Specialist"],
    langs: ["English", "Chinese (Mandarin)"],
    verified: true
  }
];
const ALL_STUDENTS = [
  {
    id: 101,
    name: "Ivan Petrov",
    photo: "https://randomuser.me/api/portraits/men/54.jpg",
    specialization: "Frontend Developer",
    lang: "Russian",
    verified: true
  },
  {
    id: 102,
    name: "Julia Chen",
    photo: "https://randomuser.me/api/portraits/women/55.jpg",
    specialization: "Frontend Developer",
    lang: "English",
    verified: false
  },
  {
    id: 103,
    name: "Pavel Smirnov",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    specialization: "Data Scientist",
    lang: "Russian",
    verified: true
  }
];
const DIPLOMAS = [
  { id: "marketing", title: "Digital Marketer", date: "2024-08-15" }
];

function getDefaultTeachersForProfession(profTitle) {
  return ALL_TEACHERS.filter(t => t.specializations.includes(profTitle)).slice(0, 1).map(t => t.id);
}

export default function DemoDashboard({ onLogout }) {
  // --- STATE: Профессии, модалки, чаты, фильтры, друзья ---
  const [myProfessions, setMyProfessions] = useState([
    {
      id: "frontend",
      title: "Frontend Developer",
      status: "active",
      pending: ["JavaScript Exam", "Final Exam"],
      diplomaStatus: "Waiting for defense",
      teachers: getDefaultTeachersForProfession("Frontend Developer")
    },
    {
      id: "marketing",
      title: "Digital Marketer",
      status: "diploma_ready",
      pending: [],
      diplomaStatus: "Diploma received",
      teachers: getDefaultTeachersForProfession("Digital Marketer")
    }
  ]);
  const [addModal, setAddModal] = useState(false);
  const [addProfessionId, setAddProfessionId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // --- Друзья/студенты, фильтры, чаты ---
  const [myStudentFriends, setMyStudentFriends] = useState([101]);
  const [studentLangFilter, setStudentLangFilter] = useState("");
  const [studentSpecFilter, setStudentSpecFilter] = useState("");
  const [openStudentChat, setOpenStudentChat] = useState(null);
  const [openTeacherChat, setOpenTeacherChat] = useState(null);

  // --- Popup просмотра документа ---
  const [docView, setDocView] = useState(null);

  // --- Добавить учителя (заглушка) ---
  function handleAddTeacher(profId) {
    window.alert("Available in the full version");
  }
  function handleDeleteTeacher(profId, teacherId) {
    setMyProfessions(arr => arr.map(p =>
      p.id === profId
        ? { ...p, teachers: p.teachers.filter(id => id !== teacherId) }
        : p
    ));
  }

  // --- Добавить профессию ---
  function handleAddProfession() {
    if (!addProfessionId) return;
    const p = PROFESSIONS_LIST.find(p => p.id === addProfessionId);
    if (!p) return;
    setMyProfessions(arr => [...arr, {
      id: p.id,
      title: p.title,
      status: "active",
      pending: ["First Exam"],
      diplomaStatus: "Learning started",
      teachers: getDefaultTeachersForProfession(p.title)
    }]);
    setAddModal(false);
    setAddProfessionId("");
  }

  // --- Удаление профессии (модалка) ---
  function startDeleteProfession(id) {
    setPendingDeleteId(id);
    setDeleteModal(true);
    setConfirmDelete(false);
  }
  function confirmDeleteProfession() {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setMyProfessions(arr => arr.filter(p => p.id !== pendingDeleteId));
    setDeleteModal(false);
    setPendingDeleteId(null);
    setConfirmDelete(false);
  }
  function cancelDeleteProfession() {
    setDeleteModal(false);
    setPendingDeleteId(null);
    setConfirmDelete(false);
  }

  // --- Фильтр студентов ---
  const filteredStudents = ALL_STUDENTS.filter(st =>
    (!studentLangFilter || st.lang === studentLangFilter) &&
    (!studentSpecFilter || st.specialization === studentSpecFilter) &&
    !myStudentFriends.includes(st.id)
  );
  function addStudentFriend(id) { setMyStudentFriends(f => [...f, id]); }
  function removeStudentFriend(id) { setMyStudentFriends(f => f.filter(x => x !== id)); }

  // --- POPUP для чата (заглушка) ---
  function ChatPopup({ open, name, onClose }) {
    if (!open) return null;
    return (
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        background: "rgba(0,0,0,0.13)", zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <div style={{
          background: "#fff", borderRadius: 13, boxShadow: "0 8px 30px #2868c722",
          minWidth: 300, padding: 24, position: "relative"
        }}>
          <b style={{ fontSize: "1.09rem" }}>Chat with {name}</b>
          <div style={{ margin: "18px 0", color: "#888" }}>Fake chat. Implementation coming soon.</div>
          <button onClick={onClose} style={{
            position: "absolute", right: 12, top: 12, background: "none", border: "none",
            color: "#999", fontSize: "1.3rem", cursor: "pointer"
          }}>×</button>
        </div>
      </div>
    );
  }

  // --- POPUP для просмотра документов ---
  function renderDocViewer(doc) {
    return (
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        background: "rgba(20,28,45,0.18)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <div style={{
          background: "#fff", borderRadius: 13, boxShadow: "0 6px 36px rgba(40,104,199,0.15)",
          minWidth: 330, maxWidth: 540, width: "97vw", minHeight: 240, maxHeight: 540,
          padding: "18px 22px", position: "relative", display: "flex", flexDirection: "column", alignItems: "center"
        }}>
          <div style={{ fontWeight: 700, fontSize: "1.14rem", marginBottom: 10 }}>
            {doc.type === "pdf" ? "📄" : doc.type === "img" ? "🖼️" : "📎"} {doc.name}
          </div>
          <div style={{ flex: 1, width: "100%", maxHeight: 370, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {doc.type === "pdf" ?
              <iframe src="https://mozilla.github.io/pdf.js/web/viewer.html?file=sample.pdf"
                style={{ width: "98%", height: 340, border: "1.5px solid #d3e5ff", borderRadius: 8 }} title={doc.name} />
              : doc.type === "img"
                ? <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600"
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

  // ------------------------------------------------------
  // JSX РАЗМЕТКА DASHBOARD С ПОДПИСЯМИ //--- СЕКЦИЯ ---
  // ------------------------------------------------------
  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "38px 16px" }}>
      {/* --- СЕКЦИЯ: ЛИЧНАЯ ИНФОРМАЦИЯ СТУДЕНТА --- */}
      <section style={{
        display: "flex", alignItems: "flex-start", gap: 32, background: "#f6faff",
        borderRadius: "14px", padding: "22px 28px", marginBottom: 20, boxShadow: "0 2px 12px #2868c710"
      }}>
        <img
          src={studentProfile.photo}
          alt="Photo"
          style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid #e0ffee", objectFit: "cover" }}
        />
        <div style={{ flex: 1, minWidth: 250 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
            <div style={{ fontWeight: 800, fontSize: "1.23rem", color: "#1a2138" }}>
              {studentProfile.name}
            </div>
            {studentProfile.verified && (
              <span style={{ color: "#13bb63", fontWeight: 700, fontSize: "1.05rem", display: "flex", alignItems: "center", gap: 4 }}>
                ✔️ Verified
              </span>
            )}
          </div>
          <div style={{ color: "#4a7fbc", fontSize: "1.03rem" }}>{studentProfile.email}</div>
          <div style={{ color: "#607d8b", fontSize: "0.97rem", marginTop: 2 }}>
            Birthdate: <b>{new Date(studentProfile.birthdate).toLocaleDateString()}</b>
          </div>
          <div style={{ marginTop: 6 }}>
            Passport verification:&nbsp;
            <b style={{ color: studentProfile.passportVerified ? "#2fd9c0" : "#e85c43" }}>
              {studentProfile.passportVerified ? "Passed" : "Not passed"}
            </b>
          </div>
        </div>
        <button onClick={onLogout} style={btnStyleGray}>Log out to homepage</button>
      </section>

      {/* --- СЕКЦИЯ: ДОКУМЕНТЫ --- */}
      {studentProfile.documents?.length > 0 && (
        <section style={{
          background: "#fff", borderRadius: "13px", padding: "18px 26px",
          boxShadow: "0 2px 14px rgba(40,104,199,0.07)", marginBottom: 30, display: "flex", alignItems: "flex-start", gap: 32
        }}>
          <div style={{ minWidth: 170, fontWeight: 600, color: "#2868c7", fontSize: "1.05rem", marginTop: 8 }}>
            Uploaded documents:
          </div>
          <div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {studentProfile.documents.map((doc, idx) =>
                <li key={idx} style={{
                  fontSize: "1.01rem",
                  marginBottom: 9,
                  display: "flex",
                  alignItems: "center",
                  gap: 11
                }}>
                  {doc.type === "pdf" ? "📄" : doc.type === "img" ? "🖼️" : "📎"}
                  <span style={{ maxWidth: 210, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block" }}>
                    {doc.name}
                  </span>
                  <a href={doc.url} download style={{
                    background: "#eaf2ff", borderRadius: 7, padding: "4px 11px",
                    fontSize: "0.97rem", color: "#2d75c2", textDecoration: "none", marginLeft: 5
                  }}>Download</a>
                  <button
                    style={{
                      background: "#eaf2ff", borderRadius: 7, padding: "4px 11px", fontSize: "0.97rem",
                      color: "#28b280", marginLeft: 7, border: "none", cursor: "pointer"
                    }}
                    onClick={() => setDocView(doc)}
                  >View</button>
                </li>
              )}
            </ul>
          </div>
        </section>
      )}

      {/* --- СЕКЦИЯ: МОИ ПРОФЕССИИ --- */}
      <section style={{ marginBottom: 38 }}>
        <h2 style={{ color: "#2868c7", fontSize: "1.17rem", marginBottom: 13 }}>My Professions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {myProfessions.map(prof => (
            <div key={prof.id} style={{
              background: "#fff", borderRadius: "14px", boxShadow: "0 2px 12px #2868c710",
              padding: "18px 22px", position: "relative"
            }}>
              <div style={{ fontWeight: 600, fontSize: "1.14rem", color: "#1a2138" }}>{prof.title}</div>
              <div style={{ fontSize: "1.01rem", color: "#3d5068", margin: "10px 0 16px" }}>
                {prof.status === "active" && (
                  <>Status: <span style={{ color: "#ecd095" }}>Learning in progress</span></>
                )}
                {prof.status === "diploma_ready" && (
                  <>Status: <span style={{ color: "#2fd9c0" }}>Diploma received</span></>
                )}
              </div>
              {/* Exams */}
              {prof.pending.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <b>To pass:</b>
                  <ul style={{ margin: "10px 0 0 22px" }}>
                    {prof.pending.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              )}
              {/* Teachers */}
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: "0.97rem", color: "#2a538a", marginBottom: 5 }}>
                  Teachers:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {prof.teachers.map(tid => {
                    const t = ALL_TEACHERS.find(tt => tt.id === tid);
                    if (!t) return null;
                    return (
                      <div key={t.id} style={{
                        display: "flex", alignItems: "center", gap: 10, background: "#f7fbff",
                        borderRadius: 7, padding: "7px 10px"
                      }}>
                        <img src={t.photo} alt={t.name} style={{ width: 34, height: 34, borderRadius: "50%" }} />
                        <div style={{ minWidth: 100 }}>
                          <div><span style={{ fontWeight: 600 }}>{t.name}</span></div>
                          <div style={{ fontSize: "0.97rem", color: "#4d79b4" }}>{prof.title}</div>
                        </div>
                        <button
                          style={{
                            background: "#2868c7", color: "#fff", border: "none",
                            borderRadius: 8, padding: "6px 13px", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer"
                          }}
                          onClick={() => setOpenTeacherChat(t.name)}
                        >Chat</button>
                        <button
                          style={{
                            background: "#ffeaea", color: "#e85c43", border: "none",
                            borderRadius: 8, padding: "6px 11px", fontSize: "0.95rem", marginLeft: 8, cursor: "pointer"
                          }}
                          onClick={() => handleDeleteTeacher(prof.id, t.id)}
                        >Remove</button>
                      </div>
                    );
                  })}
                  <button
                    style={{
                      background: "#e7f3fa", color: "#2868c7", border: "1px dashed #93c2e3",
                      borderRadius: 7, padding: "7px 10px", marginTop: 5, fontWeight: 500, cursor: "pointer"
                    }}
                    onClick={() => handleAddTeacher(prof.id)}
                  >+ Add teacher</button>
                </div>
              </div>
              {/* Learning button */}
              <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
                <button style={btnStyle}>Continue learning</button>
              </div>
              <div style={{ color: "#6c7a8a", fontSize: "0.98rem", marginTop: 6 }}>{prof.diplomaStatus}</div>
              <button
                style={{
                  position: "absolute", top: 11, right: 14,
                  background: "#ffeaea", color: "#e85c43", border: "none",
                  borderRadius: 6, fontSize: "0.96rem", padding: "4px 9px", cursor: "pointer"
                }}
                onClick={() => startDeleteProfession(prof.id)}
                title="Remove profession"
              >Remove</button>
            </div>
          ))}
          <button style={{
            background: "linear-gradient(90deg,#2868c7,#2fd9c0)",
            color: "#fff", border: "none", borderRadius: "12px", padding: "12px 18px",
            fontWeight: 600, fontSize: "1rem", cursor: "pointer", minWidth: 120
          }}
            onClick={() => setAddModal(true)}
          >+ Add</button>
        </div>
      </section>

      {/* --- MODAL: Добавить профессию --- */}
      {addModal && (
        <div style={modalBg}>
          <div style={modalWin}>
            <div style={{ fontWeight: 600, marginBottom: 16 }}>Add a profession</div>
            <select
              value={addProfessionId}
              onChange={e => setAddProfessionId(e.target.value)}
              style={filterStyle}
            >
              <option value="">Select a profession...</option>
              {PROFESSIONS_LIST.filter(p => !myProfessions.some(m => m.id === p.id)).map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
            <div style={{ marginTop: 18, textAlign: "right" }}>
              <button onClick={() => setAddModal(false)} style={btnStyleGray}>Cancel</button>
              <button onClick={handleAddProfession} style={{ ...btnStyle, marginLeft: 13 }} disabled={!addProfessionId}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: Удалить профессию --- */}
      {deleteModal && (
        <div style={modalBg}>
          <div style={modalWin}>
            {!confirmDelete ? (
              <>
                <div style={{ marginBottom: 15 }}>Are you sure you want to remove this profession?</div>
                <button onClick={confirmDeleteProfession} style={btnStyleRed}>Remove</button>
                <button onClick={cancelDeleteProfession} style={{ ...btnStyleGray, marginLeft: 14 }}>Cancel</button>
              </>
            ) : (
              <>
                <div style={{ marginBottom: 15, color: "#e85c43" }}>Please confirm the deletion!</div>
                <button onClick={confirmDeleteProfession} style={btnStyleRed}>Confirm removal</button>
                <button onClick={cancelDeleteProfession} style={{ ...btnStyleGray, marginLeft: 14 }}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* --- СЕКЦИЯ: ДРУЗЬЯ/СТУДЕНТЫ --- */}
      <section style={{ display: "flex", gap: 32, marginBottom: 36, flexWrap: "wrap" }}>
        {/* --- Найти студентов --- */}
        <div style={{
          flex: 1, background: "#f7fbff", borderRadius: "12px", padding: "20px 24px",
          minWidth: 300, maxWidth: 460, boxShadow: "0 2px 12px #2868c709"
        }}>
          <div style={{ fontWeight: 700, color: "#2868c7", fontSize: "1.08rem", marginBottom: 10 }}>
            Find students
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
            <select value={studentSpecFilter} onChange={e => setStudentSpecFilter(e.target.value)} style={filterStyle}>
              <option value="">All specializations</option>
              {PROFESSIONS_LIST.map((sp, i) => <option key={i} value={sp.title}>{sp.title}</option>)}
            </select>
            <select value={studentLangFilter} onChange={e => setStudentLangFilter(e.target.value)} style={filterStyle}>
              <option value="">All languages</option>
              {["Russian", "English"].map((l, i) => <option key={i} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            {filteredStudents.length === 0 &&
              <div style={{ color: "#aaa", fontSize: "1.01rem" }}>No matching students</div>
            }
            {filteredStudents.map(st => (
              <div key={st.id} style={{
                display: "flex", alignItems: "center", gap: 13, marginBottom: 15,
                background: "#fff", borderRadius: 9, padding: "7px 11px"
              }}>
                <img src={st.photo} alt={st.name} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                <div>
                  <div style={{ fontWeight: 600, color: "#2b3347" }}>{st.name} {st.verified && <span style={{ color: "#13bb63", marginLeft: 4 }}>✔️</span>}</div>
                  <div style={{ fontSize: "0.98rem", color: "#4d79b4" }}>{st.specialization}</div>
                  <div style={{ fontSize: "0.93rem", color: "#888" }}>Language: {st.lang}</div>
                </div>
                <button
                  style={{
                    marginLeft: "auto", background: "#2fd9c0", color: "#fff", border: "none",
                    borderRadius: 8, padding: "8px 13px", fontWeight: 600, fontSize: "0.97rem", cursor: "pointer"
                  }}
                  onClick={() => addStudentFriend(st.id)}
                >Add</button>
              </div>
            ))}
          </div>
        </div>
        {/* --- Мои друзья-студенты --- */}
        <div style={{
          flex: 1, background: "#f7fbff", borderRadius: "12px", padding: "20px 24px",
          minWidth: 300, maxWidth: 460, boxShadow: "0 2px 12px #2868c709"
        }}>
          <div style={{ fontWeight: 700, color: "#2868c7", fontSize: "1.08rem", marginBottom: 10 }}>
            My student friends
          </div>
          {myStudentFriends.length === 0 &&
            <div style={{ color: "#aaa", fontSize: "1.01rem" }}>No students added</div>
          }
          {myStudentFriends.map(stId => {
            const st = ALL_STUDENTS.find(x => x.id === stId);
            if (!st) return null;
            return (
              <div key={st.id} style={{
                display: "flex", alignItems: "center", gap: 13, marginBottom: 15,
                background: "#fff", borderRadius: 9, padding: "7px 11px"
              }}>
                <img src={st.photo} alt={st.name} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                <div>
                  <div style={{ fontWeight: 600, color: "#2b3347" }}>{st.name} {st.verified && <span style={{ color: "#13bb63", marginLeft: 4 }}>✔️</span>}</div>
                  <div style={{ fontSize: "0.98rem", color: "#4d79b4" }}>{st.specialization}</div>
                  <div style={{ fontSize: "0.93rem", color: "#888" }}>Language: {st.lang}</div>
                </div>
                <button
                  style={{
                    marginLeft: "auto", background: "#2868c7", color: "#fff", border: "none",
                    borderRadius: 8, padding: "8px 13px", fontWeight: 600, fontSize: "0.97rem", cursor: "pointer"
                  }}
                  onClick={() => setOpenStudentChat(st.name)}
                >Chat</button>
                <button
                  style={{
                    marginLeft: 8, background: "#e8e8e8", color: "#888", border: "none",
                    borderRadius: 8, padding: "7px 11px", fontSize: "0.97rem", cursor: "pointer"
                  }}
                  onClick={() => removeStudentFriend(st.id)}
                >Remove</button>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- СЕКЦИЯ: ДИПЛОМЫ --- */}
      <section style={{ background: "#fff", borderRadius: "14px", padding: "22px 24px", marginBottom: 28 }}>
        <h2 style={{ color: "#2868c7", fontSize: "1.14rem", marginBottom: 10 }}>Diplomas and professions received</h2>
        {DIPLOMAS.length === 0 && <div style={{ color: "#aaa" }}>No diplomas</div>}
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {DIPLOMAS.map(d => (
            <li key={d.id}>
              <b>{d.title}</b> — received {d.date}
            </li>
          ))}
        </ul>
      </section>

      {/* --- POPUPS: ЧАТЫ и ПРОСМОТР ДОКУМЕНТОВ --- */}
      <ChatPopup open={!!openTeacherChat} name={openTeacherChat} onClose={() => setOpenTeacherChat(null)} />
      <ChatPopup open={!!openStudentChat} name={openStudentChat} onClose={() => setOpenStudentChat(null)} />
      {docView && renderDocViewer(docView)}
    </main>
  );
}

// ------------------------------------
// СТИЛИ ДЛЯ КНОПОК/МОДАЛОК/ФИЛЬТРОВ
// ------------------------------------
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
const btnStyleRed = {
  background: "#ffeaea",
  color: "#e85c43",
  border: "none",
  borderRadius: "12px",
  padding: "10px 26px",
  fontWeight: 600,
  fontSize: "1.05rem",
  cursor: "pointer"
};
const filterStyle = {
  borderRadius: 8, border: "1.3px solid #b8c7e7", fontSize: "1.03rem", padding: "7px 12px"
};
const modalBg = {
  position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
  background: "rgba(0,0,0,0.14)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center"
};
const modalWin = {
  background: "#fff", borderRadius: 13, boxShadow: "0 6px 36px #2868c733",
  minWidth: 320, padding: 30, position: "relative"
};
