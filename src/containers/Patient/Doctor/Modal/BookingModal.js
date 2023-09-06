import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../../utils';
import { Modal } from 'reactstrap'
import ProfileDoctor from '../ProfileDoctor';
import { getProfileById } from '../../../../services/userService';
import _ from 'lodash';
class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async componentDidMount() {

    }

    componentDidUpdate() {

    }
    render() {
        let { isOpenModal, closeFuckingModal, dataShit } = this.props
        let doctorId = ''
        if (dataShit && !_.isEmpty(dataShit)) {
            doctorId = dataShit.doctorId
        }
        // let doctorId=dataShit && !_.isEmpty(dataShit) ?dataShit.doctorId:''
        console.log('check data form shjyy', this.props)
        return (
            <Modal isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span className='right' onClick={closeFuckingModal}><i className='fas fa-times' /></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataShit)} */}
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId={doctorId}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ tên</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ Email</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lý do khám</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Đặt cho ai</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <input className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'>Xác nhận</button>
                        <button className='btn-booking-cancel' onClick={closeFuckingModal}>Hủy</button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
