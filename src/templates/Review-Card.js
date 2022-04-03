import react, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import CardComponent from "../components/card-component";
import Spinner from "../components/spinner-component";
import Reviews from "../components/review-component";

export default function ReviewCard(){
    const [isLoading, setIsLoading]= useState(false);
    const[reviews, setReviews] = useState(['']);
    const [user,setUser]= useState(['']);
    const params=useParams();
    const loadReview = async () => {
        fetch(`http://localhost:8088/apuseniilapas/api/user/${params.id}`,{
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setReviews(data.Review)
          setUser(data)});
        }
        useEffect(() =>{
            loadReview();
        }, [params.id]);
    return(
        <div>
        {isLoading ? (<Spinner />) : (
            <div className="wrapper_log">
              <div className="centered__card">
                <CardComponent>
                <form className="rev-form1">
                <label>{user.FirstName}</label>
                <label>{user.Lastname}</label>
                <label>{user.Username}</label>
                </form>
                <div>
                {!reviews ? (<Spinner />) : reviews.map((rev) => (
                  <Reviews
                  key={rev.stars}
                  stars={rev.stars}
                  comment={rev.comment}
                  />
                 ), }

               </div>
                </CardComponent>
              
                </div>
                </div>
    )}
    </div>
    )
}