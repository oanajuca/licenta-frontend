import NewTrail from "../templates/new-trail";
import HeaderComponent from "../components/header-component";

export default function AddNewTrailPage(){
    return (
        <div className="client_page">
          <HeaderComponent />
           <NewTrail /> 
        </div>
      );
}
