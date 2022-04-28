import Rating from '../components/rating-component';
import { useState } from 'react';
import ReviewFormInput from '../components/review-component';


function ReviewForm() {
  const [stars, setStars] = useState([]);
  const [comment, setComment] =useState([]);
      const experience =( star ) => {setStars(star)}
      console.log(experience);
    return (
      <div className="large-box-rev">
        <form className="addreview_form">
        
            <div className="adauga_recenzie">
            
            <div className="stars">
           <label className="overview-labels">Evaluează-ți experiența</label>
           <div >
             
           <Rating experience={experience}
           />
           </div>
            
    </div>
    <div className="comment">
       <ReviewFormInput
        type="text"
        label="Adauga comentariul tau"
        value={comment}
        setValue={setComment}
        placeholder="Introduceti un comentariu aici"
       />
  </div>
  </div>

        </form>
      </div>
    );
  }
  
  export default ReviewForm;
  