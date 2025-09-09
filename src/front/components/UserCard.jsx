// src/components/UserCard.jsx
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const UserCard = (props) => {
  const { store, dispatch } = useGlobalReducer();

  console.log("UserCard props:", props);
  

  const fullName =
    props.firstName && props.lastName
      ? `${props.firstName} ${props.lastName}`
      : "Nombre Completo";

  const username = props.username || "Username";
  const email = props.email || "Email";

  // Si no tienes avatar real, usa el placeholder actual o un avatar con iniciales:
  const avatarSrc =
    props.avatarUrl ||
    "https://placeholder.pics/svg/600x400";

  return (
    <div className="card border-0 shadow-sm rounded-4 m-3 glass">
      <div className="row g-0 align-items-center p-3 p-md-4">
        {/* Avatar */}
        <div className="col-12 col-md-4 d-flex justify-content-center mb-3 mb-md-0">
          <div className="user-avatar-wrapper">
            <img
              src={avatarSrc}
              alt="Avatar"
              className="user-avatar"
            />
          </div>
        </div>

        {/* Datos */}
        <div className="col-12 col-md-5">
          <div className="card-body p-0">
            <p className="user-name mb-1">
              {fullName} <i className="fa-solid fa-pen ms-1"></i>
            </p>    
            <p className="user-username mb-1">
              @{username} <i className="fa-solid fa-pen ms-1"></i>
            </p>
            <p className="user-email mb-0">
              {email} <i className="fa-solid fa-pen ms-1"></i>
            </p>
          </div>
        </div>

        {/* Acción */}
        <div className="col-12 col-md-3 text-md-end mt-3 mt-md-0">
          <Link to="/addplace" className="btn btn-success px-4 fw-semibold w-100 w-md-auto">
            Publicar Espacio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
