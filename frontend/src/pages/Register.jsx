import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register({ setUser }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [registeredUser, setRegisteredUser] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!name || !email || !password) { setError("Please fill all fields."); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
        setLoading(true); setError("");
        try {
            const res = await fetch("https://bloodlink-backend-lvx1.onrender.com/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                setRegisteredUser(data.user);
            } else {
                setError(data.error || "Registration failed.");
            }
        } catch {
            setError("Cannot connect to server. Make sure backend is running.");
        }
        setLoading(false);
    };

    if (registeredUser) {
        return (
            <div style={{
                minHeight: "calc(100vh - 64px)",
                background: "linear-gradient(135deg, #fff5f5 0%, #ffe0e0 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "40px 20px",
            }}>
                <div style={{
                    background: "white", borderRadius: "24px",
                    padding: "48px 40px", width: "100%", maxWidth: "420px",
                    boxShadow: "0 20px 60px rgba(192,57,43,0.15)",
                }}>
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <span style={{ fontSize: "64px", display: "block", marginBottom: "16px" }}>✅</span>
                        <h1 style={{ fontSize: "28px", color: "#c0392b", margin: "0 0 12px 0", fontFamily: "'Georgia', serif" }}>
                            Registration Successful!
                        </h1>
                        <p style={{ color: "#444", fontFamily: "Arial", fontSize: "18px", marginBottom: "32px", fontWeight: "600" }}>
                            Welcome, {registeredUser.name}
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <button onClick={() => navigate("/")} style={{
                            flex: 1, padding: "14px",
                            background: "white", color: "#c0392b",
                            border: "2px solid #c0392b", borderRadius: "12px",
                            fontSize: "16px", fontWeight: "700", cursor: "pointer",
                            fontFamily: "Arial", transition: "background 0.2s"
                        }}
                            onMouseEnter={e => e.target.style.background = "#fff5f5"}
                            onMouseLeave={e => e.target.style.background = "white"}
                        >
                            Exit
                        </button>
                        <button onClick={() => navigate("/add-donor")} style={{
                            flex: 1, padding: "14px",
                            background: "linear-gradient(135deg, #c0392b, #e74c3c)",
                            color: "white", border: "none", borderRadius: "12px",
                            fontSize: "16px", fontWeight: "700", cursor: "pointer",
                            fontFamily: "Arial",
                        }}>
                            Register as Donor
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: "calc(100vh - 64px)",
            background: "linear-gradient(135deg, #fff5f5 0%, #ffe0e0 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "40px 20px",
        }}>
            <div style={{
                background: "white", borderRadius: "24px",
                padding: "48px 40px", width: "100%", maxWidth: "420px",
                boxShadow: "0 20px 60px rgba(192,57,43,0.15)",
            }}>
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <span style={{ fontSize: "48px" }}>💉</span>
                    <h1 style={{ fontSize: "28px", color: "#c0392b", margin: "8px 0 4px", fontFamily: "'Georgia', serif" }}>Join BloodLink</h1>
                    <p style={{ color: "#888", fontFamily: "Arial", fontSize: "15px" }}>Create your account to become a donor</p>
                </div>

                {error && (
                    <div style={{ background: "#ffeaea", color: "#c0392b", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", fontFamily: "Arial", fontSize: "14px" }}>
                        ⚠️ {error}
                    </div>
                )}

                <Input label="Full Name" type="text" value={name} onChange={setName} placeholder="Enter your full name" />
                <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
                <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="Min. 6 characters" />

                <button onClick={handleRegister} disabled={loading} style={{
                    width: "100%", padding: "14px",
                    background: "linear-gradient(135deg, #c0392b, #e74c3c)",
                    color: "white", border: "none", borderRadius: "12px",
                    fontSize: "16px", fontWeight: "700", cursor: "pointer",
                    marginTop: "8px", fontFamily: "Arial",
                    opacity: loading ? 0.7 : 1,
                }}>
                    {loading ? "Creating account..." : "Create Account"}
                </button>

                <p style={{ textAlign: "center", marginTop: "24px", fontFamily: "Arial", fontSize: "15px", color: "#666" }}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#c0392b", fontWeight: "700", textDecoration: "none" }}>Login here</Link>
                </p>
            </div>
        </div>
    );
}

function Input({ label, type, value, onChange, placeholder }) {
    return (
        <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontFamily: "Arial", fontSize: "13px", fontWeight: "700", color: "#444", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {label}
            </label>
            <input
                type={type} value={value} placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                style={{
                    width: "100%", padding: "12px 16px", borderRadius: "10px",
                    border: "1.5px solid #e0e0e0", fontSize: "15px",
                    fontFamily: "Arial", outline: "none", boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = "#e74c3c"}
                onBlur={e => e.target.style.borderColor = "#e0e0e0"}
            />
        </div>
    );
}

export default Register;
