import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

const LANGS = [
  { value: "en", label: "English" },
  { value: "zh", label: "Chinese (Mandarin)" },
  { value: "ms", label: "Malay" },
  { value: "ta", label: "Tamil" },
  { value: "de", label: "German" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "ru", label: "Russian" },
  { value: "kk", label: "Kazakh" },
  { value: "uz", label: "Uzbek" }
];

const COUNTRIES = [
  { value: "SG", label: "Singapore" },
  { value: "CN", label: "China" },
  { value: "US", label: "USA" },
  { value: "RU", label: "Russia" },
  { value: "KZ", label: "Kazakhstan" },
  { value: "CA", label: "Canada" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IN", label: "India" },
  { value: "UZ", label: "Uzbekistan" },
  { value: "UA", label: "Ukraine" },
  { value: "UK", label: "United Kingdom" },
  { value: "BR", label: "Brazil" },
  { value: "ES", label: "Spain" },
  { value: "TR", label: "Turkey" },
  { value: "IT", label: "Italy" },
  { value: "AE", label: "UAE" },
  { value: "IL", label: "Israel" },
  { value: "PL", label: "Poland" },
  { value: "AU", label: "Australia" }
];

export default function RegisterTeacher() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    specialization: "",
    experience: "",
    country: "",
    langs: [],
    files: []
  });

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm(f => ({ ...f, files: [...f.files, ...Array.from(files)] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  function handleLangToggle(langValue) {
    setForm(f => ({
      ...f,
      langs: f.langs.includes(langValue)
        ? f.langs.filter(l => l !== langValue)
        : [...f.langs, langValue]
    }));
  }

  function handleRemoveFile(idx) {
    setForm(f => ({
      ...f,
      files: f.files.filter((_, i) => i !== idx)
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(
      "Application submitted!\n" +
      "First name: " + form.name +
      "\nLast name: " + form.surname +
      "\nEmail: " + form.email +
      "\nCountry of residence: " + (COUNTRIES.find(c=>c.value===form.country)?.label||"") +
      "\nSpecialization: " + form.specialization +
      "\nTeaching experience: " + form.experience +
      "\nTeaching/exam languages: " + LANGS.filter(l=>form.langs.includes(l.value)).map(l=>l.label).join(", ") +
      "\nFiles uploaded: " + form.files.length
    );
    // Here can be logic for uploading files to the server
  }

  return (
    <>
      <main style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: "36px 0"
      }}>
        {/* Header and description block */}
        <div style={{
          width: "100%",
          marginBottom: 32,
          textAlign: "left"
        }}>
          <h1 style={{ fontSize: "2.15rem", marginBottom: 13, color: "#1a2138", textAlign: "left" }}>
            Become a Teacher at EduGlobe
          </h1>
          <div style={{ fontSize: "1.13rem", color: "#222", marginBottom: 18, maxWidth: 770, textAlign: "left" }}>
            EduGlobe is recruiting online teachers.<br />
            You can teach from home, enjoy a flexible schedule, and get competitive pay.<br />
            After your application is approved, we'll invite you for an interview.
          </div>
          <div style={{
            fontSize: "1.01rem",
            color: "#4a5a7a",
            background: "#f8fbff",
            borderRadius: 10,
            padding: "13px 16px",
            maxWidth: 620,
            textAlign: "left"
          }}>
            <b>Recommendations:</b><br />
            Attach documents confirming your education or teaching experience.<br />
            Please fill in all fields honestly — your application will be reviewed faster!
          </div>
        </div>
        
        {/* Two-column form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            display: "flex",
            gap: 32,
            alignItems: "flex-start",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            {/* Left column */}
            <div style={{
              flex: 1,
              minWidth: 280,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 18px rgba(40,104,199,0.07)",
              padding: "26px 24px",
              maxWidth: 380
            }}>
              <input
                type="text"
                name="name"
                placeholder="First name"
                style={inputStyle}
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="surname"
                placeholder="Last name"
                style={inputStyle}
                value={form.surname}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                style={inputStyle}
                value={form.email}
                onChange={handleChange}
                required
              />
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="">Select country of residence</option>
                {COUNTRIES.map(c =>
                  <option value={c.value} key={c.value}>{c.label}</option>
                )}
              </select>
              <input
                type="text"
                name="specialization"
                placeholder="Specialization (e.g.: Math, Frontend, English)"
                style={inputStyle}
                value={form.specialization}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="experience"
                placeholder="Teaching experience (years or text)"
                style={inputStyle}
                value={form.experience}
                onChange={handleChange}
                required
              />
            </div>

            {/* Right column */}
            <div style={{
              flex: 1,
              minWidth: 280,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 18px rgba(40,104,199,0.09)",
              padding: "26px 24px",
              maxWidth: 380
            }}>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 600, marginBottom: 7, fontSize: "1.08rem" }}>
                  Documents (diplomas, certificates):
                </div>
                <input
                  type="file"
                  name="documents"
                  style={{ ...inputStyle, padding: "6px 8px" }}
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleChange}
                />
                {form.files.length > 0 &&
                  <ul style={{ marginTop: 10, paddingLeft: 16, fontSize: "0.97rem" }}>
                    {form.files.map((file, idx) =>
                      <li key={idx} style={{ marginBottom: 4 }}>
                        {file.name}
                        <button
                          type="button"
                          style={{
                            marginLeft: 8,
                            color: "#f44336",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1rem"
                          }}
                          onClick={() => handleRemoveFile(idx)}
                        >✕</button>
                      </li>
                    )}
                  </ul>
                }
              </div>
              <div style={{
                textAlign: "left",
                maxWidth: 360,
                marginBottom: 18
              }}>
                <div style={{ fontWeight: 600, marginBottom: 7 }}>Teaching and exam languages:</div>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px 14px",
                  marginTop: 2
                }}>
                  {LANGS.map(lang => (
                    <label key={lang.value} style={{
                      display: "flex",
                      alignItems: "center",
                      minWidth: 130
                    }}>
                      <input
                        type="checkbox"
                        checked={form.langs.includes(lang.value)}
                        onChange={() => handleLangToggle(lang.value)}
                        style={{ marginRight: 6 }}
                      /> {lang.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", margin: "32px 0 0 0" }}>
            <button style={btnStyle}>
              Submit application
            </button>
            <p style={{ color: "#2868c7", marginTop: 20, fontSize: "1.04rem" }}>
              We will email you when the platform opens for teachers!
            </p>
          </div>
        </form>
      </main>
    </>
  );
}

const inputStyle = {
  padding: "12px 18px",
  fontSize: "1.08rem",
  borderRadius: "10px",
  border: "1.5px solid #b4c9e9",
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  marginBottom: 15,
  background: "#fcfdff"
};

const btnStyle = {
  background: "linear-gradient(90deg,#2fd9c0,#2868c7)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  padding: "12px 0",
  fontWeight: 600,
  fontSize: "1.09rem",
  width: "270px",
  marginTop: 8,
  cursor: "pointer",
  boxShadow: "0 2px 10px rgba(40,104,199,0.07)",
  transition: "background 0.15s"
};
