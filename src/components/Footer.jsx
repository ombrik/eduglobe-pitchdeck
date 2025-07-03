export default function Footer() {
  return (
    <footer style={{
      background: "#f7f9fb",
      color: "#1a2138",
      textAlign: "center",
      padding: "18px 0",
      fontSize: "1rem",
      borderTop: "1px solid #e4e9ef",
      marginTop: "48px"
    }}>
      <div>
        &copy; {new Date().getFullYear()} EduGlobe. Online University for All.
      </div>
    </footer>
  );
}
