import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, sendRemedy } from '../../../services/userService';
import moment from 'moment';
import { languages } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: {},
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }
    async componentDidMount() {
        this.getDataPatient()
    }
    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataPatient !== this.props.dataPatient) {
            this.setState({
                dataPatient: this.props.dataPatient
            })
        }
    }
    handleOnchangeDatepicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }
    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            dataModal: data,
            isOpenRemedyModal: true
        })
    }
    closeFuckingModal = () => {
        this.setState({
            dataModal: {},
            isOpenRemedyModal: false
        })
    }
    sendRemedy = async (data) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true
        })
        let res = await sendRemedy({
            // ...data,
            imgBase64: data.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            email: data.email,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('send nude thành công')
            await this.getDataPatient()
            this.closeFuckingModal()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('send dick feo cmnr')
            console.log('error', res)
        }
    }
    render() {
        console.log('check state', this.state)
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state
        let { language } = this.props
        return (
            <>
                <div className='manage-patient-container'>
                    <div className='manage-patient-title'>
                        Quản lý bệnh nhân khám bệnh
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                onChange={this.handleOnchangeDatepicker}
                                className="form-control"
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='table-manage-patient col-12'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Họ và tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPatient && dataPatient.length > 0 ? dataPatient.map((item, index) => {
                                        let gender = language === languages.EN ? item.patientData.genderData.valueEn : item.patientData.genderData.valueVi
                                        let time = language === languages.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{time}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{gender}</td>
                                                <td>
                                                    <div className='buton-control'>
                                                        <button className='btn btn-primary' onClick={() => this.handleConfirm(item)}>Xác nhận</button>
                                                    </div>
                                                </td>
                                            </tr>)
                                    })
                                        : <>
                                            <tr>
                                                no data
                                            </tr>
                                        </>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <RemedyModal
                    isOpenModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeFuckingModal={this.closeFuckingModal}
                    sendRemedy={this.sendRemedy}
                />
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading fuck scene...'
                >
                </LoadingOverlay>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
