import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

function Home() {
    const [donorCount, setDonorCount] = useState(0);

    useEffect(() => {
        fetch(`${API_BASE_URL}/donors`)
            .then(r => r.json())
            .then(data => setDonorCount(data.length))
            .catch(() => { });
    }, []);

    return (
        <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#fff" }}>

            {/* Hero */}
            <div style={{
                background: "linear-gradient(135deg, #c0392b 0%, #e74c3c 60%, #f39c12 100%)",
                color: "white",
                padding: "100px 40px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
            }}>
                <div style={{
                    position: "absolute", top: "-60px", right: "-60px",
                    width: "300px", height: "300px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "50%",
                }} />
                <div style={{
                    position: "absolute", bottom: "-80px", left: "-40px",
                    width: "250px", height: "250px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "50%",
                }} />

                <p style={{ fontSize: "16px", letterSpacing: "4px", textTransform: "uppercase", opacity: 0.85, marginBottom: "16px", fontFamily: "Arial" }}>
                    National Blood Donation Network
                </p>
                <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "900", margin: "0 0 20px", lineHeight: 1.1 }}>
                    Every Drop <br />Saves a Life 🩸
                </h1>
                <p style={{ fontSize: "18px", opacity: 0.9, maxWidth: "560px", margin: "0 auto 40px", lineHeight: 1.7, fontFamily: "Arial" }}>
                    BloodLink connects blood and plasma donors with patients in emergency need — instantly, based on blood group and location.
                </p>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link to="/add-donor" style={{
                        background: "white", color: "#c0392b",
                        padding: "16px 36px", borderRadius: "50px",
                        textDecoration: "none", fontWeight: "800",
                        fontSize: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    }}>💉 Become a Donor</Link>
                    <Link to="/find-donor" style={{
                        background: "transparent", color: "white",
                        padding: "16px 36px", borderRadius: "50px",
                        textDecoration: "none", fontWeight: "700",
                        fontSize: "16px", border: "2px solid rgba(255,255,255,0.7)",
                    }}>🔍 Find a Donor</Link>
                </div>
            </div>

            {/* Stats */}
            <div style={{
                display: "flex", justifyContent: "center", gap: "0",
                background: "#1a1a1a", flexWrap: "wrap",
            }}>
                {[
                    { num: donorCount + "+", label: "Registered Donors" },
                    { num: "6", label: "Cities Covered" },
                    { num: "8", label: "Blood Groups" },
                    { num: "~30%", label: "Faster Emergency Response" },
                ].map((s, i) => (
                    <div key={i} style={{
                        padding: "30px 50px", textAlign: "center",
                        borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
                    }}>
                        <div style={{ color: "#e74c3c", fontSize: "32px", fontWeight: "900" }}>{s.num}</div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", fontFamily: "Arial", marginTop: "4px" }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* How it works */}
            <div style={{ padding: "80px 40px", maxWidth: "1000px", margin: "0 auto" }}>
                <h2 style={{ textAlign: "center", fontSize: "36px", color: "#1a1a1a", marginBottom: "60px" }}>
                    How BloodLink Works
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px" }}>
                    {[
                        { icon: "📝", step: "1", title: "Register", desc: "Register as a blood/plasma donor with your name, blood group, and city." },
                        { icon: "🔍", step: "2", title: "Search", desc: "Patients or hospitals search for donors by blood group and city in seconds." },
                        { icon: "📞", step: "3", title: "Connect", desc: "Get donor contact details instantly — compatible blood groups shown as fallback too." },
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: "#fff",
                            border: "1px solid #f0f0f0",
                            borderRadius: "16px",
                            padding: "36px 28px",
                            textAlign: "center",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                            position: "relative",
                        }}>
                            <div style={{
                                width: "56px", height: "56px", borderRadius: "50%",
                                background: "linear-gradient(135deg, #c0392b, #e74c3c)",
                                color: "white", fontSize: "20px", fontWeight: "900",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                margin: "0 auto 20px", fontFamily: "Arial",
                            }}>{item.step}</div>
                            <div style={{ fontSize: "36px", marginBottom: "12px" }}>{item.icon}</div>
                            <h3 style={{ fontSize: "20px", color: "#1a1a1a", margin: "0 0 12px" }}>{item.title}</h3>
                            <p style={{ color: "#666", lineHeight: 1.7, fontFamily: "Arial", fontSize: "15px", margin: 0 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div style={{
                background: "#fdf2f2", padding: "60px 40px", textAlign: "center",
                borderTop: "1px solid #f5c6c6",
            }}>
                <h2 style={{ fontSize: "32px", color: "#c0392b", marginBottom: "12px" }}>Ready to Save a Life?</h2>
                <p style={{ color: "#666", fontFamily: "Arial", marginBottom: "28px", fontSize: "16px" }}>
                    Join thousands of donors across India making a real difference.
                </p>
                <Link to="/add-donor" style={{
                    background: "linear-gradient(135deg, #c0392b, #e74c3c)",
                    color: "white", padding: "16px 40px",
                    borderRadius: "50px", textDecoration: "none",
                    fontWeight: "800", fontSize: "16px",
                    boxShadow: "0 4px 20px rgba(192,57,43,0.3)",
                }}>Get Started — It's Free</Link>
            </div>

            <footer style={{ background: "#1a1a1a", color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "20px", fontFamily: "Arial", fontSize: "14px" }}>
                © 2026 BloodLink · Built by Renuka Varankar
            </footer>
        </div>
    );
}

export default Home;
