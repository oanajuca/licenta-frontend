import StarRating from "./Rating";
import './reviewform.css';

function ReviewForm() {
    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
    return (
      <div className="large-box-rev">
          <div className="stars">
        <label className="overview-labels">Evaluează-ți experiența</label>
            <StarRating />
          </div>
          <div className="comment">
          <label className="overview-labels">Adauga comentariul tau</label>
              <textarea className="comment_zone"/>
              
        </div>
      </div>
    );
  }
  
  export default ReviewForm;
  