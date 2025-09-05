import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import logoImage from "../assets/img/logo.png";

export const Navbar = () => {

	const navigate = useNavigate();

	function logout() {
		localStorage.removeItem("token");
		navigate("/login");
	}



	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">

				{/* Brand */}
				<Link to="/" className="navbar-brand mb-0 h1">
					<img src={logoImage} alt="Weplaceit Logo" style={{ height: "80px", marginBottom: "-15px", marginTop: "-15px" }} />
				</Link>

				{/* Toggler (móvil) */}
				<button
					className="navbar-toggler"
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

						{/* <li className="nav-item">
							<Link to="/about" className="nav-link">
								Acerca de
							</Link>
						</li> */}


						{
							localStorage.getItem("token") ?

								<>
									<li className="nav-item">
										<Link to="/profile" className="btn btn-primary ms-lg-2">
											Mi perfil
										</Link>
									</li>

									<li className="nav-item">
										<Link to="/login" className="btn btn-danger ms-lg-2" onClick={logout}>
											Cerrar sesión
										</Link>
									</li>
								</>
							:
								<>
									<li className="nav-item">
										<Link to="/login" className="btn btn-primary ms-lg-2">
											Iniciar sesión
										</Link>
									</li>
									<li className="nav-item">
										<Link to="/signup" className="btn btn-outline-primary">
											Registrarse
										</Link>
									</li>
								</>
						}
					</ul>
				</div>

			</div>
		</nav>
	);
};
