import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss'
import { languages } from '../../../utils';
import { getExtraInfoById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowCuInfo: false,
            exTraInfo: {}
        }
    }

    async componentDidMount() {
        if (this.props.idFromParent) {
            let res = await getExtraInfoById(this.props.idFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    exTraInfo: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevSate, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.idFromParent !== prevProps.idFromParent) {
            let res = await getExtraInfoById(this.props.idFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    exTraInfo: res.data
                })
            }
        }
    }
    showCuinfo = (status) => {
        this.setState({
            isShowCuInfo: status
        })
    }
    render() {
        let { isShowCuInfo, exTraInfo } = this.state
        let { language } = this.props
        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='address'><FormattedMessage id='patient.extra-info-doctor.text-address' /></div>
                    <div className='name-clinic'>{exTraInfo && exTraInfo.nameClinic ? exTraInfo.nameClinic : ''}</div>
                    <div className='detail-address'>{exTraInfo && exTraInfo.addressClinic ? exTraInfo.addressClinic : ''}</div>
                </div>
                <div className='content-down'>
                    {isShowCuInfo === false &&
                        <div className='hidden-cu'><FormattedMessage id='patient.extra-info-doctor.price' /> :{exTraInfo && exTraInfo.priceData && language === languages.VI &&
                            <NumberFormat className='currency' value={exTraInfo.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={' VND'} />}
                            {exTraInfo && exTraInfo.priceData && language === languages.EN &&
                                <NumberFormat className='currency' value={exTraInfo.priceData.valueEn} displayType={'text'} thousandSeparator={true} suffix={' $'} />}
                            <span className='shitspan' onClick={() => this.showCuinfo(true)}> <FormattedMessage id='patient.extra-info-doctor.detail' /></span> </div>
                    }
                    {isShowCuInfo === true &&
                        <>
                            <div className='title-price'><FormattedMessage id='patient.extra-info-doctor.detail' /></div>
                            <div className='detail-shit'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id='patient.extra-info-doctor.price' /> : </span>
                                    <span className='right'>{exTraInfo && exTraInfo.priceData && language === languages.VI &&
                                        <NumberFormat className='currency' value={exTraInfo.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={' VND'} />}
                                        {exTraInfo && exTraInfo.priceData && language === languages.EN &&
                                            <NumberFormat className='currency' value={exTraInfo.priceData.valueEn} displayType={'text'} thousandSeparator={true} suffix={' $'} />}</span>
                                </div>
                                <div className='note'>{exTraInfo && exTraInfo.note ? exTraInfo.note : ''}</div>
                            </div>
                            <div className='payment'><FormattedMessage id='patient.extra-info-doctor.payment' /> :
                                {exTraInfo && exTraInfo.paymentData && language === languages.VI
                                    ? exTraInfo.paymentData.valueVi : ''}
                                {exTraInfo && exTraInfo.paymentData && language === languages.EN
                                    ? exTraInfo.paymentData.valueEn : ''}</div>
                            <div className='hide-price'><span onClick={() => this.showCuinfo(false)}><FormattedMessage id='patient.extra-info-doctor.hide' /></span></div>
                        </>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
