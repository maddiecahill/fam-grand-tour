export default function Home() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif", background: "#0f1720", color: "white" }}>
      
      {/* HERO */}
      <section style={{ padding: "80px 40px" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          FIRST AND MAIN GRAND TOUR
        </h1>
        <p style={{ fontSize: "20px", maxWidth: "600px", opacity: 0.8 }}>
          A curated weekend of exceptional homes, open houses, and elevated experiences across Snohomish, Woodinville, and beyond.
        </p>
      </section>

      {/* INTRO */}
      <section style={{ padding: "60px 40px", background: "#111927" }}>
        <h2 style={{ fontSize: "28px" }}>A more intentional way to tour the market.</h2>
        <p style={{ maxWidth: "600px", opacity: 0.7 }}>
          Explore featured properties, plan your stops, and experience a weekend designed to showcase not only exceptional homes, but the communities around them.
        </p>
      </section>

      {/* MAP PLACEHOLDER */}
      <section style={{ padding: "60px 40px" }}>
        <h2>Explore the Tour</h2>
        <div style={{
          height: "400px",
          background: "#1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "12px"
        }}>
          <p>Mapbox map will go here</p>
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ padding: "60px 40px", background: "#111927" }}>
        <h2>Grand Tour Highlights</h2>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={{ background: "#1e293b", padding: "20px", borderRadius: "12px" }}>
            Featured Home 1
          </div>
          <div style={{ background: "#1e293b", padding: "20px", borderRadius: "12px" }}>
            Featured Home 2
          </div>
        </div>
      </section>

      {/* OFFICE */}
      <section style={{ padding: "60px 40px" }}>
        <h2>Make First And Main Your Home Base</h2>
        <p style={{ maxWidth: "600px", opacity: 0.7 }}>
          Stop by the office during Grand Tour weekend for event details, recommendations, and a curated starting point before you head out.
        </p>
      </section>

    </main>
  );
}