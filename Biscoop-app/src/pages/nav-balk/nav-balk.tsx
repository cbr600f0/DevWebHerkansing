import { Link } from "react-router-dom";
import "./nav-balk.css";

interface NavBalkProps {
  isAuthenticated?: boolean;
}

function NavBalk({ isAuthenticated = false }: NavBalkProps) {

  const authItems = isAuthenticated
    ? [
        { to: "/profile", label: "Profile", emoji: "👤" },
        { to: "/movie_list", label: "movie-list", emoji: "🎥"},
        { to: "/movie_panel", label: "manage-movies", emoji: "📎"},
        { to: "/zaal_panel", label: "manage-rooms", emoji: "📎"},
        { to: "/show_panel", label: "manage-shows", emoji: "📎"},
        { to: "/ScreeningRoom", label: "room", emoji: "🏠"},
    ]
    : [
        { to: "/login", label: "Login", emoji: "🔑" },
      ];

  const allItems = [...authItems];

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

