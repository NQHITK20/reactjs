
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import Slider from 'react-slick';
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';

class Sp2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinic: []

        }
    }
    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }
    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }
    render() {
        let { dataClinic } = this.state
        return (
            <div className='section-Sp sp-2'>
                <div className='Sp-content'>
                    <div className='Sp-header'>
                        <span className='sp-title'>Cơ sở y tế nổi bật</span>
                        <button className='sp-btn'>XEM THÊM</button>
                    </div>
                    <div className='Sp-body'>
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 && dataClinic.map((item, index) => {
                                return (
                                    <div className='img-nude' key={index} onClick={() => this.handleViewDetailClinic(item)}><img src={item.image} /><p>{item.name}</p></div>
                                )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sp2));
