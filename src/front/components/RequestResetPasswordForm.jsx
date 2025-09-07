import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const RequestResetPasswordForm = () => {

    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    async function handleForgotPassword(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const res = await fetch(`${backendUrl}/api/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }) // <-- el email como objeto
        });
        const data = await res.json();

        if (res.ok) {
            alert("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
            navigate("/login");
        } else {
            setError(data.msg || "Error al solicitar el restablecimiento de contraseña.");
        }
        setLoading(false);
    }


    return (

        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                    <div className="card shadow-sm border-0 rounded-4">

                        <div className="card-body p-4">

                            <h1 className="h3 mb-3 text-center">Restablece tu contraseña</h1>

                            {error && <div className="alert alert-danger">{error}</div>}



                            <form onSubmit={handleForgotPassword} noValidate>

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
    );
}