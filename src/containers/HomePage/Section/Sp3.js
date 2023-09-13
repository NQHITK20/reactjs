
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import Slider from 'react-slick';
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions'
import { languages } from '../../../utils/constant';
import { withRouter } from 'react-router';

class Sp3 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctor !== this.props.topDoctor) {
            this.setState({
                arrDoctor: this.props.topDoctor
            })
        }
    }
    componentDidMount() {
        this.props.fetchTopDoctor()
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }
    render() {
        let arrDoctor = this.state.arrDoctor
        let { lang } = this.props
        console.log('check shit 22', arrDoctor)
        // arrDoctor = arrDoctor.concat(arrDoctor).concat(arrDoctor)
        return (
            <div className='section-Sp sp-3'>
                <div className='Sp-content'>
                    <div className='Sp-header'>
                        <span className='sp-title'><FormattedMessage id="homepage.best-doc" /></span>
                        <button className='sp-btn'><FormattedMessage id="homepage.more" /></button>
                    </div>
                    <div className='Sp-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctor && arrDoctor.length > 0 && arrDoctor.map((item, index) => {
                                let imageBase64 = ''
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString()
                                }
                                let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`
                                let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`
                                return (
                                    <div className='img-nude set-1'><img src={imageBase64} className="imgg" key={index} onClick={() => this.handleViewDetailDoctor(item)} />
                                        <p>{lang === languages.VI ? nameVi : nameEn}</p>
                                        <b></b><p>Master deegree in healthy activities</p></div>
                                )
                            })
                            }
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
        topDoctor: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sp3))
