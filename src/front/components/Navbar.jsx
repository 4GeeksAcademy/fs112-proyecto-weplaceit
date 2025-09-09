import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router"; // dejo tu import tal cual

export const Navbar = () => {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  // Efecto: eleva el navbar al hacer scroll (solo estilos)
  useEffect(() => {
    const el = document.getElementById("app-navbar");
    if (!el) return;
    const onScroll = () => {
      if (window.scrollY > 8) el.classList.add("navbar-elevated");
      else el.classList.remove("navbar-elevated");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav id="app-navbar" className="navbar navbar-expand-lg navbar-light navbar-glass sticky-top">
      <div className="container">
        {/* Brand */}
        <Link to="/" className="navbar-brand mb-0 h1 d-flex align-items-center gap-2 brand-hover">
          {/* Mini “logo” redondo (opcional, puedes quitarlo) */}
          <span
            className="rounded-circle d-inline-flex align-items-center justify-content-center bg-primary text-white fw-bold"
            style={{ width: 30, height: 30, fontSize: 14 }}
          >
            W
          </span>
          <span>[LOGO] Weplaceit</span>
        </Link>

        {/* Toggler (móvil) */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            {/* Mantengo tu código comentado */}
            {/* <li className="nav-item">
              <Link to="/about" className="nav-link">
                Acerca de
              </Link>
            </li> */}

            {localStorage.getItem("token") ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="btn btn-primary btn-pill ms-lg-2">
                    Mi perfil
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/login" className="btn btn-danger btn-pill ms-lg-2" onClick={logout}>
                    Cerrar sesión
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-primary btn-pill ms-lg-2">
                    Iniciar sesión
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/signup" className="btn btn-outline-primary btn-pill">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
