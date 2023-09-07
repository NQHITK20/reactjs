import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../../utils';
import { Modal } from 'reactstrap'
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from "../../../../store/actions"
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            genders: '',
            doctorId: '',
            timeType: '',
        }
    }
    buildDataGender = (data) => {
        let result = []
        let { language } = this.props
        if (data) {
            data.map(item => {
                let object = {}
                object.label = language === languages.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result
    }
    async componentDidMount() {
        this.props.getGender()
    }

    componentDidUpdate(prevProps, prevSate, snapshot) {
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataShit !== prevProps.dataShit) {
            if (this.props.dataShit && !_.isEmpty(this.props.dataShit)) {
                console.log('check datashit', this.props.dataShit)
                let doctorId = this.props.dataShit.doctorId
                let timeType = this.props.dataShit.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }

    }

    handleOnchangeDatepicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleOnchangeInput = (event, id) => {
        let inputValue = event.target.value
        let stateCopy = { ...this.state }
        stateCopy[id] = inputValue
        this.setState({
            ...stateCopy
        })
    }
    handleChangeSelectGender = (selectedGender) => {
        this.setState({
            selectedGender: selectedGender
        })
    }
    handleConfirmFucking = async () => {
        //validate input
        let date = new Date(this.state.birthday).getTime()

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
        })
        if (res && res.errCode === 0) {
            toast.success('booking a new appointment success!')
            this.props.closeFuckingModal()
        } else {
            toast.error('booking a new appointment falied!')
        }
        console.log('lọt khe', this.state)
    }
    render() {
        let { isOpenModal, closeFuckingModal, dataShit } = this.props
        let doctorId = ''
        if (dataShit && !_.isEmpty(dataShit)) {
            doctorId = dataShit.doctorId
        }

        console.log('check state', this.state)
        return (
            <Modal isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id='patient.booking-modal.title' /></span>
                        <span className='right' onClick={closeFuckingModal}><i className='fas fa-times' /></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataShit)} */}
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDes={false}
                                dataShit={dataShit}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.fullname' /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.phonenumber' /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.email' /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatepicker}
                                    className="form-control"
                                    value={this.state.birthday}
                                // minDate={yesterday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.sex' /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelectGender}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm' onClick={() => this.handleConfirmFucking()}><FormattedMessage id='patient.booking-modal.confirm' /></button>
                        <button className='btn-booking-cancel' onClick={closeFuckingModal}><FormattedMessage id='patient.booking-modal.cancel' /></button>
                    </div>
                </div>
            </Modal>
        );
    }
}


const mapStateToProps = state => {
    return {
        genders: state.admin.genders,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
