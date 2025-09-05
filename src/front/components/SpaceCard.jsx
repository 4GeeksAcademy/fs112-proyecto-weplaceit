import React from "react";
import { Link } from "react-router-dom";
import ImageURL from "../assets/img/no-photo.png";

import { FavoriteIcon } from "./FavoriteIcon";
/**
 * @param {Object} props
 * @param {string[]} props.images
 * @param {string}   props.title
 * @param {string}   props.description
 * @param {string[]} props.chips
 * @param {string}   props.redirection
 * @param {string}   props.price
 * @param {React.ReactNode} props.children  // aquí puedes pasar <ReserveButton />
 */
export const SpaceCard = ({
  images,
  title,
  description,
  chips,
  redirection,
  price,
  children,
  id
}) => {
  images = images && images.length
    ? images.map(img => img.url)
    : [ImageURL];

  title = title || "Título por defecto";
  description = description || "Descripción por defecto del espacio.";
  chips = chips || ["WiFi", "Parking", "Aire acondicionado"];
  redirection = redirection || "#Details";
  price = price || (Math.random() * 100).toFixed(0) + "€/noche";

  const carouselId =
    "carousel-" + title.replace(/\s+/g, "-").toLowerCase() + "-" + Math.floor(Math.random() * 10000);

  return (
    <div
      className="card h-100 position-relative"
      style={{ width: "18rem", maxWidth: "100%", overflow: "visible" }}
    >
      {/* Carrusel */}
      <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner" style={{ maxHeight: "100%", overflow: "hidden" }}>
          {images.map((image, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                src={image}
                className="d-block w-100"
                style={{ width: "300px", height: "200px", objectFit: "cover" }}
                alt={`Slide ${index}`}
              />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Contenido */}
      <div className="card-body d-flex flex-column h-100" style={{ height: "600px" }}>
        <h5 className="card-title" style={{ height: "10%" }}>{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted" style={{ height: "10%" }}>{price}</h6>
        <p className="card-text" style={{ height: "50%" }}>{description}</p>

        {/* Badges */}
        <div className="d-flex flex-wrap gap-2" style={{ height: "10%" }}>
          {chips.map((chip, index) => (
            <span key={index} className="badge bg-light text-dark">
              {chip}
            </span>
          ))}
        </div>

        {/* Footer de acciones con poco aire, pero separado */}
        <div className="mt-3 pt-2 d-flex justify-content-between align-items-start border-top" style={{ height: "20%" }}>
          <div className="d-flex gap-2">
            {children /* <ReserveButton /> */}
          </div>

          <div className="d-flex gap-2">
          <Link to={`/detail/${id}`} className="btn btn-primary btn-sm" style={{ minWidth: 84 }}>
            Ver más
          </Link>
          </div>
          <div className="d-flex gap-2">
            <FavoriteIcon/>
          </div>
           
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
