import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../spinner-component";
import './map.css';

export default function Map() {
    const [map, setMap] = useState([]);
    const [isLoading, setIsLoading]= useState(false)
    const params= useParams();
    useEffect(() => {
        const loadMap = async () => {
          setIsLoading(true);
          fetch(`http://localhost:8088/apuseniilapas/api/trail/${params.id}`, {
            method: "GET",
          })
            .then((response) => response.json())
            .then((data) => {
              setIsLoading(false);
              setMap(data);
              
            });
        };
        loadMap();
      }, [params.id]);
    return(
        <div>
            {isLoading ? (
        <Spinner />
      ) : ( 
<div className="map_wrapper">
<object className="trail_map" type="text/image" width={1900} height={1000} data={map.Map} alt="harta"></object> </div>
    

      )}
        </div>
    )
    
}