import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../spinner-component";
import TouristGuides from "../touristguide-component";
import EditTouristGuide from "../edit-touristguide-component";
import "./ghid.css";
import { useParams } from "react-router-dom";

export default function TouristGuide({isEditable}){
    const [guides, setGuides] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [trail, setTrail] =  useState([]);
    const [showEdit, setShowEdit]= useState(false);
      const { register, handleSubmit } = useForm({ defaultValues: guides });
      const submitForm = (data) => {
        const dataJson = JSON.stringify(data);
        console.log(dataJson); // data will be transfered with save button (submit for test)
      };
    const params = useParams();
    useEffect(() => {
      const loadGuides = async () => {
        setIsLoading(true);
        fetch(`http://localhost:8088/apuseniilapas/api/trail/${params.id}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setIsLoading(false);
            setGuides(data.TrailTouristGuide);
            setTrail(data);
            setShowEdit(true);
          });
      };
      loadGuides();
    }, [params.id]);
    return(
<div>
{isLoading ? (
        <Spinner />
      ) : ( 
        <div className="overview-wrapper">
       
              {!isEditable && (
                <>
          
            {guides.map((guide) => (
                <TouristGuides
                discover={guide.Discover}
                promote={guide.Promote}
                camping={guide.Camping}
                fire={guide.Fire}
                deviation={guide.Deviation}
                noise={guide.Noise}
                environment={guide.Environment}
                rules={guide.Rules}
                garbage={guide.Garbage}
                />
                ))
                }
                </>
              )}
              {isEditable && (
                <div>
                {showEdit ? (<EditTouristGuide ghid={guides} trailId={trail.Id} />) : (<Spinner />)}
            </div>
            )}
                </div>
      )}

</div>
    );
}