
import HeaderComponent from "../components/header-component";
import NewTrailGuide from "../templates/new-guide";


export default function AddNewTrailGuidePage(){
    return (
        <div className="client_page">
          <HeaderComponent />
           <NewTrailGuide /> 
        </div>
      );
}
