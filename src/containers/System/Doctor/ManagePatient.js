import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';

class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: new Date()
        }
    }
    async componentDidMount() {

    }

    componentDidUpdate() {

    }
    handleOnchangeDatepicker = () => {

    }
    render() {
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
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row"></td>
                                    <td>3</td>
                                    <td>4</td>
                                </tr>
                                <tr>
                                    <td scope="row"></td>
                                    <td>5</td>
                                    <td>6</td>
                                </tr>
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
        language: state.app.language


    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
