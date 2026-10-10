import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "My Collection", path: "/collection" },
    { name: "Team Builder", path: "/team" },
    { name: "Battle Arena", path: "/battle" },
    { name: "Compare Pokémon", path: "/compare" },
    { name: "Weakness Analyzer", path: "/weakness" },
    { name: "Pokémon Quiz", path: "/quiz" },
    { name: "Trainer Profile", path: "/profile" },
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-navbar">
      <Link to="/" className="navbar-brand" onClick={closeMenu}>
        <span className="navbar-logo">◉</span>
        <span>
          POKÉ<span className="navbar-accent">QUEST</span>
          <small>TRAINER UNIVERSE</small>
        </span>
      </Link>

      <button
        className={`menu-toggle ${menuOpen ? "menu-active" : ""}`}
        onClick={() => setMenuOpen((previous) => !previous)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="navbar-links"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav
        id="navbar-links"
        className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}
      >
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              `navbar-link ${isActive ? "navbar-link-active" : ""}`
            }
            onClick={closeMenu}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
