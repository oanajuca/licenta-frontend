import React from "react";
import './home-page.css';
import HeaderComponent from "../components/header-component";
import Table from "../components/table-component";

 export default function HomePage() {
return( 
    <div className="homeBody">
        <HeaderComponent />
        <div>
           <Table /> 
        </div>
    </div>
)
 }