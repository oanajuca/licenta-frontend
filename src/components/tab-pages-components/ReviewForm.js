import Rating from '../rating-component';
import UserContext from '../../helpers/UseContext/UserContext';
import { useContext, useState } from 'react';
import './reviewform.css';
import { useForm } from "react-hook-form";

function ReviewForm(props) {
  const { userState } = useContext(UserContext);
  const { revi } = props;
  const { trailId } = props;
  const [stars, setStars] = useState([])
  const [comment, setComment] =useState([])
  const { register, handleSubmit } = useForm({ });
      const submitForm = (data) => {
        data.Stars= stars;
        const dataJson = JSON.stringify({"Reviews" : [{
          Id:data.Id,
          Stars: data.Stars,
         Comment: data.Comment,
          UserId: data.UserId,}],
          TrailId: data.TrailId
        })
        console.log(dataJson);
        fetch(`http://localhost:8088/apuseniilapas/api/review/add/${trailId}`, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: dataJson,
        }).then((response) => console.log(response));
      }
      const experience =( star ) => {setStars(star)}
    return (
      <div className="large-box-rev">
        <form onSubmit={handleSubmit(submitForm)}>
        <input {...register('TrailId')} type="hidden" value={trailId} />
          {revi.map((rev) => (
            <div className="adauga_recenzie">
              <div key={rev.Comment}>
             <input {...register('Id')} type="hidden" value={rev.Id} />
             {/* <input {...register('Username')} type="hidden" value={userState.Username} /> */}
             <input {...register('UserId')} type="hidden" value={userState.Id} />
              </div>
            
            <div className="stars">
           <label className="overview-labels">Evaluează-ți experiența</label>
           <div >
             
           <Rating experience={experience}
           {...register('Stars')}
           />
           </div>
            
    </div>
    <div className="comment">
    <label className="overview-labels">Adauga comentariul tau</label>
        <textarea
        {...register('Comment')}
        key={rev.Comment}
        className="comment_zone"
        name="Comment"
        type="text"/>
        
  </div>
  </div>
          ))}
        <button type="submit">Salveaza modificarile</button>
        </form>
      </div>
    );
  }
  
  export default ReviewForm;
  