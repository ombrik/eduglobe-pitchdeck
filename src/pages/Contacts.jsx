import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contacts() {
  return (
    <>
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "48px 16px", minHeight: "70vh" }}>
        <h1 style={{
          fontSize: "2.1rem",
          color: "#2868c7",
          fontWeight: 800,
          marginBottom: 22,
          textAlign: "center"
        }}>
          EduGlobe Contacts
        </h1>
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "32px 32px",
          boxShadow: "0 2px 14px rgba(40,104,199,0.08)",
          fontSize: "1.13rem",
          color: "#1a2138"
        }}>
          <p><b>Email:</b> <a href="mailto:info@eduglobe.com" style={{ color: "#2868c7" }}>info@eduglobe.com</a></p>
          <p><b>Phone:</b> +123 456 7890</p>
          <p><b>Telegram:</b> <a href="https://t.me/eduglobe" style={{ color: "#2868c7" }}>@eduglobe</a></p>
          <p><b>Address:</b> (virtual university, we work online)</p>
          <hr style={{ margin: "22px 0" }} />
          <p>
            For any questions about admission, cooperation, partnership, or employment — feel free to write or call us!
          </p>
        </div>
      </main>
      
    </>
  );
}
