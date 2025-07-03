export default function NotFound() {
  return (
    <main style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#2868c7"
    }}>
      <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: 16 }}>
        Page not found <span style={{ color: "#aaa" }}>(404)</span>
      </h1>
      <div style={{ color: "#777" }}>
        The page you are looking for does not exist or has been moved.
      </div>
    </main>
  );
}
