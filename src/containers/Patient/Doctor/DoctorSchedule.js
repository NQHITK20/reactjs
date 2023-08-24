import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getScheduleDoctor } from '../../../services/userService';
import { languages } from '../../../utils';

class doctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
        }
    }
    setArrDays = (language) => {
        let allDayszz = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === languages.VI) {
                let laybeovei = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                object.label = this.inHoa(laybeovei)
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')

            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDayszz.push(object)
        }

        this.setState({
            allDays: allDayszz
        })
    }
    async componentDidMount() {
        let { language } = this.props
        this.setArrDays(language)
    }

    componentDidUpdate(prevProps, preSate, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language)
        }
    }
    onChangeSelect = async (event) => {
        if (this.props.idFromParent && this.props.idFromParent !== -1) {
            let id = this.props.idFromParent
            let date = event.target.value
            let res = await getScheduleDoctor(id, date)
            let allTime = []
            if (res && res.errCode == -0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
            console.log('check res', res)
        }
    }
    inHoa(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    render() {
        let { allDays, allAvailableTime } = this.state
        let { language } = this.props
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.onChangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (<option value={item.value} key={index}>
                                    {item.label}
                                </option>)
                            })
                        }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calender'>
                        <i className='fas fa-calendar-alt'><span>Lịch khám</span></i>
                    </div>
                    <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length > 0 ?
                            allAvailableTime.map((item, index) => {
                                let shit = language === languages.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                return (
                                    <button key={index}>{shit}</button>
                                )
                            }) : <div>FUCKKKKKKKK TIME</div>
                        }
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(doctorSchedule);
