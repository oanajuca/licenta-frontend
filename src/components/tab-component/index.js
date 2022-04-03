import React, {useState, useEffect} from "react";
import './style.css';
import { useParams, useNavigate } from "react-router-dom";
import useQuery from '../../helpers/UseQuery';
import Overview from '../tab-pages-components/ovierview';
import TouristGuide from "../tab-pages-components/ghid";
import Map from '../tab-pages-components/map';
import Review from '../tab-pages-components/review';
import Button from "../button-component";
import {TimeIcon, LocationIcon, DistanceIcon, DifficultyIcon} from './icons.js';

export default function Tabs() {
    const [activeTab, setActiveTab] =useState('Despre');
    const query = useQuery();
    const[trails, setTrails] = useState([]);
    const[diff, setDiff] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    const tabs = ['Despre', 'Harta','Ghidul Turistului', 'Recenzii'];
    const changeTab = (tabIndex) => {
        setActiveTab(tabs[tabIndex]);
        navigate(`/trail/${params.id}?tab=${tabIndex}`);
    };
    useEffect(() => {
        const loadTrails = async () => {
            fetch(`http://localhost:8088/apuseniilapas/api/trail/${params.id}`, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((data) => {

             setTrails(data)
             setDiff(data.TrailDifficulty)});
        };
        loadTrails();
        const currTab = query.get('tab');
    setActiveTab(tabs[currTab]);

    }, [params.id]);
 
    return(
        <div className="Tabs">
            <div className="tabs_header_comp">
                 <div className="sticky-header">
                    <div className="header">
                        <div className="header_comp">
                            {/* <img src="">{trails.Mark}</img> */}
                            <div className="trail_name">{trails.Name}</div>
                            <div className="trail_details">
                                <div className="trail_desc"><i className="icons">{LocationIcon}</i>{trails.Location}</div>
                                {diff.map((dif)=> 
                                <div className="trail_desc"><i className="icons">{DifficultyIcon}</i>{dif.Description}</div>)}
                                <div className="trail_desc"><i className="icons">{DistanceIcon}</i>{trails.Distance}</div>
                                <div className="trail_desc"><i className="icons">{TimeIcon}</i>{trails.Time}</div>
                                
                            </div>
                        </div>
                    <Button
              className="edit_details"
              type="submit"
              disabled={activeTab === 'Harta'}
              handleClick={() => navigate(`/edit/${params.id}?tab=${tabs.indexOf(activeTab)}`)}
            >
              Editare
            </Button>
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
                    {activeTab === 'Ghidul Turistului' ? <TouristGuide /> : ''}
                    {activeTab === 'Harta' ? <Map /> : ''}
                    {activeTab === 'Recenzii' ? <Review /> : ''}
                </div>
            </div>
        </div>
    )
    
}
