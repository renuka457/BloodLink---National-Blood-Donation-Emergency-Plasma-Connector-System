import { useState } from "react";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const CITIES = ["Pune", "Mumbai", "Bangalore", "Delhi", "Chennai", "Hyderabad"];

function FindDonor() {
    const [bloodGroup, setBloodGroup] = useState("");
    const [city, setCity] = useState("");
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const search = async () => {
        if (!bloodGroup || !city) { setError("Please select both blood group and city."); return; }
        setLoading(true); setError(""); setResults(null);
        try {
            const res = await fetch(`http://localhost:5000/search-donor?blood_group=${bloodGroup}&city=${city}`);
            const data = await res.json();
            setResults(data);
        } catch {
            setError("Cannot connect to server. Make sure backend is running.");
        }
        setLoading(false);
    };

    const exactMatches = results?.filter(d => d.match_type === "exact") || [];
    const compatibleMatches = results?.filter(d => d.match_type === "compatible") || [];

    return (
        <div style={{ minHeight: "calc(100vh - 64px)", background: "#fafafa", padding: "40px 20px" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>

                <div style={{ textAlign: "center", marginBottom: "36px" }}>
                    <span style={{ fontSize: "52px" }}>🔍</span>
                    <h1 style={{ fontSize: "32px", color: "#c0392b", margin: "8px 0 8px", fontFamily: "'Georgia', serif" }}>
                        Find a Donor
                    </h1>
                    <p style={{ color: "#666", fontFamily: "Arial", fontSize: "15px" }}>
                        Search for compatible blood donors in your city instantly.
                    </p>
                </div>

                {/* Search Card */}
                <div style={{
                    background: "white", borderRadius: "24px",
                    padding: "36px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                    marginBottom: "32px",
                }}>
                    <div style={{ marginBottom: "24px" }}>
                        <label style={labelStyle}>Required Blood Group</label>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                            {BLOOD_GROUPS.map(bg => (
                                <button key={bg} onClick={() => setBloodGroup(bg)} style={{
                                    padding: "12px 0", borderRadius: "10px", cursor: "pointer",
                                    fontWeight: "700", fontSize: "15px", fontFamily: "Arial",
                                    border: bloodGroup === bg ? "2px solid #c0392b" : "2px solid #e0e0e0",
                                    background: bloodGroup === bg ? "#fdf2f2" : "white",
                                    color: bloodGroup === bg ? "#c0392b" : "#555",
                                    transition: "all 0.15s",
                                }}>{bg}</button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <label style={labelStyle}>City</label>
                        <select value={city} onChange={e => setCity(e.target.value)} style={{
                            width: "100%", padding: "13px 16px", borderRadius: "10px",
                            border: "1.5px solid #e0e0e0", fontSize: "15px",
                            fontFamily: "Arial", outline: "none", background: "white", cursor: "pointer",
                        }}
                            onFocus={e => e.target.style.borderColor = "#e74c3c"}
                            onBlur={e => e.target.style.borderColor = "#e0e0e0"}>
                            <option value="">Select city</option>
                            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    {error && (
                        <div style={{ background: "#ffeaea", color: "#c0392b", padding: "12px 16px", borderRadius: "10px", marginBottom: "16px", fontFamily: "Arial", fontSize: "14px" }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <button onClick={search} disabled={loading} style={{
                        width: "100%", padding: "15px",
                        background: "linear-gradient(135deg, #c0392b, #e74c3c)",
                        color: "white", border: "none", borderRadius: "12px",
                        fontSize: "16px", fontWeight: "700", cursor: "pointer",
                        fontFamily: "Arial", boxShadow: "0 4px 16px rgba(192,57,43,0.3)",
                        opacity: loading ? 0.7 : 1,
                    }}>
                        {loading ? "Searching..." : "Search Donors 🔍"}
                    </button>
                </div>

                {/* Results */}
                {results !== null && (
                    <div>
                        {results.length === 0 ? (
                            <div style={{
                                background: "white", borderRadius: "16px", padding: "40px",
                                textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                            }}>
                                <span style={{ fontSize: "48px" }}>😔</span>
                                <p style={{ color: "#888", fontFamily: "Arial", marginTop: "16px", fontSize: "16px" }}>
                                    No donors found for <strong>{bloodGroup}</strong> in <strong>{city}</strong>.<br />
                                    Please try a different city or contact your nearest blood bank.
                                </p>
                            </div>
                        ) : (
                            <>
                                <p style={{ fontFamily: "Arial", color: "#555", marginBottom: "20px", fontSize: "15px" }}>
                                    Found <strong style={{ color: "#c0392b" }}>{results.length} donor(s)</strong> for {bloodGroup} in {city}
                                </p>

                                {exactMatches.length > 0 && (
                                    <>
                                        <SectionLabel text="✅ Exact Matches" color="#1e8449" bg="#eafaf1" />
                                        {exactMatches.map(d => <DonorCard key={d.id} donor={d} type="exact" />)}
                                    </>
                                )}

                                {compatibleMatches.length > 0 && (
                                    <>
                                        <SectionLabel text="🔄 Compatible Donors (can donate to you)" color="#7d6608" bg="#fef9e7" />
                                        {compatibleMatches.map(d => <DonorCard key={d.id} donor={d} type="compatible" />)}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function SectionLabel({ text, color, bg }) {
    return (
        <div style={{
            background: bg, color: color, padding: "10px 16px",
            borderRadius: "10px", fontFamily: "Arial", fontWeight: "700",
            fontSize: "14px", marginBottom: "12px",
        }}>{text}</div>
    );
}

function DonorCard({ donor, type }) {
    return (
        <div style={{
            background: "white", borderRadius: "16px", padding: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: "12px",
            borderLeft: `4px solid ${type === "exact" ? "#27ae60" : "#f39c12"}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "12px",
        }}>
            <div>
                <div style={{ fontFamily: "'Georgia', serif", fontSize: "18px", fontWeight: "700", color: "#1a1a1a", marginBottom: "6px" }}>
                    {donor.name}
                </div>
                <div style={{ fontFamily: "Arial", fontSize: "14px", color: "#666" }}>
                    📍 {donor.city} &nbsp;·&nbsp; 🩸 {donor.blood_group}
                    {donor.match_type === "compatible" && (
                        <span style={{ marginLeft: "8px", color: "#f39c12", fontWeight: "600" }}>
                            (compatible)
                        </span>
                    )}
                </div>
            </div>
            <a href={`tel:${donor.phone}`} style={{
                background: "linear-gradient(135deg, #c0392b, #e74c3c)",
                color: "white", padding: "10px 20px", borderRadius: "20px",
                textDecoration: "none", fontFamily: "Arial", fontWeight: "700",
                fontSize: "14px", whiteSpace: "nowrap",
            }}>
                📞 {donor.phone}
            </a>
        </div>
    );
}

const labelStyle = {
    display: "block", fontFamily: "Arial", fontSize: "13px",
    fontWeight: "700", color: "#444", marginBottom: "8px",
    textTransform: "uppercase", letterSpacing: "0.5px",
};

export default FindDonor;
