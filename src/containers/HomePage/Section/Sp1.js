
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import { getAllSpecialty } from '../../../services/userService';

class Sp1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty()
        console.log('check res', res)
        if (res && res.errCode === 0) {
            this.setState({
                data: res.data ? res.data : []
            })
        }
    }
    render() {
        let { data } = this.state
        return (
            <div className='section-Sp sp-1'>
                <div className='Sp-content'>
                    <div className='Sp-header'>
                        <span className='sp-title'><FormattedMessage id="homepage.specialty" /></span>
                        <button className='sp-btn'><FormattedMessage id="homepage.more" /></button>
                    </div>
                    {/* key={index} style={{ backgroundImage: `url(${item.image})` }} */}
                    <div className='Sp-body'>
                        <Slider {...this.props.settings}>
                            {data && data.length > 0 && data.map((item, index) => {
                                return (<div className='img-nude' key={index}><img src={item.image} />
                                    <p>{item.name}</p>
                                </div>)
                            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Sp1);
