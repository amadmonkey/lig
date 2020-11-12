import React from 'react';

// components
import HomeWrapper from '../../utilities/HomeWrapper/HomeWrapper';
import Carousel from '../../utilities/Carousel/Carousel';

const Home = () => {
    return (
        <HomeWrapper>
            <div className="home-container">
                <Carousel />
            </div>
        </HomeWrapper>
    )
}

export default Home
