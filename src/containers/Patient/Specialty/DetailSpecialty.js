import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from "../../HomePage/HomeHeader"
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialtyByid, getAllcode2 } from '../../../services/userService';
import _ from 'lodash';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            listProvince: [],
            dataDetailSpecialty: {},
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getAllDetailSpecialtyByid({
                id: id,
                location: 'ALL'
            })
            let resPro = await getAllcode2('PROVINCE')
            if (res && res.errCode === 0 && resPro && resPro.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataPro = resPro.data
                if (dataPro && dataPro.length > 0) {
                    dataPro.unshift({
                        createAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueVi: 'Toàn quốc',
                        valueEn: 'ALL',
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataPro ? dataPro : '',
                })
                console.log('check arrshit 1', arrDoctorId)

            }
        }

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevState.arrDoctorId !== this.state.arrDoctorId) {
        //     this.setState({
        //         arrDoctorId: this.state.arrDoctorId
        //     })
        // }
    }
    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let location = event.target.value

            let res = await getAllDetailSpecialtyByid({
                id: id,
                location: location
            })
            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
                console.log('check arrshit 2', arrDoctorId)
            }
        }
    }
    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state
        let { language } = this.props
        return (
            <>
                <HomeHeader />
                <div className='detail-specialty-container'>
                    <div className='description-specialty' >
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                            <div dangerouslySetInnerHTML={{
                                __html: dataDetailSpecialty.descriptionHtml
                            }}>
                            </div>
                        }
                    </div>
                    <div className='detail-specialty-body' >
                        <div className='search-sp-doctor'>
                            <select onChange={(event) => this.handleOnchangeSelect(event)}>
                                {listProvince && listProvince.length > 0 && listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className='each-doctor' key={index}>
                                        <div className='dt-content-left'>
                                            <div className='profile-doctor'>
                                                <ProfileDoctor
                                                    doctorId={item}
                                                    isShowDes={true}
                                                    isShowLinkDetail={true}
                                                    isShowPrice={false}
                                                />
                                            </div>
                                        </div>
                                        <div className='dt-content-right'>
                                            <div className='doctor-schedule'>
                                                <DoctorSchedule idFromParent={item} />
                                            </div>
                                            <div className='doctor-extra-info'>
                                                <DoctorExtraInfo idFromParent={item} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
