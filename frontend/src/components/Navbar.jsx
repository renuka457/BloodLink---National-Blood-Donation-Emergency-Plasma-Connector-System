import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <nav style={{
            background: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
            boxShadow: "0 2px 20px rgba(192,57,43,0.4)",
            position: "sticky",
            top: 0,
            zIndex: 100,
        }}>
            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "28px" }}>🩸</span>
                <span style={{ color: "white", fontSize: "22px", fontWeight: "800", letterSpacing: "1px", fontFamily: "'Georgia', serif" }}>
                    BloodLink
                </span>
            </Link>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <NavLink to="/find-donor">Find Donor</NavLink>
                {user ? (
                    <>
                        <NavLink to="/add-donor">Be a Donor</NavLink>
                        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", marginLeft: "8px" }}>
                            Hi, {user.name}!
                        </span>
                        <button onClick={logout} style={{
                            background: "rgba(255,255,255,0.15)",
                            color: "white",
                            border: "1px solid rgba(255,255,255,0.4)",
                            padding: "7px 16px",
                            borderRadius: "20px",
                            cursor: "pointer",
                            fontSize: "14px",
                            marginLeft: "8px",
                        }}>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <Link to="/register" style={{
                            background: "white",
                            color: "#c0392b",
                            padding: "8px 20px",
                            borderRadius: "20px",
                            textDecoration: "none",
                            fontWeight: "700",
                            fontSize: "14px",
                            marginLeft: "4px",
                        }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

function NavLink({ to, children }) {
    return (
        <Link to={to} style={{
            color: "rgba(255,255,255,0.9)",
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "600",
            transition: "background 0.2s",
        }}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.target.style.background = "transparent"}
        >{children}</Link>
    );
}

export default Navbar;
