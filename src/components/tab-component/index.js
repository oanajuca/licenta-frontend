import React, {useState, useEffect,useContext} from "react";
import './style.css';
import { useParams, useNavigate } from "react-router-dom";
import useQuery from '../../helpers/UseQuery';
import Overview from '../tab-pages-components/ovierview';
import TouristGuide from "../tab-pages-components/ghid";
import Map from '../tab-pages-components/map';
import Review from '../tab-pages-components/review';
import Button from "../button-component";
import UserContext from "../../helpers/UseContext/UserContext";
import { useForm } from "react-hook-form";
import {TimeIcon, LocationIcon, DistanceIcon, DifficultyIcon} from './icons.js';

export default function Tabs() {
    const [activeTab, setActiveTab] =useState('Despre');
    const query = useQuery();
    const {userState} = useContext(UserContext);
    const[trails, setTrails] = useState([]);
    const[diff, setDiff] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const tabs = ['Despre', 'Harta','Ghidul Turistului', 'Recenzii'];
    const changeTab = (tabIndex) => {
        setActiveTab(tabs[tabIndex]);
        navigate(`/trail/${params.id}?tab=${tabIndex}`);
    };
    useEffect(() => {
        if(userState.Role==='Admin'){
            setShowButton(true);
        }
        else{
            setShowButton(false)
        }
        const loadTrails = async () => {
            fetch(`http://localhost:8088/apuseniilapas/api/trail/${params.id}`, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((data) => 

             setTrails(data)
             );
        };
        loadTrails();
        const currTab = query.get('tab');
    setActiveTab(tabs[currTab]);

    }, [params.id]);
    const handleButtonClick = (e) => {
        e.preventDefault();
      if(userState.Role === 'Admin'){
        navigate(`/edit/${params.id}?tab=${tabs.indexOf(activeTab)}`)
      }
    }     
    
    
 
    return(
        <div className="Tabs">
            <div className="tabs_header_comp">
                 <div className="sticky-header">
                    <div className="header">
                        <div className="header_comp">
                            <div className="trail_name">{trails.Name}
                           <img className="trail_logo" width={60} height={60} src={trails.Mark} alt="logo"></img> </div>
                            <div className="trail_details">
                            
                                <div className="trail_desc"><i className="icons">{LocationIcon}</i>{trails.Location}</div>
                               
                                <div className="trail_desc"><i className="icons">{DifficultyIcon}</i>{trails.Difficulty}</div>
                                <div className="trail_desc"><i className="icons">{DistanceIcon}</i>{trails.Distance}</div>
                                <div className="trail_desc"><i className="icons">{TimeIcon}</i>{trails.Time}</div>
                                
                            </div>
                        </div>
                        {showButton ?
                    <Button
              className="edit_details"
              type="submit"
              disabled={activeTab === 'Harta'}
              handleClick={handleButtonClick}
            >
              Editare
            </Button>
            :""}
          </div>
                    <ul className="nav">
                        <div className="tabs-wrapper">
                            <li
                            className={activeTab === 'Despre' ? 'active' : ''}
                            onClick={() => changeTab(0)}
                            >
                                Despre
                            </li>
                            <li
                            className={activeTab === 'Harta' ? 'active' : ''}
                            onClick={() => changeTab(1)}
                            >
                                Harta
                            </li>
                            <li
                            className={activeTab === 'Ghidul Turistului' ? 'active' : ''}
                            onClick={() => changeTab(2)}
                            >
                                Ghidul Turistului
                            </li>
                            <li
                            className={activeTab === 'Recenzii' ? 'active' : ''}
                            onClick={() => changeTab(3)}
                            >
                                Recenzii
                            </li>
                        </div>
                    </ul>
                </div>
                <div className="outlet">
                    {activeTab === 'Despre' ? <Overview /> : ''}
                    {activeTab === 'Harta' ? <Map /> : ''}
                    {activeTab === 'Ghidul Turistului' ? <TouristGuide /> : ''}
                    {activeTab === 'Recenzii' ? <Review /> : ''}
                </div>
            </div>
        </div>
    )
    
}
