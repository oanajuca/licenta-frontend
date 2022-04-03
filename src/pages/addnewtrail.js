import AddNewTabs from "../components/add-new-component/header";
import HeaderComponent from "../components/header-component";

export default function NewTrailPage(){
    return (
        <div className="client_page">
          <HeaderComponent />
          <AddNewTabs />
        </div>
      );
}
