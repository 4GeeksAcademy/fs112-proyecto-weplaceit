import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserCard = (props) => {

    const { store, dispatch } = useGlobalReducer()



    return (
        
            <div className="card m-3">
                <div className="container-fluid d-flex row g-0">
                    <div className="d-flex col-4 justify-content-center p-1">
                        <img src="https://placehold.co/600x400" className="img-fluid rounded-circle " alt="..." />
                    </div>
                    <div className="col-4">
                        <div className="card-body">
                            <p className="card-title">{props.firstName && props.lastName ? `${props.firstName} ${props.lastName}` : "Nombre Completo"}  <i className="fa-solid fa-pen"></i></p>
                            <p className="card-title">{props.username || "Username"} <i className="fa-solid fa-pen"></i></p>
                            <p>{props.email || "Email"} <i className="fa-solid fa-pen"></i></p>
                            {/*<p className="card-text"><small className="text-body-secondary">{props.contact || "Contact"}</small> <i className="fa-solid fa-pen"></i></p>*/}
                        </div>
                    </div>
                    <div className="col m-3">
                        <button className="btn btn-success">
                            Post a place
                        </button>
                    </div>
                </div>
            </div>
        

    )

}