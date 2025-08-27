import React from "react";
import { Link } from "react-router-dom";

/**
 * Componente para mostrar una tarjeta de espacio con un carrusel, descripción y chips.
 *
 * @param {Object} props - Props del componente.
 * @param {string[]} props.images - Array de URLs de imágenes para el carrusel.
 * @param {string} props.title - Título del espacio.
 * @param {string} props.description - Descripción del espacio.
 * @param {string[]} props.chips - Array de etiquetas (chips) para mostrar características del espacio.
 * @param {string} props.redirection - URL o ruta para redirigir al hacer clic en "Ver más".
 * @param {string} props.price - Precio del espacio (por ejemplo, "100€/noche").
 */


export const SpaceCard = ({ images, title, description, chips, redirection, price }) => {   
     
    // Valores predeterminados si no se aportan props
    images = images && images.length ? images : ["https://placehold.co/600x400", "https://placehold.co/600x400", "https://placehold.co/600x400"];
    title = title || "Título por defecto";
    description = description || "Descripción por defecto del espacio.";
    chips = chips || ["WiFi", "Parking", "Aire acondicionado"];
    redirection = redirection || "#Details";
    price = price || (Math.random()*100).toFixed(0) + "€/noche";

    // Generar un id único para el carrusel
    const carouselId = `carousel-${title.replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <div className="card" style={{ width: "18rem", maxWidth: "100%", maxHeight: "100%", overflow: "hidden" }}>
            {/* Carrusel */}
            <div id={carouselId} className="carousel slide mt-2" data-bs-ride="carousel" >
                <div className="carousel-inner" style={{maxHeight: "20%"}}>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                            <img src={image} className="d-block w-100" style={{maxWidth: "600px", maxHeight: "500px", overflow: "hidden"}} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#${carouselId}`}
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#${carouselId}`}
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Descripción */}
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{price}</h6>
                <p className="card-text">{description}</p>
                <div className="d-flex flex-wrap gap-2">
                    {chips.map((chip, index) => (
                        <span key={index} className="badge bg-primary">
                            {chip}
                        </span>
                    ))}
                </div>
                <Link to={redirection} className="btn btn-primary mt-2 ">Ver más</Link>
            </div>
        </div>
    );
};

export default SpaceCard;