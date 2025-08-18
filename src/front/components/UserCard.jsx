import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserCard = (props) => {

    const { store, dispatch } = useGlobalReducer()



    return (
        
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="https://placehold.co/600x400" className="img-fluid rounded-circle" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        

    )

}