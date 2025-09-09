import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Campos del formulario
    const [firstName, setFirstName] = useState("");
    const [lastName,  setLastName]  = useState("");
    const [username,  setUsername]  = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Estados UI
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);


        if (!backendUrl) {
            setError("Configura VITE_BACKEND_URL en tu .env");
            return;
        }


        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("first_name", firstName);
            formData.append("last_name", lastName);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);

            // Obtener el archivo de imagen del input
            const imageInput = document.getElementById("profileImage");
            if (imageInput && imageInput.files && imageInput.files[0]) {
                formData.append("profile_image", imageInput.files[0]);
            }

            const res = await fetch(`${backendUrl}/api/signup`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                alert("Signup successful! You may now log in.");
                navigate("/login");
            } else {
                setError(data.msg || "Sign up failed.");
            }
        } catch (error) {
            console.error("Sign up error:", error);
            setError("A network error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (

    <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-5">
                <div className="card shadow-sm border-0 rounded-4">

                    <div className="card-body p-4">

                        <h1 className="h3 mb-3 text-center">Crea una cuenta</h1>

                        {error && <div className="alert alert-danger">{error}</div>}


                        {/* FORMULARIO */}
                        {/* <form onSubmit={handleSubmit}> */}
                        <form onSubmit={handleSubmit} noValidate>


                            {/* Nombre (first_name) */}
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">Nombre</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="tu nombre..."
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>


                            {/* Apellido (last_name) */}
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Apellido</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="tu apellido..."
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Username */}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nombre de usuario</label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder=""
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Correo electrónico */}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="ejemplo@correo.com"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                />
                            </div>


                            {/* Contraseña */}
                            <div className="mb-2">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    id="password"
                                    type={showPass ? "text" : "password"}
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    // autoComplete="current-password"
                                />
                            </div>

                            {/* Mostrar caracteres de contraseña */}
                            <div className="form-check mb-3">
                                <input
                                    id="showPass"
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={showPass}
                                    onChange={(e) => setShowPass(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="showPass">
                                    Mostrar contraseña
                                </label>
                            </div>

                            {/* Imagen de perfil */}
                            <div className="mb-3">
                                <label htmlFor="profileImage" className="form-label">Imagen de perfil</label>
                                <input
                                    id="profileImage"
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    disabled={loading}
                                />
                            </div>

                            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                                        Creando cuenta…
                                    </>
                                ) : (
                                    "Crear cuenta"
                                )}
                            </button>
                        </form>

                    </div>
                </div>


            </div>
        </div>
    </div>
    );
};
