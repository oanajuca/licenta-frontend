import  {useState} from "react";
import {FaStar} from 'react-icons/fa';
//import './style.css';

const DefRating = ( props) => {
    const {star} = props
return(
    <div className="stars">
        {[...Array(star)].map((stars) =>{
            const ratingValue = stars;
return(
        <label>
            <input
            className="star_button"
            type="radio"
            name="rating"
            value={ratingValue}
            //onClick={() => (setRating(ratingValue))}
            readOnly
            />
            <FaStar className="star"
            color={ "#ffc107"}
            size={25} 
          />
        </label>
); 
    }
    )}
    </div>
)
}
export default DefRating;
