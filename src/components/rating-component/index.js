import  {useEffect, useState} from "react";
import {FaStar} from 'react-icons/fa';
import './style.css';


const Rating = (props) => {
    const {experience} = props;
const [rating,setRating] =useState(null);
useEffect (() => {
experience(rating);
}
);

return(
    <div className="stars">
        {[...Array(5)].map((star, i) =>{
            const ratingValue = i+1;

return(
        <label>
            <input
            className="star_button"
            type="radio"
            name="rating"
            value={ratingValue}
            onClick={() => (setRating(ratingValue))}
            />
            <FaStar className="star"
            color={ratingValue <= rating  ? "#ffc107" : "#e4e5e9"}
            size={40} 
         />
        </label>
); 
    }
    )}
    </div>

)
}
export default Rating;
