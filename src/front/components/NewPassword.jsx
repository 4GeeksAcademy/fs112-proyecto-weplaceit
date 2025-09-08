import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

export const NewPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [password, setPassword] = useState("");

    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const resetPassword = async (e) => {
        e.preventDefault();
        setError(null);


        if (!backendUrl) {
            setError("Configura VITE_BACKEND_URL en tu .env");
            return;
        }


        setLoading(true);

        try {
            const res = await fetch(`${backendUrl}/api/reset-password/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password })
        });

            const data = await res.json();

            if (res.ok) {
                alert("Contraseña restablecida con éxito. Ahora puedes iniciar sesión.");
                navigate("/login");
            } else {
                setError(data.msg || "Cambio de contraseña fallido.");
            }
        } catch (error) {
            console.error("Sign up error:", error);
            setError("A network error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-5">
                        <div className="card shadow-sm border-0 rounded-4">

                            <div className="card-body p-4">

                                <h1 className="h3 mb-3 text-center">Introduce tu nueva contraseña</h1>

                                {error && <div className="alert alert-danger">{error}</div>}



                                <form onSubmit={resetPassword} noValidate>

                                    {/* Correo electrónico */}
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


                                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                                                Solicitando restablecimiento de contraseña
                                            </>
                                        ) : (
                                            "Restablecer contraseña"
                                        )}
                                    </button>
                                </form>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}