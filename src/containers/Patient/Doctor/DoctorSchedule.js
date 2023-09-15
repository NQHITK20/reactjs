import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getScheduleDoctor } from '../../../services/userService';
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';


class doctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataShit: {}
        }
    }
    setArrDays = (language) => {
        let allDayszz = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === languages.VI) {
                if (i === 0) {
                    let laybeoshittvei = moment(new Date()).format('DD/MM')
                    laybeoshittvei = this.inHoa(laybeoshittvei)
                    let today = `Hôm nay - ${laybeoshittvei}`
                    object.label = today
                }
                else {
                    let laybeovei = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.inHoa(laybeovei)
                }
            } else {
                if (i === 0) {
                    let lay = moment(new Date()).format('DD/MM')
                    let today = `Today - ${lay}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd-DD/MM')
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('days').valueOf()
            allDayszz.push(object)

        }
        return allDayszz
    }
    async componentDidMount() {
        let { language } = this.props
        let allShit = this.setArrDays(language)
        this.setState({
            allDays: allShit,
        })
        if (this.props.idFromParent) {
            let res = await getScheduleDoctor(this.props.idFromParent, allShit[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, preSate, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allShit = this.setArrDays(this.props.language)
            this.setState({
                allDays: allShit
            })
        }
        if (this.props.allAvailableTime !== prevProps.allAvailableTime) {
            this.setState({
                allAvailableTime: this.props.allAvailableTime
            })
        }
        if (this.props.idFromParent !== prevProps.idFromParent) {
            let allShit = this.setArrDays(this.props.language)
            let res = await getScheduleDoctor(this.props.idFromParent, allShit[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }

    }
    onChangeSelect = async (event) => {
        if (this.props.idFromParent && this.props.idFromParent !== -1) {
            let id = this.props.idFromParent
            let date = event.target.value
            let res = await getScheduleDoctor(id, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }
    inHoa(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataShit: time
        })
    }
    closeFuckingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataShit } = this.state
        let { language } = this.props
        return (
            <>
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
                            <i className='fas fa-calendar-alt'><span><FormattedMessage id='patient.detail-doctor.schedule' /></span></i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {allAvailableTime.map((item, index) => {
                                            let shit = language === languages.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return (
                                                <button key={index}
                                                    className={language === languages.VI ? 'btn-vn' : 'btn btn-en'}
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >{shit}</button>
                                            )

                                        })}
                                    </div>

                                    <div className='book-free'>
                                        <FormattedMessage id='patient.detail-doctor.choose' /> <i className='far fa-hand-point-up' /><FormattedMessage id='patient.detail-doctor.andfuckfree' />
                                    </div>
                                </>
                                :
                                <div className='no-schedule'><FormattedMessage id='patient.detail-doctor.fucktime' /></div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeFuckingModal={this.closeFuckingModal}
                    dataShit={dataShit}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(doctorSchedule);
