import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss'
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from "../../HomePage/HomeHeader"
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailClinicByid, getAllcode2 } from '../../../services/userService';
import _ from 'lodash';

class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getAllDetailClinicByid({
                id: id,
            })
            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
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
    render() {
        let { arrDoctorId, dataDetailClinic } = this.state
        console.log('check datashitt', dataDetailClinic)
        let { language } = this.props
        return (
            <>
                <HomeHeader />
                <div className='detail-specialty-container'>
                    <div className='description-specialty' >
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                            <>
                                <div>
                                    {dataDetailClinic.name}
                                </div>
                                <div dangerouslySetInnerHTML={{
                                    __html: dataDetailClinic.descriptionHtml
                                }}>
                                </div>
                            </>
                        }
                    </div>
                    <div className='detail-specialty-body' >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
