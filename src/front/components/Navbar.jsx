// Navbar.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import logoImage from "../assets/img/logo.png";

export const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const el = document.getElementById("app-navbar");
    if (!el) return;

    // sombra al hacer scroll
    const onScroll = () => {
      if (window.scrollY > 8) el.classList.add("navbar-elevated");
      else el.classList.remove("navbar-elevated");
    };

    // compensa el alto del nav
    const setBodyPadding = () => {
      document.body.style.paddingTop = el.offsetHeight + "px";
    };

    onScroll();
    setBodyPadding();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setBodyPadding);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setBodyPadding);
    };
  }, []);

  return (
    <nav
      id="app-navbar"
      className="navbar navbar-expand-lg fixed-top bg-white border-bottom"
      style={{ zIndex: 1100 }} // capa por encima de cards/carrusel
    >
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src={logoImage} alt="Weplaceit Logo" style={{ height: 80, marginBottom: -15, marginTop: -15 }} />
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            {localStorage.getItem("token") ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="btn btn-primary">Mi perfil</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-lg-2" onClick={logout}>Cerrar sesión</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="btn btn-outline-primary ms-lg-2">Registrarse</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
