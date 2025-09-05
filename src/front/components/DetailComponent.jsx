import { string } from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const DetailComponent = (props) => {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    // Utilidades de fecha seguras en local
    function todayISO() {
        const now = new Date();
        const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        return local.toISOString().slice(0, 10);
    }
    function addDays(isoDate, days) {
        const dt = new Date(isoDate + "T00:00:00");
        dt.setDate(dt.getDate() + days);
        const local = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000);
        return local.toISOString().slice(0, 10);
    }

    // Estado UI
    const [open, setOpen] = useState(false);
    const [checkIn, setCheckIn] = useState(todayISO());
    const [checkOut, setCheckOut] = useState(addDays(todayISO(), 1));
    const [loading, setLoading] = useState(false);
    const [inlineMsg, setInlineMsg] = useState(null);
    const [toastMsg, setToastMsg] = useState(null);
    const [totalprice, setTotalprice] = useState(0);

    async function handleReserve() {
        console.log("Reservando...");
        setInlineMsg(null);
        const token = localStorage.getItem("token");
        if (!token) { navigate("/login"); return; }
        if (!checkIn || !checkOut) { setInlineMsg("Selecciona check-in y check-out."); return; }
        if (checkOut <= checkIn) { setInlineMsg("La fecha de salida debe ser posterior a la de entrada."); return; }

        setLoading(true);
        try {
            const url = backendUrl + "/api/space/" + String(props.space_id) + "/new-booking";
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                body: JSON.stringify({ check_in: checkIn, check_out: checkOut })
            });

            if (res.status === 401) throw new Error("No autorizado. Inicia sesión.");
            if (res.status === 404) throw new Error("Espacio no encontrado.");
            if (res.status === 409) throw new Error("El espacio no está disponible en esas fechas.");
            if (res.status === 400) {
                const b = await res.json().catch(function () { return {}; });
                throw new Error(b && b.msg ? b.msg : "Datos inválidos.");
            }
            if (!res.ok) {
                const txt = await res.text().catch(function () { return ""; });
                throw new Error(txt || ("Error " + res.status));
            }

            const data = await res.json();
            const dias = data && data.total_days ? String(data.total_days) : "";
            const total = data && data.total_price ? String(data.total_price) : "";
            setToastMsg("Reserva creada: " + dias + " día(s) · Total: " + total + " €");
            navigate("/profile");
            setOpen(false);
            if (typeof onBooked === "function") onBooked(data);
        } catch (e) {
            console.error(e);
            setInlineMsg(e && e.message ? e.message : "Error al reservar");
        } finally {
            setLoading(false);
            
        }
    }

    const carouselId =
        "carousel-" +
        (props.title ? String(props.title).replace(/\s+/g, "-").toLowerCase() : "sin-titulo") + "-" + Math.floor(Math.random() * 10000);

useEffect(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end - start;
    const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    setTotalprice(diffDays * (props.price_per_day || 0));
}, [checkIn, checkOut, props.price_per_day]);


    return (

        <div className="container py-2 my-1 px-0 col-11 col-sm-7 col-md-7 col-lg-7">


            <div className="justify-content-center mt-3">
                <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner" style={{ maxHeight: "100%", overflow: "hidden" }}>
                        {(props.images && Array.isArray(props.images) && props.images.length > 0
                            ? props.images.map((img) => typeof img === "string" ? img : img.url)
                            : ["https://placehold.co/600x400"]
                        ).map((image, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                <img
                                    src={image}
                                    className="d-block w-100"
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
                {/* {props.owner_id}
                {props.space_id}
                {props.description}
                {props.title} */}


            </div>
            <div className="justify-content-start mt-3">
                <h2>{props.title || "Título por defecto"}</h2>
                <h4>{props.price_per_day ? props.price_per_day + "€/día" : (Math.random() * 100).toFixed(0) + "€/día"}</h4>
                <h5>Capacidad: {props.capacity}</h5>
                <h6>Dirección: {props.address}</h6>
                <p>{props.description || "Descripción por defecto del espacio."}</p>
            </div>
            <div>
                <h4>Programar reserva</h4>
                <div className="d-flex justify-content-center gap-2">
                    <div className="col-6">
                        <label className="form-label mb-1">Check-in</label>
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={checkIn}
                            min={todayISO()}
                            onChange={function (e) {
                                const v = e.target.value;
                                setCheckIn(v);
                                if (v >= checkOut) setCheckOut(addDays(v, 1));
                            }}
                        />
                    </div>
                    <div className="col-6">
                        <label className="form-label mb-1">Check-out</label>
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={checkOut}
                            min={addDays(checkIn, 1)}
                            onChange={function (e) { setCheckOut(e.target.value); }}
                        />
                    </div>

                </div>
                <div>
                    <h4>Total: {totalprice}€</h4>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <button
                        type="button"
                        className="btn btn-success btn-sm mt-2"
                        onClick={handleReserve}
                        disabled={loading}
                    >
                        {loading ? "Reservando..." : "Confirmar reserva"}
                    </button>

                </div>

            </div>
        </div>

    )
}