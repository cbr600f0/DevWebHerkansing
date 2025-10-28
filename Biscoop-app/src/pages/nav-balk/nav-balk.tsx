import { Link } from "react-router-dom";
import "./nav-balk.css";

interface NavBalkProps {
  isAuthenticated?: boolean;
}

function NavBalk({ isAuthenticated = false }: NavBalkProps) {
  const navItems = [
    { to: "/screening-room", label: "Screening Room", emoji: "🎬" },
    { to: "/movie-detail", label: "Movie Details", emoji: "🎥" },
  ];

  const authItems = isAuthenticated
    ? [{ to: "/profile", label: "Profile", emoji: "👤" }]
    : [
        { to: "/login", label: "Login", emoji: "🔑" },
      ];

  const allItems = [...navItems, ...authItems];

  return (
    <div className="nav-balk">
      <div className="nav-items">
        {allItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            title={item.label}
            className="nav-button"
          >
            <span className="nav-emoji">{item.emoji}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavBalk;
