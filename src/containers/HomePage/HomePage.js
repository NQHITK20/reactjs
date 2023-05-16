import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Sp2 from './Section/Sp2';
import Sp1 from './Section/Sp1';
import Sp3 from './Section/Sp3';
import Sp4 from './Section/Sp4';
import "./HomePage.scss"
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

    render() {
        let settings = {
            dots: false,
            Infinite: true,
            speed: 800,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div>
                <HomeHeader />
                <Sp1 settings={settings} />
                <Sp2 settings={settings} />
                <Sp3 settings={settings} />
                <Sp4 settings={settings} />
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
