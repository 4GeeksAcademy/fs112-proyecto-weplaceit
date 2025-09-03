import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const DetailComponent = (props) => {

    

    useEffect(() =>{
        console.log(props)
    })


    return(
        <>
        <div className="container py-3 my-4">
            
            
            
            <div className="d-flex justify content-center mt-3">
                {props.owner_id}
                {props.space_id}
                {props.description}
                {props.title}
            </div>

        </div>
        </>
    )
}