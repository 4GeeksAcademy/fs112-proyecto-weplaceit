import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DetailComponent } from "../components/DetailComponent";

export const Detail = () => {

    const { id } = useParams();
    const [space, setSpace] = useState()

        useEffect(() => {
            document.title = "Weplaceit - Home";
            setSpace(fetchSpace(id));
            window.scrollTo(0, 0);
        
        }, []);

    async function fetchSpace(id){
        try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/spaces/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setSpace(data.space);
    } catch (error) {
      console.error("Error fetching spaces:", error);
    }
    }
    
    return (
        <>
        <DetailComponent{...space}/>
        </>
    )
}