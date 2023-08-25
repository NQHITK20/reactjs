import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { languages } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast, Toast } from 'react-toastify';
import './ManageSchedule.scss'
import _, { result } from 'lodash';
import { saveBulkSchedule } from '../../../services/userService';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            dataTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleHourDoctor();
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props
        inputData.map((item, index) => {
            let object = {};
            object.label = language === languages.VI ? `${item.lastName} ${item.firstName}` : `${item.firstName} ${item.lastName}`
            object.value = item.id
            result.push(object)
        })
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctor !== this.props.listDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.listDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            console.log('check ...', this.props.dataTime)
            let data = this.props.dataTime
            if (data) {
                data.map(item => {
                    item.isSelected = false
                    return item
                })
            }
            this.setState({
                dataTime: data
            })
        }
    }
    handleChange = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    };
    handleOnchangeDatepicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (time) => {
        let { dataTime } = this.state
        if (dataTime && dataTime.length > 0) {
            let data = dataTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected
                return item
            })
            this.setState({
                dataTime: dataTime
            })
        }
    }
    handleSaveSchedule = async () => {
        let { dataTime, selectedDoctor, currentDate } = this.state
        let result = []
        if (!currentDate) {
            toast.error('Invalid date')
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('missing doctor')
            return;
        }
        let Formatdate = new Date(currentDate).getTime()
        if (dataTime && dataTime.length > 0) {
            let selectedTime = dataTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((item, index) => {
                    let object = {}
                    object.doctorId = selectedDoctor.value;
                    object.date = Formatdate;
                    object.timeType = item.keyMap;
                    result.push(object)
                })
            } else {
                toast.error('missing time range')
                return;
            }
        }
        let res = await saveBulkSchedule({
            arr: result,
            doctorId: selectedDoctor.value,
            Formatdate: Formatdate
        })
        if (res && res.errCode === 0) {
            toast.success('Lưu ok rồi')
        } else {
            toast.error('error save')
            console.log('check bug save', res)
        }
    }
    render() {
        let { dataTime } = this.state
        let { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        console.log('checkk shit', dataTime)
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-dr" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                onChange={this.handleOnchangeDatepicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {dataTime && dataTime.map((item, index) => {
                                return (
                                    <button
                                        className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'} key={index}
                                        onClick={() => this.handleClickBtnTime(item)}
                                    >
                                        {language === languages.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })}
                        </div>
                        <div className='col-12'>
                            <button
                                onClick={() => this.handleSaveSchedule()}
                                className='btn btn-primary btn-save-schedule'>
                                <FormattedMessage id="manage-schedule.save-info" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        listDoctor: state.admin.allDoctor,
        dataTime: state.admin.dataTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleHourDoctor: () => dispatch(actions.fetchAllScheduleHourDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
