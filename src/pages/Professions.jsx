import ProfessionCard from "../components/ProfessionCard";
import { professions } from "../data/professions";

export default function Professions() {
  // Group professions by category
  const digital = professions.filter(p => p.area === "Digital");
  const university = professions.filter(p => p.area !== "Digital");

  return (
    <>
      <main style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "36px 20px"
      }}>
        <h1 style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "36px"
        }}>
          All EduGlobe Professions
        </h1>

        {/* Digital/IT fields */}
        <section style={{ marginBottom: 42 }}>
          <h2 style={{ color: "#2868c7", marginBottom: 18 }}>Digital / IT</h2>
          {digital.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: "28px"
            }}>
              {digital.map(prof => (
                <ProfessionCard key={prof.id} {...prof} />
              ))}
            </div>
          ) : (
            <div style={{ color: "#888", padding: "14px" }}>
              No Digital/IT professions available yet.
            </div>
          )}
        </section>

        {/* University fields */}
        <section>
          <h2 style={{ color: "#19b786", marginBottom: 18 }}>University Programs</h2>
          {university.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: "28px"
            }}>
              {university.map(prof => (
                <ProfessionCard key={prof.id} {...prof} />
              ))}
            </div>
          ) : (
            <div style={{ color: "#888", padding: "14px" }}>
              No university programs available yet.
            </div>
          )}
        </section>
      </main>
    </>
  );
}
