// app
import React from 'react';

// components
import { ReactComponent as LogoLight } from '../../images/logo-light.svg';
import { ReactComponent as Up } from '../../images/up.svg';

// styles
import './Footer.css';

const Footer = () => {

    function doScrolling(duration, element) {
        let diff = 0 - window.pageYOffset
        // Easing function: easeInOutCubic
        // From: https://gist.github.com/gre/1650294
        let easing = function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }, start;
        if (!diff) return
        window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp
            let time = timestamp - start
            let percent = Math.min(time / 1000, 1)
            percent = easing(percent)
            window.scrollTo(0, window.pageYOffset + diff * percent)
            if (time < 1000) window.requestAnimationFrame(step)
        })
    }

    return (
        <div className="footer-container">
            <div className="info">
                <div className="wrapper">
                    <LogoLight className="footer-logo" />
                    <p>サンプルテキストサンプル ルテキストサンプルテキストサンプルテキストサンプル ルテキスト</p>
                    <button onClick={() => doScrolling()}><Up /><br />TOP</button>
                </div>
            </div>
            <div className="copyright">
                <span className="wrapper">Copyright©2007-2019 Blog Inc.</span>
            </div>
        </div>
    )
}

export default Footer
