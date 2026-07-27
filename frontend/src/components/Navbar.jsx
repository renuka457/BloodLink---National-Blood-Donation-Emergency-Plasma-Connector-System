import { Link } from "react-router-dom";

function Navbar() {
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
                <NavLink to="/add-donor">Be a Donor</NavLink>
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
