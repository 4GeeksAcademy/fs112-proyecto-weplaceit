import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import React, { useState, useEffect } from "react";

import { UserCard } from "../components/UserCard";
import { Card } from "../components/Card";
import SpaceCard from "../components/SpaceCard";


export const Profile = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userSpaces, setUserSpaces] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProfileData();
  }, []);

  async function fetchProfileData() {
    //fetch user data from backend
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const { current_user } = await response.json();
      
      setUserData(current_user);
      setUserSpaces(current_user.owned_spaces);

    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

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
          <button className="accordion-button accordion" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
            Your bookings
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
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
          <button className="accordion-button accordion" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseOne">
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
            Your available spaces
          </button>
        </h2>
        <div id="collapseFour" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <div className="d-flex flex-row overflow-auto gap-3 p-3">
              {
                userSpaces && userSpaces.length > 0 ? userSpaces.map((space, index) => (
                  <div className="col-md-3 col-sm-6 col-xs-12 d-flex justify-content-center align-items-center">
                    <SpaceCard key={index} title={space.title} description={space.description} price={space.price_per_day + "€/día"} />
                  </div>
                )) :
                  <p className="text-center">You have no spaces available. <Link to="/post-space">Post one now!</Link></p>
              }
            </div>
          </div>
        </div>
      </div>




    </>
  )
}
