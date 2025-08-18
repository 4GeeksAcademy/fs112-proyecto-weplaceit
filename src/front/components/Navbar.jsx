import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">

				{/* Brand */}
				<Link to="/" className="navbar-brand mb-0 h1">
					React Boilerplate
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
						<li className="nav-item">
							<Link to="/about" className="nav-link">
								Acerca de
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/register" className="btn btn-outline-primary">
								Registrarse
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/login" className="btn btn-primary ms-lg-2">
								Login
							</Link>
						</li>
					</ul>
				</div>

			</div>
		</nav>
	);
};
