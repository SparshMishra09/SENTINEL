import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Shield } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1.25rem' }}>
        <Shield size={24} color="#6366f1" />
        SENTINEL
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{user.email}</span>
            <button onClick={handleLogout} className="btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ fontWeight: '500' }}>Login</Link>
            <Link to="/signup" className="btn-primary">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}
