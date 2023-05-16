
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import Slider from 'react-slick';
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import anh from "../../../assets/specialty/anh.jpg"


class Sp4 extends Component {

    render() {

        return (
            <div className='section-Sp sp-4'>
                <div className='Sp-content'>
                    <div className='Sp-header'>
                        <span className='sp-title'>Cẩm nang</span>
                        <button className='sp-btn'>XEM THÊM</button>
                    </div>
                    <div className='Sp-body'>
                        <Slider {...this.props.settings}>
                            <div className='img-nude'><img src={anh} /><p>best doctor</p></div>
                            <div className='img-nude'><img src={anh} /><p>best doctor</p></div>
                            <div className='img-nude'><img src={anh} /><p>best doctor</p></div>
                            <div className='img-nude'><img src={anh} /><p>best doctor</p></div>
                            <div className='img-nude'><img src={anh} /><p>best doctor</p></div>
                            <div className='img-nude'><img src={anh} /><p>best doctor</p></div>
                        </Slider>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sp4);
