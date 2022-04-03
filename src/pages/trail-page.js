import React from "react";
import HeaderComponent from "../components/header-component";
import Tabs from "../components/tab-component";
import './trail-page.css';

export default function TrailPage() {
    return(
<div className="trail_page">
    <HeaderComponent />
    <div className="sticky-header">
         <Tabs /> 
    </div>
</div>
    )
}