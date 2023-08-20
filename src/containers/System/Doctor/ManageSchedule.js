import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { languages } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import './ManageSchedule.scss'


class DoctorSchedule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            today: '',
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
            this.setState({
                dataTime: this.props.dataTime
            })
        }
    }
    handleChange = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    };
    handleOnchangeDatepicker = (date) => {
        this.setState({
            today: date[0]
        })
    }
    render() {
        console.log('check state', this.state)
        let { dataTime } = this.props
        let { language } = this.props
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
                                value={this.state.today}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {dataTime && dataTime.map((item, index) => {
                                return (
                                    <button className='btn' key='index'>
                                        {language === languages.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'><FormattedMessage id="manage-schedule.save-info" /></button>
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
