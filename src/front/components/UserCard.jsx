import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserCard = (props) => {

    const { store, dispatch } = useGlobalReducer()

    

    return (
        
            <div className="card m-3">
                <div className="container-fluid d-flex row g-0 justify-content-center align-items-center">
                    <div className="d-flex col-12 col-md-4 col-lg-4 justify-content-center p-1" style={{maxWidth: "150px", overflow: "hidden"}}>
                        <img src='https://placeholder.pics/svg/600x400' className="img-fluid rounded-circle " alt="..." />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                        <div className="card-body row" style={{marginLeft: "10%"}}>
                            <p className="card-title col-12">{props.firstName && props.lastName ? `${props.firstName} ${props.lastName}` : "Nombre Completo"}  {/* <i className="fa-solid fa-pen"></i> */}</p>
                            <p className="card-title col-12">{props.username || "Username"} {/* <i className="fa-solid fa-pen"></i> */}</p>
                            <p className="col-12">{props.email || "Email"} {/* <i className="fa-solid fa-pen"></i> */}</p>
                            {/*<p className="card-text"><small className="text-body-secondary">{props.contact || "Contact"}</small> <i className="fa-solid fa-pen"></i></p>*/}
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-4 m-3 d-flex justify-content-center align-items-center">
                        <Link to ="/addplace">

                        <button className="btn btn-success">
                            Publicar Espacio
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        

    )

}