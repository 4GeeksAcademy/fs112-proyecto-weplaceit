import React from "react";
import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Home = () => {
	return (
		<div className="container py-5">
			{/* Hero */}
			<div className="row align-items-center g-4">
				<div className="col-lg-6 text-center text-lg-start">
					<h1 className="display-4 fw-bold mb-3">¡Bienvenido!</h1>
					<p className="lead mb-4">
						Esta es la página de inicio. Usa los botones para entrar o crear tu cuenta.
					</p>

					<div className="d-flex flex-column flex-sm-row gap-3">
						<Link to="/login" className="btn btn-primary btn-lg">
							Ir a Login
						</Link>
						<Link to="/register" className="btn btn-outline-secondary btn-lg">
							Registrarse
						</Link>
					</div>
				</div>

				<div className="col-lg-6 text-center">
					<img
						src={rigoImageUrl}
						alt="Rigo Baby"
						className="img-fluid rounded-circle shadow-sm"
						style={{ maxWidth: 260 }}
					/>
				</div>
			</div>

			{/* Accesos rápidos (opcional) */}
			<div className="row row-cols-1 row-cols-md-3 g-3 mt-5">
				<div className="col">
					<div className="card h-100 shadow-sm border-0">
						<div className="card-body">
							<h5 className="card-title">Login</h5>
							<p className="card-text">Ingresa a tu cuenta para continuar.</p>
							<Link to="/login" className="btn btn-primary">Entrar</Link>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card h-100 shadow-sm border-0">
						<div className="card-body">
							<h5 className="card-title">Registro</h5>
							<p className="card-text">Crea una cuenta nueva en segundos.</p>
							<Link to="/register" className="btn btn-outline-secondary">Crear cuenta</Link>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="card h-100 shadow-sm border-0">
						<div className="card-body">
							<h5 className="card-title">Demo / Acerca</h5>
							<p className="card-text">Conoce más sobre la app.</p>
							<div className="d-flex gap-2">
								<Link to="/demo" className="btn btn-light border">Demo</Link>
								<Link to="/about" className="btn btn-success">Acerca</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
