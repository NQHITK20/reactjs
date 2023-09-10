import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.scss'
import HomeHeader from "../HomePage/HomeHeader"
import { postVerifyBookAppointment } from '../../services/userService';


class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParam = new URLSearchParams(this.props.location.search)
            let token = urlParam.get('token')
            let doctorId = urlParam.get('doctorId')
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                })
            }
        }

    }

    componentDidUpdate() {

    }
    render() {
        let { statusVerify, errCode } = this.state
        return (
            <div className='verify-email-container'>
                <HomeHeader />
                {statusVerify === false ? <div>Loading data...</div> :
                    <div>{errCode === 0 ? <div className='info-booking'>Xác nhận lịch hẹn thành công!</div> : <div className='info-booking'>Lịch hẹn đã xác nhận hoặc không tồn tại!</div>}</div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
