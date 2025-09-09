import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  // Formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) {
      setError("Configura VITE_BACKEND_URL en tu .env");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(backendUrl + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        throw new Error(data?.msg || "Credenciales inválidas");
      }

      const token = data.access_token || data.token;
      if (token) localStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(13,110,253,0.08) 0%, rgba(32,201,151,0.08) 100%)"
      }}
    >
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4 p-md-5">
            {/* Encabezado con logo redondo e h1 */}
            <div className="text-center mb-4">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: 64,
                  height: 64,
                  background: "rgba(13,110,253,0.1)"
                }}
              >
                <i className="fa-solid fa-door-open" style={{ fontSize: 24, color: "#0d6efd" }} />
              </div>
              <h1 className="h3 fw-semibold mb-1">Iniciar sesión</h1>
              <p className="text-muted mb-0">
                Accede para reservar y gestionar tus espacios
              </p>
            </div>

            {/* Mensaje de error accesible */}
            {error && (
              <div className="alert alert-danger" role="alert" aria-live="polite">
                {error}
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-envelope" />
                  </span>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password con toggle dentro del input */}
              <div className="mb-2">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-lock" />
                  </span>
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPass(!showPass)}
                    tabIndex={-1}
                    aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    <i className={showPass ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} />
                  </button>
                </div>
                <div className="form-text">Mínimo 6 caracteres.</div>
              </div>

              {/* Recordatorio + recuperar */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="remember" />
                  <label className="form-check-label" htmlFor="remember">
                    Recordarme
                  </label>
                </div>
                <Link to="/recover" className="small">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Botón enviar */}
              <button
                className="btn btn-primary w-100 py-2"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    Entrando…
                  </>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="text-center text-muted my-4">
              <span className="px-3 bg-white">o</span>
              <hr className="position-relative" />
            </div>

            {/* Acciones secundarias */}
            <div className="d-grid gap-2">
              <Link to="/" className="btn btn-outline-secondary">
                Volver al inicio
              </Link>
              <div className="text-center">
                <small className="text-muted">¿No tienes cuenta?</small>{" "}
                <Link to="/signup">Regístrate</Link>
                {/* Si tu ruta es /register, usa <Link to="/register"> */}
              </div>
            </div>
          </div>
        </div>

        {/* Pie informativo */}
        <p className="text-center text-muted small mt-3 mb-0">
          Usa <code>VITE_BACKEND_URL</code> (p. ej. <code>http://localhost:3001</code>)
        </p>
      </div>
    </div>
  );
};
