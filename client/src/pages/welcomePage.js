import React from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
    return (
        <div className="container welcome__container">

            <h2 className="display-4">MERN Trainee Technical Test</h2>
            <h3 className="lead">By Arnold Balabarca using:</h3>

            <div>
                <img className="welcome__img" src="https://upload.wikimedia.org/wikipedia/commons/9/94/MERN-logo.png" alt="MERN Stack"></img>
            </div>
            <div>
                <Link to='/orders' className="btn m-3 btn-primary welcome__option">View Orders</Link>
                <Link to='/products' className="btn m-3 btn-primary welcome__option">View Products</Link>
            </div>

        </div>

    )
}

export default WelcomePage