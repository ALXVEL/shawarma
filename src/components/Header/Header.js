import React from "react";
import './Header.css';
import shawarmaLogo from './images/shawarma-logo.jpeg';

function Header(){
    return(
        <div id="header">
            <img src={shawarmaLogo} id="logo" alt="shawarma-logo"></img>
            <h1>Shawarma Experience.</h1>
        </div>
    );
}

export default Header;