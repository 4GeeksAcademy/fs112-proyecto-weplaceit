import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const Card = props => {
  const { store, dispatch } = useGlobalReducer();
  const [foundItem, setFoundItem] = useState(null);


  return (
    
        <div className="card col-12 col-sm-6 col-md-4 col-lg-3">
    <img src="https://placehold.co/600x400" className="card-img-top" alt="..." />
    <div className="card-body">
      <p className="card-text">Description:</p>
      <p className="card-text">Address:</p>
      <p className="card-text">Price/Day:</p>
      <div className="container-fluid d-flex justify-content-between px-0">
      {/* <Link to={`/detail/${name}`}> */}
          <button className="btn btn-primary">Details</button>
        {/* </Link> */}
      </div>
    </div>
  </div>
    
  )
}