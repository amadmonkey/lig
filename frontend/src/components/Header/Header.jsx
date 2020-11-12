// app
import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

// components
import { ReactComponent as Logo } from '../../images/logo.svg';

// data
import _ROUTES from "../../routes.js";

// style
import './Header.css';

const Header = () => {
    const location = useLocation();
    let route;

    for (let key in _ROUTES) {
        if (`/${location.pathname.split('/')[1]}` === `/${_ROUTES[key].path.split('/')[1]}`) {
            route = _ROUTES[key];
        }
    }

    const getLink = () => {
        switch (location.pathname) {
            default:
            case "/":
                if (!Cookies.get('authorization') || Cookies.get('authorization') === 'undefined')
                    return <Link to="/login" className="link header-button">LOGIN</Link>
                else
                    return <Link to="/logout" className="link header-button">LOGOUT</Link>
            case "/logout":
                return <Link to="/login" className="link header-button">LOGIN</Link>
            case "/login":
            case "/register":
                return <Link to="/" className="link header-button">CLOSE</Link>
        }
    }

    return (
        <Fragment>
            <div className="wrapper header-container">
                <Link to="/"><Logo style={{ cursor: "pointer" }} /></Link>
                {getLink()}
            </div>
            {
                route.hasBreadcrumbs &&
                <div className="breadcrumbs-container jp">
                    <div className="wrapper breadcrumbs">
                        <Link to="/" className="link">Home</Link><span style={{ margin: "17px" }}>&gt;</span><Link to="/create-post" className="link">{route.label}</Link>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Header
