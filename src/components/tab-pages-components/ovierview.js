import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../spinner-component";
import Descriptions from "../description-component";
import "./overview.css";
import { useParams } from "react-router-dom";
import EditOverview from "../edit-overview-component";

export default function Overview({ isEditable }) {
  const [descriptions, setDescriptions] = useState([]);
  const [trail, setTrail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEdits, setShowEdits] = useState(false);
  const params = useParams();
  useEffect(() => {
    const loadTrails = async () => {
      setIsLoading(true);
      fetch(`http://localhost:8088/apuseniilapas/api/trail/${params.id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setDescriptions(data.Description);
          setTrail(data);
          setShowEdits(true);
        });
    };
    loadTrails();
  }, [params.id]);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="overview-wrapper">
          <div className="column1">
                {!isEditable && (
                  <>
              {descriptions.map((desc) => (
                <Descriptions
                  key={desc.Steps}
                  shortdescription={desc.ShortDescription}
                  steps={desc.Steps}
                  equipment={desc.Equipment}
                  indications={desc.Indications}
                  observations={desc.Observations}
                />
              ))
            }
            </>
             )}
              {isEditable && (
                <div>
                {showEdits ? (<EditOverview descrip={descriptions} trailId={trail.Id} />) : (<Spinner />)}
            </div>
            )}
      </div>
      </div>
      )}
      </div>
  
  );
}
