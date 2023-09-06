import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { FormattedMessage } from 'react-intl';
import { getProfileById } from '../../../services/userService';
import { languages } from '../../../utils';
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
    render() {
        let { dataProfile } = this.state
        let { lang } = this.props
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
                        <div className='up'>{lang === languages.VI ? nameVi : nameEn}</div>
                        <div className='down'>
                            {dataProfile && dataProfile.markdown && dataProfile.markdown.description &&
                                <span>
                                    {dataProfile.markdown.description}
                                </span>}
                        </div>
                    </div>
                </div>
                <div className='price'>
                    {/* {dataProfile && dataProfile.doctor_info && lang === languages.VI ?
                        dataProfile.doctor_info.priceData.valueVi : ''} */}
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.languages

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
