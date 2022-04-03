
import React,{useState,useEffect}from "react";
import Popup, { INITIAL_POPUP_CONFIG } from "../popup-component";
import Reviews from "../review-component";
import { useParams } from "react-router-dom";
import Spinner from "../spinner-component";
import ReviewForm from "./ReviewForm";
import { WriteReviewIcon } from "./icons";

export default function Review() {
    const [popupConfig, setPopupConfig] = useState(INITIAL_POPUP_CONFIG);
    const [reviews, setReviews] = useState(['']);
    const [user, setUser] = useState(['']);
    const [isLoading, setIsLoading] = useState(false);
const params =useParams();
    useEffect(() => {
     /*  const loadUser = async () => {
        setIsLoading(true);
        fetch(`http://localhost:8088/apuseniilapas/api/user/${params.id}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setIsLoading(false);
            setUser(data);
          });
      }; */
      const loadTrailReviews = async () => {
        setIsLoading(true);
        fetch(`http://localhost:8088/apuseniilapas/api/trail/${params.id}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setIsLoading(false);
            setReviews(data.Review);
          });
      };
      loadTrailReviews();
     // loadUser();
    }, [params.id]);

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
          },
        };
        if (type === 'post') {
          newPopupConfig.message = 'This action will close the editor and revert all changes. Are you sure you wish to exit?';
          newPopupConfig.btnType = 'green';
          newPopupConfig.size = 'large';
          newPopupConfig.confirm.action = handlepost;

        }
        setPopupConfig(newPopupConfig);
      };
    const closePopup = () => {
        setPopupConfig(INITIAL_POPUP_CONFIG);
      };
      const handlepost=() => {

      }
    return(
      <div>
        <div className="rev-form1">
                <label>{user.FirstName}</label>
                <label>{user.Lastname}</label>
                <label>{user.Username}</label>
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
        <a className="write-review" >
       <i  className="write-icon" alt="Review" onClick={() => { openPopup('post'); }} >
           {WriteReviewIcon}
           </i>
       {popupConfig.isOpen && (
          <Popup
          popupConfig={popupConfig}
            content={(
              <ReviewForm />
            )}
           
          />
        )}
      </a>
      </div>
    )
}