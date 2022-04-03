import React from "react";
import './style.css';
import {Link} from 'react-router-dom'

export default function LinkComponent(props) {
    const { label = 'not set', path = '/', className} = props;
    return(
        <div>
            <Link className={`link_component ${className}`} to={path}> {label}</Link>
        </div>
    );
}