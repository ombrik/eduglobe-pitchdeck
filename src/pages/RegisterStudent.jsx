import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

const TEACH_LANGS = [
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

const EXAM_LANGS = [
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

// Top countries + additional for example
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

export default function RegisterStudent() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    agree: false,
    teachLang: "",
    examLang: ""
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(
      "Registration submitted!\n" +
      "First name: " + form.name +
      "\nLast name: " + form.surname +
      "\nEmail: " + form.email +
      "\nPhone: " + form.phone +
      "\nCountry: " + (COUNTRIES.find(c=>c.value===form.country)?.label||form.country) +
      "\nStudy language: " + (TEACH_LANGS.find(l=>l.value===form.teachLang)?.label||"") +
      "\nExam/Diploma language: " + (EXAM_LANGS.find(l=>l.value===form.examLang)?.label||"")
    );
    // Here will be the logic for submitting data to the server
  }

  return (
    <>
      <main style={{ maxWidth: 440, margin: "0 auto", padding: "44px 12px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 24, color: "#1a2138" }}>Student Registration</h1>
        <form onSubmit={handleSubmit} style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "28px 22px",
          boxShadow: "0 2px 14px rgba(40,104,199,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: 20
        }}>
          <input required name="name" placeholder="First name" value={form.name} onChange={handleChange} style={inputStyle} />
          <input required name="surname" placeholder="Last name" value={form.surname} onChange={handleChange} style={inputStyle} />
          <input required type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={inputStyle} />
          <input required name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} style={inputStyle} />

          <select required name="country" value={form.country} onChange={handleChange} style={inputStyle}>
            <option value="">Country of residence</option>
            {COUNTRIES.map(c =>
              <option value={c.value} key={c.value}>{c.label}</option>
            )}
          </select>

          <input required type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} style={inputStyle} />

          <select
            required
            name="teachLang"
            value={form.teachLang}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Choose a study language</option>
            {TEACH_LANGS.map(lang =>
              <option value={lang.value} key={lang.value}>{lang.label}</option>
            )}
          </select>

          <select
            required
            name="examLang"
            value={form.examLang}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Exam/Diploma language</option>
            {EXAM_LANGS.map(lang =>
              <option value={lang.value} key={lang.value}>{lang.label}</option>
            )}
          </select>

          <label style={{ fontSize: "0.97rem", color: "#666", textAlign: "left" }}>
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} style={{ marginRight: 8 }} />
            I agree with the <a href="#" style={{ color: "#2868c7", textDecoration: "underline" }}>platform rules</a>
          </label>
          <button type="submit" style={btnStylePrimary} disabled={!form.agree}>Register</button>
        </form>
      </main>
    </>
  );
}

const inputStyle = {
  fontSize: "1.06rem",
  padding: "10px 13px",
  borderRadius: "8px",
  border: "1.5px solid #d8e8ff"
};

const btnStylePrimary = {
  background: "linear-gradient(90deg,#2868c7,#2fd9c0)",
  color: "#fff",
  fontWeight: 700,
  fontSize: "1.1rem",
  padding: "12px 0",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: 8,
  transition: "opacity 0.2s"
};
