import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';
class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: {}
        }
    }
    async componentDidMount() {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        this.getDataPatient(user, formatedDate)
    }
    getDataPatient = async (user, formatedDate) => {

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
    componentDidUpdate() {

    }
    handleOnchangeDatepicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props
            let { currentDate } = this.state
            let formatedDate = new Date(currentDate).getTime()
            this.getDataPatient(user, formatedDate)
        })
    }
    handleConfirm = () => {

    }
    handleRemedy = () => {

    }
    render() {
        console.log('check state', this.state)
        let { dataPatient } = this.state
        return (
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
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.timeTypeDataPatient.valueVi}</td>
                                            <td>{item.patientData.firstName}</td>
                                            <td>{item.patientData.address}</td>
                                            <td>{item.patientData.genderData.valueVi}</td>
                                            <td>
                                                <div className='buton-control'>
                                                    <button className='btn btn-primary' onClick={() => this.handleConfirm()}>Xác nhận</button>
                                                    <button className='btn btn-secondary' onClick={() => this.handleRemedy()}>Gửi hóa đơn</button>
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
