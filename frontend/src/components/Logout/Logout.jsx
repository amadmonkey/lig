import React from 'react';
import { Link } from 'react-router-dom';
import HomeWrapper from '../../utilities/HomeWrapper/HomeWrapper';
import Cookies from 'js-cookie';

const Logout = () => {

    try {
        Cookies.remove('authorization');
    } catch (error) {
        return <h1>Logout Failed</h1>
    }

    return (
        <HomeWrapper>
            <div className="wrapper logout-container" style={{ position: "relative", textAlign: "center", height: "666px" }}>
                <div style={{ paddingTop: "200px" }}>
                    <h1 style={{ fontSize: "40px", fontWeight: "bold", margin: "40px 0" }}>Logout Successful</h1>
                    <Link to="/" className="link" style={{ fontSize: "20px", fontWeight: "bold" }}>BACK TO HOME</Link>
                </div>
            </div>
        </HomeWrapper >
    )
}

export default Logout
