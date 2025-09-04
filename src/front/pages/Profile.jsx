import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import React, { useState, useEffect } from "react";

import AuthService from "../services/AuthService";

import { UserCard } from "../components/UserCard";
import { Card } from "../components/Card";
import SpaceCard from "../components/SpaceCard";

export const Profile = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userSpaces, setUserSpaces] = useState(null);
  const [userBookings, setUserBookings] = useState([]); // <-- NUEVO
  const [userFavorites, setUserFavorites] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProfileData();
    AuthService.verifyToken(navigate)
    .then((result) => {
      if (!result.valid) {
        console.log("Comprobar Token",result.msg);
      }
    })
  }, []);

  function fmtDate(iso) { // <-- NUEVO
    if (!iso) return "-";
    try {
      const d = new Date(iso + "T00:00:00");
      return d.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch {
      return iso;
    }
  }

  async function fetchProfileData() {
    //fetch user data from backend
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; } // <-- retorna para evitar seguir

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });

      if (!response.ok) {
        if (response.status === 401) navigate("/login");
        return;
      }

      const { current_user } = await response.json();
      
      setUserData(current_user);
      setUserSpaces(current_user.owned_spaces);
      setUserBookings(current_user.bookings || []);

    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  async function fetchUserFavorites() {
    //fetch user data from backend
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; } // <-- retorna para evitar seguir
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/get-favorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });

      if (!response.ok) {
        if (response.status === 401) navigate("/login");
        return;
      }

      const { favorites } = await response.json();
      setUserFavorites(favorites || []);

    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  }

  return (
    <>

      {userData && (
        <UserCard
          username={userData.username}
          email={userData.email}
          firstName={userData.first_name}
          lastName={userData.last_name}
        />
      )}

      <div className="accordion-item">
        <h2 className="accordion-header m-3">
          <button className="accordion-button accordion" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Your saved/favorite spaces
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <div className="d-flex flex-row overflow-auto gap-3 p-3">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header m-3">
          <button className="accordion-button accordion" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
            Your bookings
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            {/* --- Reservas reales del usuario --- */}
            {userBookings && userBookings.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Space</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Días</th>
                      <th>Total (€)</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userBookings.map((b) => (
                      <tr key={b.booking_id}>
                        <td>{b.booking_id}</td>
                        <td>
                          <Link to={"/single/" + b.space_id}>Espacio #{b.space_id}</Link>
                        </td>
                        <td>{fmtDate(b.check_in)}</td>
                        <td>{fmtDate(b.check_out)}</td>
                        <td>{b.total_days}</td>
                        <td>{Number(b.total_price).toFixed(2)}</td>
                        <td><span className="badge bg-secondary">{b.status}</span></td>
                        <td className="text-end">
                          <Link to={"/single/" + b.space_id} className="btn btn-sm btn-outline-primary">
                            Ver espacio
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mb-0">You have no bookings yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header m-3">
          <button className="accordion-button accordion" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
            Your booked spaces
          </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <div className="d-flex flex-row overflow-auto gap-3 p-3">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header m-3">
          <button className="accordion-button accordion" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseOne">
            Mis espacios disponibles
          </button>
        </h2>
        <div id="collapseFour" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <div className="d-flex flex-row overflow-auto gap-3 p-3">
              {
                userSpaces && userSpaces.length > 0 ? userSpaces.map((space, index) => (
                  <div key={index} className="col-md-3 col-sm-6 col-xs-12 d-flex justify-content-center align-items-center">
                    <SpaceCard key={index} title={space.title} description={space.description} price={space.price_per_day + "€/día"} images={space.images} />
                  </div>
                )) :
                  <p className="text-center">No tienes espacios disponibles. <Link to="/post-space">Crea tu espacio ahora!</Link></p>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
