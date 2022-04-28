
import React,{useState,useEffect,useContext}from "react";
import Popup, { INITIAL_POPUP_CONFIG } from "../popup-component";
import { useParams } from "react-router-dom";
import Spinner from '../spinner-component';
import Button from "../button-component";
import Rating from "../rating-component";
import Reviews from "../review-component/reviews";
import { WriteReviewIcon } from "./icons";
import UserContext from "../../helpers/UseContext/UserContext";
import './review.css';
import ScrollButton from "../scroll-button-component";
import DefRating from "../default-rating-component";
import { DeleteIcon,Quotes } from "./icons";


export default function Review({isEditable}) {
    const [popupConfig, setPopupConfig] = useState(INITIAL_POPUP_CONFIG);
    const { userState } = useContext(UserContext);
    const [reviews, setReviews] = useState(['']);
    const [user, setUser] = useState(['']);
    const[trails,setTrails] = useState(['']);
    const [isLoading, setIsLoading] = useState(false);
const params =useParams();
    useEffect(() => {
    /*   const loadUser = async () => {
        const userid = reviews.map((revi) => revi.UserId);
        setIsLoading(true);
        fetch(`http://localhost:8088/apuseniilapas/api/user/${userid}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setIsLoading(false);
            setUser(data);
          });
      }; */ 
      console.log(userid);
      const loadTrailReviews = async () => {
        setIsLoading(true);
        fetch(`http://localhost:8088/apuseniilapas/api/trail/${params.id}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setIsLoading(false);
            setTrails(data)
            setReviews(data.TrailReview);
          });
      };
      loadTrailReviews();
      //loadUser();
    }, [params.id]);

    const [stars, setStars] = useState(1);
    const [comment, setComment] =useState('');
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] =useState(false);
    const [success, setSuccess] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

        const exp =( star ) => {setStars(star)}
        const handleComment =(e) => {
          setComment(e.target.value)
        }
        useEffect(() => {
          if(userState.Id === ''){
            setIsAuthenticated(false);
        }
        else{
            setIsAuthenticated(true)
        }
          handleadd()
        })
      
   
          const handleadd=  () => {
            fetch(`http://localhost:8088/apuseniilapas/api/review/addreview?&comment=${comment}&stars=${stars}&userid=${userid}&trailId=${params.id}`, {
              method: 'POST',
            })
              .then((response) => {
                if (response.ok) {
                 
                  window.location.reload();
                  setSuccess('Recenzia a fost adaugata cu succes!');
                  return response;
                }
                throw new Error(response.status);
              }).then(() => {
                setTimeout(() => { <p>Doriti sa adaugati mai multe recenzii?</p>; });
              }).catch(() => {
                setError('Ceva nu a mers bine.');
              });
            } 
     
    const openPopup = (type) => {
        const newPopupConfig = {
          isOpen: true,
          message: '',
          btnType: '',
          size: '',
          cancel: {
            action: closePopup,
            label: 'Ieșire',
          },
          confirm: {
            label: 'Adaugă Recenzia',
            action: handleadd && closePopup
            
          },
        };
        if (type === 'post') {
          newPopupConfig.message = 'This action will close the editor and revert all changes. Are you sure you wish to exit?';
          newPopupConfig.btnType = 'green';
          newPopupConfig.size = 'large';
         

        }
        setPopupConfig(newPopupConfig);
      };
    const closePopup = () => {
        setPopupConfig(INITIAL_POPUP_CONFIG);
      };
      const userid = userState.Id;
    return(
      <div>
        {!isEditable && (
          <>
        <div className="titlul_paginii">
          Ce spun altii
        </div>
                <div>
                {!reviews ? (<Spinner />) : reviews.map((rev) => (
                  <Reviews
                  key={rev.Stars}
                  stars={rev.Stars}
                  comment={rev.Comment}
                  />
                  ))
                  }
                  </div>
                  
               </>
      )}
               {isAuthenticated ?
        <a className="write-review" >
       <i  className="write-icon" alt="Review" onClick={() => { openPopup('post'); }} >
           {WriteReviewIcon}
           </i>
       {popupConfig.isOpen && (
          <Popup
          popupConfig={popupConfig}
            content={(
              <div className="large-box-rev">
        <form className="addreview_form">
        
            <div className="adauga_recenzie">
            
            <div className="stars">
           <label className="overview-labels">Evaluează-ți experiența</label>
           <div >
             
           <Rating experience={exp}
           />
           </div>
            
    </div>
    <div className="comment">
    <label className="overview-labels">Adauga comentariul tau</label>
       <textarea
       className="comment_zone"
        type="text"
        onBlur={handleComment}
        placeholder="Introduceti un comentariu aici"
        name="Comment"
       />
  </div>
  </div>

        </form>
      </div> 
            )}
           
          />
        )}
        
      </a> : ""}
      {isEditable && (
        <div>
        {!reviews ? (<Spinner />) : reviews.map((rev) => (
          <div className="review_wrapper">
          <div className="review_desc">
              <div className="card">
              <i className="quotes">{Quotes}</i>
              <div className="stars_description_input">
                  <DefRating star={rev.Stars}/>
              
              </div>
              <div className="comm_description_input">
                {rev.Comment}
              </div>
              <i className="quotes2">{Quotes}</i>
              </div>
              <Button
                  type="button"
                  className="delete_review"
                  handleClick={() => {
                    fetch(
                        `http://localhost:8088/apuseniilapas/api/review/delete/${rev.Id}`,
                        { method: 'DELETE',
                        
                       },
                       window.location.reload()
                      )
                      
                  }}
                >
                  {DeleteIcon} Sterge Recenzia
                </Button>
              </div>
              </div>
            ))
          }
       </div>
      )}
      <ScrollButton />
     
      </div>
    )
}