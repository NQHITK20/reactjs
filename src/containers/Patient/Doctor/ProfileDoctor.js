import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { FormattedMessage } from 'react-intl';
import { getProfileById } from '../../../services/userService';
import { languages } from '../../../utils';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';


class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        let data = await this.getInfodoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }
    getInfodoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    componentDidUpdate(prevProps, preSate, snapshot) {

    }
    renderTimeBooking = (data) => {
        let { language } = this.props
        if (data && !_.isEmpty(data)) {
            let time = language === languages.VI ? data.timeTypeData.valueVi : data.timeTypeData.valueEn
            let date = language === languages.VI ?
                moment.unix(+data.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+data.date / 1000).format('dddd - MM/DD/YYYY')
            // moment.unix(+data.dat / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{time} - {date} </div>
                    <div><FormattedMessage id='patient.booking-modal.intro' /></div>
                </>
            )
        }
        return <></>
    }
    render() {
        let { dataProfile } = this.state
        let { language, isShowDes, dataShit, isShowLinkDetail, isShowPrice, doctorId } = this.props
        let nameVi = '', nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left' style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}   >
                    </div>
                    <div className='content-right'>
                        <div className='up'>{language === languages.VI ? nameVi : nameEn}</div>
                        {isShowDes === true ?
                            <>
                                <div className='down'>
                                    {dataProfile && dataProfile.markdown && dataProfile.markdown.description &&
                                        <span>
                                            {dataProfile.markdown.description}
                                        </span>}
                                </div>
                            </>
                            :
                            <>
                                {this.renderTimeBooking(dataShit)}
                            </>
                        }
                    </div>
                </div>
                {isShowLinkDetail === true && <div className='view-detail-doctor'>
                    <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                </div>}
                {isShowPrice === true &&
                    <div className='price'><FormattedMessage id='patient.booking-modal.price' />:

                        {dataProfile && dataProfile.doctor_info && language === languages.VI ?
                            dataProfile.doctor_info.priceData.valueVi + ' VND' : ''}
                        {dataProfile && dataProfile.doctor_info && language === languages.EN ?
                            dataProfile.doctor_info.priceData.valueEn + ' $' : ''}
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
