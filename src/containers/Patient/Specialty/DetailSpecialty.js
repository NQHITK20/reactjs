import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import { FormattedMessage } from 'react-intl';
import HomeHeader from "../../HomePage/HomeHeader"
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [44, 45, 37]
        }
    }
    async componentDidMount() {

    }

    componentDidUpdate() {

    }
    render() {
        let { arrDoctorId } = this.state
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body' >
                    <div className='description-specialty' >
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
                                            // dataShit={dataShit}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
