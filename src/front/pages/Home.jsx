import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SpaceCard } from "../components/SpaceCard.jsx";
import ReserveButton from "../components/ReserveButton.jsx"; // <-- agregado

export const Home = () => {

	const imgUrl = "https://mopaqxezhidsfzfyxedp.supabase.co/storage/v1/object/public/images/home_background.png";
	const [spaces, setSpaces] = useState([]); // Estado para almacenar los espacios
	
	
	useEffect(() => {
		document.title = "Weplaceit - Home";
		fetchSpaces();
		window.scrollTo(0, 0);
	}, []);

  async function fetchSpaces() {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/spaces");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setSpaces(data.spaces);
    } catch (error) {
      console.error("Error fetching spaces:", error);
    }
  }

  return (
    <div className="container py-5">
      {/* Hero */}
      <div
        className="row align-items-center g-4"
        style={{backgroundImage: `url(${imgUrl})`, backgroundSize: 'cover', borderRadius: '15px', padding: '20px', height: '30rem'}}
      >
        <div className="col-lg-6 text-center text-lg-start bg-light bg-opacity-75 p-4 rounded">
          <h1 className="display-4 fw-bold mb-3">¡Bienvenido!</h1>
          {
            localStorage.getItem("token") ? 
              <p className="lead fst-italic mb-4">
                ~ Tú pones las personas y nosotros el espacio ~  
              </p>
            :
            <>
              <p className="lead mb-4">
                Esta es la página de inicio. Usa los botones para entrar o crear tu cuenta.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3" >
                <Link to="/login" className="btn btn-primary btn-lg">
                  Iniciar sesión
                </Link>

                <Link to="/signup" className="btn btn-outline-secondary btn-lg">
                  Registrarse
                </Link>
              </div>
            </>
          }
        </div>
      </div>

      <h1 className="w-100 text-center mt-5">Novedades</h1>
      <div className="row g-4">
        {
          spaces.length > 0 ? spaces.slice(0, 4).map((space, index) => (
            <div key={index} className="col-xl-3 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center">
              <SpaceCard 
                title={space.title} 
                description={space.description} 
                price={space.price_per_day + "€/día"}
                images={space.images}
                // redirection={"/single/" + (space.space_id || "")} // opcional si quieres enlazar a detalle
              >
                {/* Botón de reservar dentro de la card */}
                <ReserveButton spaceId={space.space_id} />
              </SpaceCard>
            </div>
          )) :
          <p className="text-center">No hay espacios disponibles en este momento.</p>
        }
      </div>

      {/* Accesos rápidos (opcional) */}

      {/* <div className="row row-cols-1 row-cols-md-3 g-3 mt-5">
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

      </div> */}
    </div>
  );
};
