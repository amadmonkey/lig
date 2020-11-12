import React from 'react';
import News from '../../components/News/News';

const HomeWrapper = (props) => {
    return (
        <div className="home-wrapper">
            {props.children}
            <div className="wrapper">
                <News />
            </div>
        </div>
    )
}

export default HomeWrapper
