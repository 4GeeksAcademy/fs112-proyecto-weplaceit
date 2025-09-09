import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-glass border-0 mt-auto">
      <div className="container py-4">
        <div className="row gy-3 align-items-center">
          {/* Marca */}
          <div className="col-md-4 text-center text-md-start">
            <Link to="/" className="navbar-brand mb-0 h1 footer-brand">
              React Boilerplate
            </Link>
            <small className="text-muted d-block">Construido con Bootstrap 5</small>
          </div>

          {/* Enlaces */}
          {/* <div className="col-md-4">
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link to="/about" className="nav-link px-2 text-muted">Acerca</Link>
              </li>
              <li className="nav-item">
                <Link to="/demo" className="nav-link px-2 text-muted">Demo</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link px-2 text-muted">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link px-2 text-muted">Registro</Link>
              </li>
            </ul>
          </div> */}

          {/* Redes */}
          <div className="col-md-4 ms-md-auto text-center text-md-end">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="social-link me-2"
              aria-label="Twitter"
              title="Twitter"
            >
              <i className="bi bi-twitter"></i>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="social-link me-2"
              aria-label="GitHub"
              title="GitHub"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="mailto:contacto@tuapp.com"
              className="social-link"
              aria-label="Email"
              title="Email"
            >
              <i className="bi bi-envelope"></i>
            </a>
          </div>
        </div>

        <hr className="footer-sep my-4" />

        <div className="d-flex justify-content-between flex-column flex-sm-row align-items-center gap-2">
          <small className="text-muted">
            © {year} React Boilerplate. Todos los derechos reservados.
          </small>
          <div className="d-flex gap-3">
            <Link to="/terminos" className="footer-link">
              Términos
            </Link>
            <Link to="/privacidad" className="footer-link">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
