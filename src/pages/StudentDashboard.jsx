import { useState } from "react";

// Демо-данные студентов для поиска
const allStudents = [
  {
    id: 101,
    name: "Иван Петров",
    photo: "https://randomuser.me/api/portraits/men/54.jpg",
    specialization: "Frontend-разработка",
    lang: "Русский",
    verified: true,
    passportVerified: true
  },
  {
    id: 102,
    name: "Julia Chen",
    photo: "https://randomuser.me/api/portraits/women/55.jpg",
    specialization: "Frontend-разработка",
    lang: "Английский",
    verified: false,
    passportVerified: false
  },
  {
    id: 103,
    name: "Павел Смирнов",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    specialization: "Data Science",
    lang: "Русский",
    verified: true,
    passportVerified: false
  }
];

// Демо-данные преподавателей
const allTeachers = [
  {
    id: 1,
    name: "Дмитрий Мартынов",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    specializations: ["Математика", "Физика"],
    langs: ["Русский", "Английский"],
    verified: true,
    birthdate: "1986-02-15"
  },
  {
    id: 2,
    name: "Ольга Березина",
    photo: "https://randomuser.me/api/portraits/women/25.jpg",
    specializations: ["Frontend-разработка", "JavaScript"],
    langs: ["Русский", "Английский", "Испанский"],
    verified: false,
    birthdate: "1993-08-30"
  },
  {
    id: 3,
    name: "Michael Chen",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    specializations: ["Финансы", "Бухгалтерия"],
    langs: ["Английский", "Китайский (Mandarin)"],
    verified: true,
    birthdate: "1981-05-14"
  }
];

const SPECIALIZATIONS = [
  "Frontend-разработка",
  "Data Science",
  "Математика",
  "Физика",
  "JavaScript",
  "Финансы",
  "Бухгалтерия"
];

const LANGS = [
  "Русский",
  "Английский",
  "Испанский",
  "Китайский (Mandarin)"
];

// В начальных друзьях
const initialStudentFriends = [101];
const initialTeacherFriends = [allTeachers[0], allTeachers[2]];

export default function DemoDashboard({ onLogout }) {
  // Студенты-друзья, чаты, фильтры
  const [myStudentFriends, setMyStudentFriends] = useState(initialStudentFriends);
  const [openStudentChat, setOpenStudentChat] = useState(null);
  const [studentLangFilter, setStudentLangFilter] = useState("");
  const [studentSpecFilter, setStudentSpecFilter] = useState("");
  // Преподаватели-друзья, чаты, фильтры
  const [friendTeachers, setFriendTeachers] = useState(initialTeacherFriends);
  const [openTeacherChat, setOpenTeacherChat] = useState(null);
  const [teacherLangFilter, setTeacherLangFilter] = useState("");
  const [teacherSpecFilter, setTeacherSpecFilter] = useState("");
  // Для удаления профессий
  const [myProfessions, setMyProfessions] = useState([
    { id: "frontend", title: "Frontend-разработчик" },
    { id: "data-science", title: "Data Science" }
  ]);
  const [deleteProfessionId, setDeleteProfessionId] = useState(null);
  // Верификация паспорта студента
  const [passportVerified, setPassportVerified] = useState(true);

  // Данные профиля студента
  const profile = {
    name: "Александр Бобриков",
    email: "my@email.com",
    photo: "https://randomuser.me/api/portraits/men/48.jpg",
    verified: true,
    passportVerified: passportVerified
  };

  // Фильтрация студентов
  const filteredStudents = allStudents.filter(st =>
    (!studentLangFilter || st.lang === studentLangFilter) &&
    (!studentSpecFilter || st.specialization === studentSpecFilter) &&
    !myStudentFriends.includes(st.id)
  );

  // Фильтрация преподавателей
  const filteredTeachers = allTeachers.filter(t =>
    (!teacherLangFilter || t.langs.includes(teacherLangFilter)) &&
    (!teacherSpecFilter || t.specializations.includes(teacherSpecFilter)) &&
    !friendTeachers.some(f => f.id === t.id)
  );

  // Добавить/удалить студента в друзья
  function addStudentFriend(id) { setMyStudentFriends(f => [...f, id]); }
  function removeStudentFriend(id) { setMyStudentFriends(f => f.filter(x => x !== id)); }

  // Добавить/удалить преподавателя в друзья
  function addTeacherFriend(t) { setFriendTeachers(arr => [...arr, t]); }
  function removeTeacherFriend(id) { setFriendTeachers(arr => arr.filter(t => t.id !== id)); }

  // Удаление профессии
  function confirmRemoveProfession(id) {
    setMyProfessions(arr => arr.filter(p => p.id !== id));
    setDeleteProfessionId(null);
  }

  // --- Чат-заглушка
  function ChatPopup({ open, name, onClose }) {
    if (!open) return null;
    return (
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        background: "rgba(0,0,0,0.14)", zIndex: 99,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <div style={{
          background: "#fff", borderRadius: 13, boxShadow: "0 8px 30px #2868c722",
          minWidth: 300, padding: 24, position: "relative"
        }}>
          <b style={{ fontSize: "1.09rem" }}>Чат с {name}</b>
          <div style={{ margin: "18px 0", color: "#888" }}>Фейковый чат. Реализация позже.</div>
          <button onClick={onClose} style={{
            position: "absolute", right: 12, top: 12, background: "none", border: "none",
            color: "#999", fontSize: "1.3rem", cursor: "pointer"
          }}>×</button>
        </div>
      </div>
    );
  }

  // --- JSX ---
  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "38px 16px" }}>
      {/* Профиль */}
      <section style={{
        display: "flex", alignItems: "center", gap: 30, background: "#f6faff",
        borderRadius: "14px", padding: "22px 28px", marginBottom: 34
      }}>
        <img src={profile.photo} alt={profile.name} style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid #e0ffee" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: "1.23rem", color: "#1a2138" }}>{profile.name}
            {profile.verified && <span style={{ color: "#13bb63", marginLeft: 7 }}>✔️</span>}
          </div>
          <div style={{ color: "#4a7fbc", fontSize: "1.03rem" }}>{profile.email}</div>
          <div style={{ marginTop: 6 }}>
            Верификация паспорта:&nbsp;
            <b style={{ color: profile.passportVerified ? "#2fd9c0" : "#e85c43" }}>
              {profile.passportVerified ? "Пройдена" : "Не пройдена"}
            </b>
          </div>
        </div>
        <button onClick={onLogout} style={btnStyleGray}>Выйти в витрину</button>
      </section>

      {/* Блок профессий (с удалением и подтверждением) */}
      <section style={{ marginBottom: 38 }}>
        <h2 style={{ color: "#2868c7", fontSize: "1.17rem", marginBottom: 13 }}>Мои профессии</h2>
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          {myProfessions.map(prof => (
            <div key={prof.id} style={{
              background: "#fff", borderRadius: "14px", boxShadow: "0 2px 12px #2868c710",
              padding: "18px 22px", minWidth: 260, position: "relative"
            }}>
              <div style={{ fontWeight: 600, fontSize: "1.12rem" }}>{prof.title}</div>
              <button
                style={{
                  position: "absolute", top: 11, right: 14,
                  background: "#ffeaea", color: "#e85c43", border: "none",
                  borderRadius: 6, fontSize: "0.96rem", padding: "4px 9px", cursor: "pointer"
                }}
                onClick={() => setDeleteProfessionId(prof.id)}
                title="Удалить профессию"
              >Удалить</button>
              {/* Здесь можно выводить список преподавателей по профессии */}
            </div>
          ))}
          <button style={{
            background: "linear-gradient(90deg,#2868c7,#2fd9c0)",
            color: "#fff", border: "none", borderRadius: "12px", padding: "12px 18px",
            fontWeight: 600, fontSize: "1rem", cursor: "pointer", minWidth: 120
          }}
            onClick={() => alert("Добавить профессию — скоро!")}
          >+ Добавить</button>
        </div>
        {/* Подтверждение удаления профессии */}
        {deleteProfessionId && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.13)", zIndex: 100, display: "flex",
            alignItems: "center", justifyContent: "center"
          }}>
            <div style={{
              background: "#fff", borderRadius: 12, padding: "24px 30px", minWidth: 260,
              fontSize: "1.05rem", boxShadow: "0 8px 30px #2868c722", textAlign: "center"
            }}>
              <div style={{ marginBottom: 18 }}>Удалить профессию навсегда?</div>
              <button onClick={() => confirmRemoveProfession(deleteProfessionId)} style={btnStyleRed}>Удалить</button>
              <button onClick={() => setDeleteProfessionId(null)} style={{ ...btnStyleGray, marginLeft: 14 }}>Отмена</button>
            </div>
          </div>
        )}
      </section>

      {/* --- ДРУЗЬЯ/СТУДЕНТЫ --- */}
      <section style={{
        display: "flex", gap: 32, marginBottom: 36, flexWrap: "wrap"
      }}>
        {/* Поиск студентов */}
        <div style={{
          flex: 1, background: "#f7fbff", borderRadius: "12px", padding: "20px 24px",
          minWidth: 300, maxWidth: 460, boxShadow: "0 2px 12px #2868c709"
        }}>
          <div style={{ fontWeight: 700, color: "#2868c7", fontSize: "1.08rem", marginBottom: 10 }}>
            Поиск студентов
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
            <select value={studentSpecFilter} onChange={e => setStudentSpecFilter(e.target.value)} style={filterStyle}>
              <option value="">Все специальности</option>
              {SPECIALIZATIONS.map((sp, i) => <option key={i} value={sp}>{sp}</option>)}
            </select>
            <select value={studentLangFilter} onChange={e => setStudentLangFilter(e.target.value)} style={filterStyle}>
              <option value="">Все языки</option>
              {LANGS.map((l, i) => <option key={i} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            {filteredStudents.length === 0 &&
              <div style={{ color: "#aaa", fontSize: "1.01rem" }}>Нет подходящих студентов</div>
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
                  <div style={{ fontSize: "0.93rem", color: "#888" }}>Язык: {st.lang}</div>
                </div>
                <button
                  style={{
                    marginLeft: "auto", background: "#2fd9c0", color: "#fff", border: "none",
                    borderRadius: 8, padding: "8px 13px", fontWeight: 600, fontSize: "0.97rem", cursor: "pointer"
                  }}
                  onClick={() => addStudentFriend(st.id)}
                >Добавить</button>
              </div>
            ))}
          </div>
        </div>
        {/* Мои друзья-студенты */}
        <div style={{
          flex: 1, background: "#f7fbff", borderRadius: "12px", padding: "20px 24px",
          minWidth: 300, maxWidth: 460, boxShadow: "0 2px 12px #2868c709"
        }}>
          <div style={{ fontWeight: 700, color: "#2868c7", fontSize: "1.08rem", marginBottom: 10 }}>
            Мои друзья-студенты
          </div>
          {myStudentFriends.length === 0 &&
            <div style={{ color: "#aaa", fontSize: "1.01rem" }}>Нет добавленных студентов</div>
          }
          {myStudentFriends.map(id => {
            const st = allStudents.find(s => s.id === id);
            if (!st) return null;
            return (
              <div key={id} style={{
                display: "flex", alignItems: "center", gap: 13, marginBottom: 15,
                background: "#fff", borderRadius: 9, padding: "7px 11px"
              }}>
                <img src={st.photo} alt={st.name} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                <div>
                  <div style={{ fontWeight: 600, color: "#2b3347" }}>{st.name}</div>
                  <div style={{ fontSize: "0.98rem", color: "#4d79b4" }}>{st.specialization}</div>
                  <div style={{ fontSize: "0.93rem", color: "#888" }}>Язык: {st.lang}</div>
                </div>
                <button
                  style={{
                    marginLeft: "auto", background: "#2868c7", color: "#fff", border: "none",
                    borderRadius: 8, padding: "8px 13px", fontWeight: 600, fontSize: "0.97rem", cursor: "pointer"
                  }}
                  onClick={() => setOpenStudentChat(st.name)}
                >Чат</button>
                <button
                  style={{
                    marginLeft: 8, background: "#e8e8e8", color: "#888", border: "none",
                    borderRadius: 8, padding: "7px 11px", fontSize: "0.97rem", cursor: "pointer"
                  }}
                  onClick={() => removeStudentFriend(st.id)}
                >Удалить</button>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- ДРУЗЬЯ/ПРЕПОДАВАТЕЛИ --- */}
      <section style={{
        background: "#f7fbff",
        borderRadius: "12px",
        padding: "20px 24px",
        marginBottom: 36,
        maxWidth: 510
      }}>
        <div style={{ fontWeight: 700, color: "#2868c7", fontSize: "1.08rem", marginBottom: 10 }}>
          Мои преподаватели (экзамены/зачёты)
        </div>
        {/* Фильтры поиска (если нужно показать добавление) */}
        <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
          <select value={teacherSpecFilter} onChange={e => setTeacherSpecFilter(e.target.value)} style={filterStyle}>
            <option value="">Все специализации</option>
            {SPECIALIZATIONS.map((sp, i) => <option key={i} value={sp}>{sp}</option>)}
          </select>
          <select value={teacherLangFilter} onChange={e => setTeacherLangFilter(e.target.value)} style={filterStyle}>
            <option value="">Все языки</option>
            {LANGS.map((l, i) => <option key={i} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          {/* Добавление преподавателя */}
          {filteredTeachers.map(t => (
            <div key={t.id} style={{
              display: "flex", alignItems: "center", gap: 13, marginBottom: 12,
              background: "#fff", borderRadius: 9, padding: "7px 11px"
            }}>
              <img src={t.photo} alt={t.name} style={{ width: 40, height: 40, borderRadius: "50%" }} />
              <div>
                <div style={{ fontWeight: 600, color: "#2b3347" }}>{t.name} {t.verified && <span style={{ color: "#13bb63", marginLeft: 4 }}>✔️</span>}</div>
                <div style={{ fontSize: "0.98rem", color: "#4d79b4" }}>{t.specializations.join(", ")}</div>
                <div style={{ fontSize: "0.93rem", color: "#888" }}>Языки: {t.langs.join(", ")}</div>
              </div>
              <button
                style={{
                  marginLeft: "auto", background: "#2fd9c0", color: "#fff", border: "none",
                  borderRadius: 8, padding: "8px 13px", fontWeight: 600, fontSize: "0.97rem", cursor: "pointer"
                }}
                onClick={() => addTeacherFriend(t)}
              >Добавить</button>
            </div>
          ))}
        </div>
        {/* Мои преподаватели */}
        {friendTeachers.map(t => (
          <div key={t.id} style={{
            display: "flex", alignItems: "center", gap: 13, marginBottom: 12,
            background: "#fff", borderRadius: 9, padding: "7px 11px"
          }}>
            <img src={t.photo} alt={t.name} style={{ width: 40, height: 40, borderRadius: "50%" }} />
            <div>
              <div style={{ fontWeight: 600, color: "#2b3347" }}>{t.name} {t.verified && <span style={{ color: "#13bb63", marginLeft: 4 }}>✔️</span>}</div>
              <div style={{ fontSize: "0.98rem", color: "#4d79b4" }}>{t.specializations.join(", ")}</div>
              <div style={{ fontSize: "0.93rem", color: "#888" }}>Языки: {t.langs.join(", ")}</div>
            </div>
            <button
              style={{
                marginLeft: "auto", background: "#2868c7", color: "#fff", border: "none",
                borderRadius: 8, padding: "8px 13px", fontWeight: 600, fontSize: "0.97rem", cursor: "pointer"
              }}
              onClick={() => setOpenTeacherChat(t.name)}
            >Чат</button>
            <button
              style={{
                marginLeft: 8, background: "#e8e8e8", color: "#888", border: "none",
                borderRadius: 8, padding: "7px 11px", fontSize: "0.97rem", cursor: "pointer"
              }}
              onClick={() => removeTeacherFriend(t.id)}
            >Удалить</button>
          </div>
        ))}
      </section>

      {/* Чаты */}
      <ChatPopup open={!!openStudentChat} name={openStudentChat} onClose={() => setOpenStudentChat(null)} />
      <ChatPopup open={!!openTeacherChat} name={openTeacherChat} onClose={() => setOpenTeacherChat(null)} />
    </main>
  );
}

// --- styles ---
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
  borderRadius: 8,
  border: "1.3px solid #b8c7e7",
  fontSize: "1.03rem",
  padding: "7px 12px"
};
