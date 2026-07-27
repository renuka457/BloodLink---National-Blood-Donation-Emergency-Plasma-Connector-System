import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const CITIES = ["Pune", "Mumbai", "Bangalore", "Delhi", "Chennai", "Hyderabad"];

function AddDonor() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [lastDonation, setLastDonation] = useState("");

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const validate = () => {
        if (!name || !bloodGroup || !city || !phone || !age || !weight) {
            setIsError(true); setMessage("Please fill all required fields."); return false;
        }
        if (parseInt(age) < 18 || parseInt(age) > 65) {
            setIsError(true); setMessage("Donor age must be between 18 and 65 years."); return false;
        }
        if (parseInt(weight) < 50) {
            setIsError(true); setMessage("Donor weight must be at least 50 kg."); return false;
        }
        if (phone.length !== 10 || isNaN(phone)) {
            setIsError(true); setMessage("Please enter a valid 10-digit phone number."); return false;
        }
        return true;
    };

    const submitDonor = async (forceUpdate = false) => {
        if (!validate()) return;
        setLoading(true); setMessage(""); setIsError(false);
        try {
            const url = forceUpdate ? `${API_BASE_URL}/update-donor` : `${API_BASE_URL}/add-donor`;
            const method = forceUpdate ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name, blood_group: bloodGroup, city, phone,
                    age: parseInt(age), weight: parseInt(weight),
                    last_donation: lastDonation || null,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setIsError(false);
                setMessage("");
                setIsRegistered(true);
            } else if (res.status === 400 && data.already_registered) {
                setShowPopup(true);
            } else {
                setIsError(true);
                setMessage(data.error || "Something went wrong.");
            }
        } catch {
            setIsError(true); setMessage("Cannot connect to server.");
        }
        setLoading(false);
    };

    const handleUpdate = () => {
        setShowPopup(false);
        setIsUpdateMode(true);
        setMessage("");
    };

    if (isRegistered) {
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
                        <span style={{ fontSize: "64px", display: "block", marginBottom: "16px" }}>❤️</span>
                        <h1 style={{ fontSize: "28px", color: "#c0392b", margin: "0 0 12px 0", fontFamily: "'Georgia', serif" }}>
                            Thank You, {name}!
                        </h1>
                        <p style={{ color: "#444", fontFamily: "Arial", fontSize: "18px", marginBottom: "32px", fontWeight: "600", lineHeight: 1.5 }}>
                            You are now registered as a blood donor. You may save a life today.
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <button onClick={() => navigate("/")} style={{
                            flex: 1, padding: "14px",
                            background: "white", color: "#c0392b",
                            border: "2px solid #c0392b", borderRadius: "12px",
                            fontSize: "15px", fontWeight: "700", cursor: "pointer",
                            fontFamily: "Arial", transition: "background 0.2s"
                        }}
                            onMouseEnter={e => e.target.style.background = "#fff5f5"}
                            onMouseLeave={e => e.target.style.background = "white"}
                        >
                            Exit
                        </button>
                        <button onClick={() => {
                            setIsRegistered(false);
                            setIsUpdateMode(true);
                        }} style={{
                            flex: 1, padding: "14px",
                            background: "linear-gradient(135deg, #c0392b, #e74c3c)",
                            color: "white", border: "none", borderRadius: "12px",
                            fontSize: "15px", fontWeight: "700", cursor: "pointer",
                            fontFamily: "Arial",
                        }}>
                            Update Information
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
            padding: "40px 20px",
            display: "flex", justifyContent: "center",
        }}>
            {/* Already Registered Popup */}
            {showPopup && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    background: "rgba(0,0,0,0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 999,
                }}>
                    <div style={{
                        background: "white", borderRadius: "20px",
                        padding: "40px 36px", maxWidth: "380px", width: "90%",
                        textAlign: "center",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                    }}>
                        <div style={{ fontSize: "52px", marginBottom: "16px" }}>🩸</div>
                        <h2 style={{ fontFamily: "'Georgia', serif", color: "#c0392b", fontSize: "22px", marginBottom: "10px" }}>
                            Already Registered!
                        </h2>
                        <p style={{ fontFamily: "Arial", color: "#666", fontSize: "15px", lineHeight: 1.6, marginBottom: "28px" }}>
                            This phone number is already registered as a donor. Would you like to update your information?
                        </p>
                        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                            <button onClick={() => setShowPopup(false)} style={{
                                padding: "11px 24px", borderRadius: "20px",
                                border: "1.5px solid #e0e0e0", background: "white",
                                color: "#555", fontFamily: "Arial", fontWeight: "600",
                                fontSize: "14px", cursor: "pointer",
                            }}>Cancel</button>
                            <button onClick={handleUpdate} style={{
                                padding: "11px 24px", borderRadius: "20px",
                                border: "none",
                                background: "linear-gradient(135deg, #c0392b, #e74c3c)",
                                color: "white", fontFamily: "Arial", fontWeight: "700",
                                fontSize: "14px", cursor: "pointer",
                            }}>Update Info</button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ width: "100%", maxWidth: "560px" }}>
                <div style={{ textAlign: "center", marginBottom: "28px" }}>
                    <span style={{ fontSize: "52px" }}>{isUpdateMode ? "✏️" : "💉"}</span>
                    <h1 style={{ fontSize: "30px", color: "#c0392b", margin: "8px 0 6px", fontFamily: "'Georgia', serif" }}>
                        {isUpdateMode ? "Update Donor Info" : "Become a Donor"}
                    </h1>
                    <p style={{ color: "#666", fontFamily: "Arial", fontSize: "15px" }}>
                        {isUpdateMode ? "Update your donor details below." : "Register once. Help save lives in emergencies near you."}
                    </p>
                </div>

                <div style={{
                    background: "white", borderRadius: "24px",
                    padding: "36px", boxShadow: "0 20px 60px rgba(192,57,43,0.12)",
                }}>
                    {message && (
                        <div style={{
                            background: isError ? "#ffeaea" : "#eafaf1",
                            color: isError ? "#c0392b" : "#1e8449",
                            padding: "14px 18px", borderRadius: "12px",
                            marginBottom: "24px", fontFamily: "Arial", fontSize: "14px",
                            border: `1px solid ${isError ? "#f5c6c6" : "#a9dfbf"}`,
                        }}>
                            {message}
                        </div>
                    )}

                    <SectionTitle>Basic Information</SectionTitle>
                    <Input label="Full Name" value={name} onChange={setName} placeholder="e.g. John Doe" type="text" />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <Input label="Age (18–65)" value={age} onChange={setAge} placeholder="e.g. 25" type="number" />
                        <Input label="Weight in kg (min 50)" value={weight} onChange={setWeight} placeholder="e.g. 65" type="number" />
                    </div>
                    <Input label="Phone Number" value={phone} onChange={setPhone} placeholder="10-digit mobile number" type="tel" />

                    <SectionTitle>Blood Group</SectionTitle>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "20px" }}>
                        {BLOOD_GROUPS.map(bg => (
                            <button key={bg} onClick={() => setBloodGroup(bg)} style={{
                                padding: "10px 0", borderRadius: "10px", cursor: "pointer",
                                fontWeight: "700", fontSize: "14px", fontFamily: "Arial",
                                border: bloodGroup === bg ? "2px solid #c0392b" : "2px solid #e0e0e0",
                                background: bloodGroup === bg ? "#fdf2f2" : "white",
                                color: bloodGroup === bg ? "#c0392b" : "#555",
                                transition: "all 0.15s",
                            }}>{bg}</button>
                        ))}
                    </div>

                    <SectionTitle>Location</SectionTitle>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={labelStyle}>City</label>
                        <select value={city} onChange={e => setCity(e.target.value)} style={{
                            width: "100%", padding: "12px 16px", borderRadius: "10px",
                            border: "1.5px solid #e0e0e0", fontSize: "15px",
                            fontFamily: "Arial", outline: "none", background: "white", cursor: "pointer",
                        }}
                            onFocus={e => e.target.style.borderColor = "#e74c3c"}
                            onBlur={e => e.target.style.borderColor = "#e0e0e0"}>
                            <option value="">Select your city</option>
                            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <SectionTitle>Medical Info (Optional)</SectionTitle>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={labelStyle}>Last Donation Date</label>
                        <input
                            type="date" value={lastDonation}
                            onChange={e => setLastDonation(e.target.value)}
                            style={{
                                width: "100%", padding: "12px 16px", borderRadius: "10px",
                                border: "1.5px solid #e0e0e0", fontSize: "15px",
                                fontFamily: "Arial", outline: "none", boxSizing: "border-box",
                            }}
                            onFocus={e => e.target.style.borderColor = "#e74c3c"}
                            onBlur={e => e.target.style.borderColor = "#e0e0e0"}
                        />
                        <p style={{ fontFamily: "Arial", fontSize: "12px", color: "#999", marginTop: "6px" }}>
                            ℹ️ Donors must wait at least 3 months between donations.
                        </p>
                    </div>

                    <button onClick={() => submitDonor(isUpdateMode)} disabled={loading} style={{
                        width: "100%", padding: "15px",
                        background: "linear-gradient(135deg, #c0392b, #e74c3c)",
                        color: "white", border: "none", borderRadius: "12px",
                        fontSize: "16px", fontWeight: "700", cursor: "pointer",
                        fontFamily: "Arial", marginTop: "8px",
                        opacity: loading ? 0.7 : 1,
                        boxShadow: "0 4px 16px rgba(192,57,43,0.3)",
                    }}>
                        {loading ? "Please wait..." : isUpdateMode ? "Update Info" : "Register as Donor 🩸"}
                    </button>
                </div>

                <div style={{
                    background: "rgba(192,57,43,0.06)", border: "1px solid rgba(192,57,43,0.15)",
                    borderRadius: "16px", padding: "18px 22px", marginTop: "20px",
                    fontFamily: "Arial", fontSize: "14px", color: "#666", lineHeight: 1.7,
                }}>
                    💡 <strong style={{ color: "#c0392b" }}>Eligibility:</strong> Age 18–65 · Weight ≥ 50kg · No recent illness · Gap of 3 months from last donation
                </div>
            </div>
        </div>
    );
}

function SectionTitle({ children }) {
    return (
        <div style={{
            fontSize: "13px", fontFamily: "Arial", fontWeight: "700",
            color: "#c0392b", textTransform: "uppercase", letterSpacing: "1px",
            marginBottom: "14px", marginTop: "8px",
            borderBottom: "1px solid #fde8e8", paddingBottom: "6px",
        }}>{children}</div>
    );
}

const labelStyle = {
    display: "block", fontFamily: "Arial", fontSize: "13px",
    fontWeight: "700", color: "#444", marginBottom: "8px",
    textTransform: "uppercase", letterSpacing: "0.5px",
};

function Input({ label, value, onChange, placeholder, type = "text" }) {
    return (
        <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>{label}</label>
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

export default AddDonor;
