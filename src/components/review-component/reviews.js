
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefRating from "../default-rating-component";
import Popup , { INITIAL_POPUP_CONFIG } from "../popup-component";
import { Quotes, DeleteIcon } from "./icons";
import './review.css';

export default function Reviews({
    stars, comment, firstname, lastname, email, del
    })
    
    {
      const [popupConfig, setPopupConfig] = useState(INITIAL_POPUP_CONFIG);

        return (
            <div className="review_wrapper">
              <div className="review_desc">
                  <div className="card">
                  <div className="comm_description_input">
                    {firstname}
                  </div>
                  <div className="comm_description_input">
                    {lastname}
                  </div>
                  <div className="comm_description_input">
                    {email}
                  </div>
                  <i className="quotes">{Quotes}</i>
                  <div className="stars_description_input">
                      <DefRating star={stars}/>
                  
                  </div>
                  <div className="comm_description_input">
                    {comment}
                  </div>
                  <i className="quotes2">{Quotes}</i>
                  </div>
                  </div>
                  </div>
                  
        )
    }