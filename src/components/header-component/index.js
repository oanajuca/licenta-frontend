import React from "react";
import './header.css';
import { useNavigate } from "react-router-dom";
import SearchInput from '../search-component';
import LogoHeader from "../logo-component/logo-header";
import UserButton from "./userButton";
 
export default function HeaderComponent({children}) {
    const navigate = useNavigate();
    return(
        <div>
            <header className="home_header">
                <div className="logo_header" onClick={() => navigate('/home')}><LogoHeader />
                <p className="header_title">APUSENII LA PAS</p></div>
                <SearchInput className="search_input" />
               <UserButton />
                {children}
            </header>
        </div>
    );
}