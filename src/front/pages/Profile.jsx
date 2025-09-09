import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import AuthService from "../services/AuthService";
import { UserCard } from "../components/UserCard";
import { Card } from "../components/Card";
import SpaceCard from "../components/SpaceCard";

export const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userSpaces, setUserSpaces] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProfileData();
    AuthService.verifyToken(navigate).then((result) => {
      if (!result.valid) console.log("Comprobar Token", result.msg);
    });
  }, []);

  function fmtDate(iso) {
    if (!iso) return "-";
    try {
      const d = new Date(iso + "T00:00:00");
      return d.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  }

  function badgeForStatus(status) {
    const s = String(status || "").toLowerCase();
    if (s === "confirmed") return "success";
    if (s === "pending") return "warning";
    if (s === "cancelled" || s === "canceled") return "secondary";
    return "secondary";
  }

  function prettyJoined(iso) {
    if (!iso) return "-";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("es-ES", { year: "numeric", month: "long" });
    } catch {
      return "-";
    }
  }

  async function fetchProfileData() {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        if (response.status === 401) navigate("/login");
        return;
      }

      const { current_user } = await response.json();
      setUserData(current_user);
      setUserSpaces(current_user.owned_spaces);
      setUserBookings(current_user.bookings || []);
      setUserFavorites(current_user.favorite_spaces || []);

    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  }

  const spacesCount = userData?.owned_spaces_count ?? (userSpaces?.length || 0);
  const bookingsCount = userData?.bookings_count ?? (userBookings?.length || 0);

  return (
    <div className="container py-4 profile-page">

      {/* HERO con gradiente y tarjeta glass */}
      <section className="profile-hero rounded-4 shadow-sm mb-4">
        <div className="profile-hero__overlay" />
        <div className="position-relative z-1 p-4 p-md-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <div className="glass p-3 p-md-4 rounded-4 shadow-lg animate-fadein">
                {loading ? (
                  <div className="placeholder-wave">
                    <div className="placeholder col-8 mb-2" style={{ height: 24 }}></div>
                    <div className="placeholder col-6 mb-2" style={{ height: 18 }}></div>
                    <div className="placeholder col-10 mb-0" style={{ height: 18 }}></div>
                  </div>
                ) : (
                  <UserCard
                    username={userData?.username}
                    email={userData?.email}
                    firstName={userData?.first_name}
                    lastName={userData?.last_name}
                  />
                )}
              </div>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="col-lg-5">
              <div className="row g-3">
                <div className="col-6">
                  <div className="stats-card rounded-4 p-3 shadow-hover h-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="badge bg-primary-subtle text-primary fw-semibold">Reservas</span>
                      <i className="bi bi-calendar-check fs-4 opacity-75" />
                    </div>
                    <div className="display-6 fw-bold mt-2">{bookingsCount}</div>
                    <small className="text-muted">Totales</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stats-card rounded-4 p-3 shadow-hover h-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="badge bg-success-subtle text-success fw-semibold">Espacios</span>
                      <i className="bi bi-building fs-4 opacity-75" />
                    </div>
                    <div className="display-6 fw-bold mt-2">{spacesCount}</div>
                    <small className="text-muted">Publicados</small>
                  </div>
                </div>
                <div className="col-12">
                  <div className="stats-card rounded-4 p-3 shadow-hover">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-person-check"></i>
                      <span className="fw-semibold">Miembro desde</span>
                    </div>
                    <div className="mt-1">{prettyJoined(userData?.created_at)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>{/* /row */}
        </div>
      </section>

      {/* ACCORDION */}
      <div className="accordion" id="accordionExample">

        {/* Favoritos */}
        <div className="accordion-item rounded-4 shadow-sm overflow-hidden mb-3 border-0">
          <h2 className="accordion-header">
            <button className="accordion-button py-3 fw-semibold" type="button"
              data-bs-toggle="collapse" data-bs-target="#favCollapse" aria-expanded="true" aria-controls="favCollapse">
              Favoritos guardados
            </button>
          </h2>
          <div id="favCollapse" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="scroll-mask d-flex flex-row overflow-auto gap-3 p-3">
                {userFavorites && userFavorites.length > 0 ? userFavorites.map((space, index) => (
                  <div key={index} className="col-md-3 col-sm-6 col-xs-12 d-flex justify-content-center align-items-center">
                    <SpaceCard key={index} title={space.title} description={space.description} price={space.price_per_day + "€/día"} images={space.images} />
                  </div>
                )) : (
                  <p className="mb-0 w-100 text-center">No tienes espacios favoritos/guardados todavía.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reservas */}
        <div className="accordion-item rounded-4 shadow-sm overflow-hidden mb-3 border-0">
          <h2 className="accordion-header">
            <button className="accordion-button py-3 fw-semibold" type="button"
              data-bs-toggle="collapse" data-bs-target="#bookingsCollapse" aria-expanded="true" aria-controls="bookingsCollapse">
              Mis reservas
            </button>
          </h2>
          <div id="bookingsCollapse" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              {loading ? (
                <div className="placeholder-wave">
                  <div className="placeholder col-12 mb-2" style={{ height: 40 }}></div>
                  <div className="placeholder col-10 mb-2" style={{ height: 40 }}></div>
                  <div className="placeholder col-8" style={{ height: 40 }}></div>
                </div>
              ) : userBookings && userBookings.length > 0 ? (
                <div className="table-responsive rounded-4 border profile-table-wrap">
                  <table className="table table-hover align-middle mb-0 profile-table">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>#</th>
                        <th>Espacio</th>
                        <th>Entrada</th>
                        <th>Salida</th>
                        <th>Días</th>
                        <th>Total (€)</th>
                        <th>Estado</th>
                        <th className="text-end">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userBookings.map((b) => (
                        <tr key={b.booking_id} className="row-soft">
                          <td className="fw-semibold">{b.booking_id}</td>
                          <td>
                            <td className="">
                              {b.space.title}
                            </td>
                          </td>
                          <td>{fmtDate(b.check_in)}</td>
                          <td>{fmtDate(b.check_out)}</td>
                          <td>{b.total_days}</td>
                          <td className="fw-semibold">{Number(b.total_price).toFixed(2)}</td>
                          <td>
                            <span className={`badge badge-soft bg-${badgeForStatus(b.status)}-subtle text-${badgeForStatus(b.status)} text-capitalize`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="text-end">
                            <Link to={`/detail/${b.space_id}`} className="btn btn-sm btn-outline-primary">
                              Ver espacio
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state glass-soft p-4 p-md-5 rounded-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div>
                    <h5 className="mb-1">Aún no tienes reservas</h5>
                    <p className="mb-0 text-muted">Explora y reserva tu primer espacio.</p>
                  </div>
                  <Link to="/" className="btn btn-primary btn-lg shadow-hover">Buscar espacios</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Espacios reservados (demo) */}
        <div className="accordion-item rounded-4 shadow-sm overflow-hidden mb-3 border-0">
          <h2 className="accordion-header">
            <button className="accordion-button py-3 fw-semibold" type="button"
              data-bs-toggle="collapse" data-bs-target="#bookedSpacesCollapse" aria-expanded="true" aria-controls="bookedSpacesCollapse">
              Espacios reservados (demo)
            </button>
          </h2>
          <div id="bookedSpacesCollapse" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="scroll-mask d-flex flex-row overflow-auto gap-3 p-3">
                {
                  userSpaces && userSpaces.length > 0 ? userSpaces.map((space, index) => (
                    <div key={index} className="col-md-3 col-sm-6 col-xs-12 d-flex justify-content-center align-items-center">
                      <SpaceCard key={index} title={space.title} description={space.description} price={space.price_per_day + "€/día"} images={space.images} />
                    </div>
                  )) :
                    <p className="mb-0 w-100 text-center">No tienes espacios disponibles. <Link to="/post-space">¡Crea tu espacio ahora!</Link></p>
                }
              </div>
            </div>
          </div>
        </div>

        {/* Mis espacios disponibles */}
        <div className="accordion-item rounded-4 shadow-sm overflow-hidden border-0">
          <h2 className="accordion-header">
            <button className="accordion-button py-3 fw-semibold" type="button"
              data-bs-toggle="collapse" data-bs-target="#mySpacesCollapse" aria-expanded="true" aria-controls="mySpacesCollapse">
              Mis espacios disponibles
            </button>
          </h2>
          <div id="mySpacesCollapse" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="scroll-mask d-flex flex-row overflow-auto gap-3 p-3">
                {loading ? (
                  <>
                    <div className="placeholder col-3" style={{ height: 220 }}></div>
                    <div className="placeholder col-3" style={{ height: 220 }}></div>
                    <div className="placeholder col-3" style={{ height: 220 }}></div>
                  </>
                ) : userSpaces && userSpaces.length > 0 ? (
                  userSpaces.map((space, index) => (
                    <div key={index} className="flex-shrink-0" style={{ width: 288 }}>
                      <SpaceCard
                        title={space.title}
                        description={space.description}
                        price={space.price_per_day + "€/día"}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-center mb-0">
                    No tienes espacios disponibles.{" "}
                    <Link to="/post-space">¡Crea tu espacio ahora!</Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>{/* /accordion */}
    </div>
  );
};
