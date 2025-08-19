import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Versión refactorizada y simple (sin template strings, sin atajos complicados)
// - Nombres de variables claros
// - Funciones pequeñas para validar
// - Concatenación de cadenas con + en lugar de `${}`

function isEmailValid(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
}

function isPhoneValid(phone) {
  if (!phone) return true; // teléfono opcional
  var re = /^[0-9\s()+-]{7,}$/;
  return re.test(phone);
}

export default function Register() {
  var navigate = useNavigate();
  var API = import.meta.env.VITE_BACKEND_URL; // ejemplo: http://127.0.0.1:3001

  var [loading, setLoading] = useState(false);
  var [messageType, setMessageType] = useState("");
  var [messageText, setMessageText] = useState("");

  var [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    password: "",
    confirm: "",
    acepta: false,
  });

  var [errors, setErrors] = useState({});

  function handleChange(e) {
    var name = e.target.name;
    var value;
    if (e.target.type === "checkbox") value = e.target.checked;
    else value = e.target.value;

    setForm(function (prev) {
      var copy = { ...prev };
      copy[name] = value;
      return copy;
    });
  }

  function validate(values) {
    var err = {};

    if (!values.nombre || values.nombre.trim() === "") {
      err.nombre = "El nombre es obligatorio";
    }
    if (!values.apellidos || values.apellidos.trim() === "") {
      err.apellidos = "Los apellidos son obligatorios";
    }

    if (!values.email) {
      err.email = "El email es obligatorio";
    } else if (!isEmailValid(values.email)) {
      err.email = "Email no válido";
    }

    if (!isPhoneValid(values.telefono)) {
      err.telefono = "Teléfono no válido";
    }

    if (!values.password || values.password.length < 6) {
      err.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (values.confirm !== values.password) {
      err.confirm = "Las contraseñas no coinciden";
    }

    if (!values.acepta) {
      err.acepta = "Debes aceptar los términos";
    }

    return err;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessageText("");
    setMessageType("");

    var v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    try {
      setLoading(true);
      var url = API + "/api/register"; // sin template strings
      var res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.nombre,
          last_name: form.apellidos,
          email: form.email,
          phone: form.telefono,
          password: form.password,
        }),
      });

      var data = await res.json();
      if (!res.ok) {
        var serverMsg = data && data.msg ? data.msg : "No se pudo registrar";
        throw new Error(serverMsg);
      }

      setMessageType("success");
      setMessageText("Cuenta creada. Redirigiendo al login...");
      setTimeout(function () {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setMessageType("danger");
      setMessageText(error.message);
    } finally {
      setLoading(false);
    }
  }

  function inputClass(name) {
    // Clases simples sin operadores complejos
    if (errors[name]) return "form-control is-invalid";
    if (form[name]) return "form-control is-valid";
    return "form-control";
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="h3 text-center mb-4">Crear cuenta</h1>

              {messageText ? (
                <div className={"alert alert-" + messageType} role="alert">
                  {messageText}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre *</label>
                    <input
                      name="nombre"
                      className={inputClass("nombre")}
                      value={form.nombre}
                      onChange={handleChange}
                    />
                    {errors.nombre ? (
                      <div className="invalid-feedback">{errors.nombre}</div>
                    ) : null}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Apellidos *</label>
                    <input
                      name="apellidos"
                      className={inputClass("apellidos")}
                      value={form.apellidos}
                      onChange={handleChange}
                    />
                    {errors.apellidos ? (
                      <div className="invalid-feedback">{errors.apellidos}</div>
                    ) : null}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      className={inputClass("email")}
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email ? (
                      <div className="invalid-feedback">{errors.email}</div>
                    ) : null}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input
                      name="telefono"
                      className={inputClass("telefono")}
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="Opcional"
                    />
                    {errors.telefono ? (
                      <div className="invalid-feedback">{errors.telefono}</div>
                    ) : null}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Contraseña *</label>
                    <input
                      type="password"
                      name="password"
                      className={inputClass("password")}
                      value={form.password}
                      onChange={handleChange}
                    />
                    {errors.password ? (
                      <div className="invalid-feedback">{errors.password}</div>
                    ) : null}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Confirmar contraseña *</label>
                    <input
                      type="password"
                      name="confirm"
                      className={inputClass("confirm")}
                      value={form.confirm}
                      onChange={handleChange}
                    />
                    {errors.confirm ? (
                      <div className="invalid-feedback">{errors.confirm}</div>
                    ) : null}
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        id="acepta"
                        type="checkbox"
                        name="acepta"
                        className={errors.acepta ? "form-check-input is-invalid" : "form-check-input"}
                        checked={form.acepta}
                        onChange={handleChange}
                      />
                      <label htmlFor="acepta" className="form-check-label">
                        Acepto los términos y condiciones *
                      </label>
                      {errors.acepta ? (
                        <div className="invalid-feedback d-block">{errors.acepta}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-12 d-grid">
                    <button className="btn btn-primary" disabled={loading}>
                      {loading ? "Creando cuenta..." : "Registrarme"}
                    </button>
                  </div>
                </div>
              </form>

              <p className="text-center text-muted mt-3 mb-0">
                ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
              </p>
            </div>
          </div>
          <p className="text-center mt-3 text-muted" style={{ fontSize: 12 }}>
            Backend: {API}
          </p>
        </div>
      </div>
    </div>
  );
}
