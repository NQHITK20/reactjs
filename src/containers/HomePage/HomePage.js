import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Sp2 from './Section/Sp2';
import Sp1 from './Section/Sp1';
import Sp3 from './Section/Sp3';
import Sp4 from './Section/Sp4';
import About from './Section/About';
import Footer from './Section/Footer';
import "./HomePage.scss"
import "../../../node_modules/slick-carousel/slick/slick.css"
import "../../../node_modules/slick-carousel/slick/slick-theme.css"


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#c2d5dda6", width: "48px", height: "48px", zIndex: "10", top: "85px", right: "-13px" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#c2d5dda6", width: "48px", height: "48px", zIndex: "10", top: "85px" }}
            onClick={onClick}
        />

    );
}
class HomePage extends Component {
    // handleAfterChange = (event, slick, currentSlice) => {
    //     console.log('check change', currentSlice)
    // }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 800,
            slidesToShow: 4,
            slidesToScroll: 2,
            // afterChange: this.handleAfterChange(),
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Sp1 settings={settings} />
                <Sp2 settings={settings} />
                <Sp3 settings={settings} />
                <Sp4 settings={settings} />
                <About />
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
