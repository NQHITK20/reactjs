import React, { Component } from 'react';
import { connect } from 'react-redux';
import './manageDoctor.scss'
import * as actions from "../../../store/actions"
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import "./manageDoctor.scss";
import { CRUD_ACTIONS, languages } from '../../../utils/constant';
import 'react-markdown-editor-lite/lib/index.css';
import { getInfoDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';


const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!


class manageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown tb
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctor: [],
            hasOldData: false,
            action: '',


            //save to doctor_info tb
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectPrice: '',
            selectPayment: '',
            selectProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.getRequiredDoctorInfo()
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.lastName} ${item.firstName}`
                    object.label = language === languages.VI ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} vnđ`
                    let labelEn = `${item.valueEn} USD`
                    object.label = language === languages.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`
                    object.label = language === languages.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctor !== this.props.listDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.listDoctor, 'USERS')
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.listDoctor, 'USERS')
            let { resPrice, resPayment, resProvince } = this.props.data
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
        if (prevProps.data !== this.props.data) {
            let { resPrice, resPayment, resProvince } = this.props.data
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')

            console.log('checkdd data new', dataSelectPrice, dataSelectPayment, dataSelectProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectPrice: this.state.selectPrice.value,
            selectPayment: this.state.selectPayment.value,
            selectProvince: this.state.selectProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        })

    }
    handleChange = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince } = this.state
        let res = await getInfoDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.markdown) {
            let markdown = res.data.markdown

            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '',
                selectPayment = '', selectPrice = '', selectProvince = ''

            if (res.data.doctor_info) {
                addressClinic = res.data.doctor_info.addressClinic
                nameClinic = res.data.doctor_info.nameClinic
                note = res.data.doctor_info.note
                paymentId = res.data.doctor_info.paymentId
                priceId = res.data.doctor_info.priceId
                provinceId = res.data.doctor_info.provinceId


                selectPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectPayment: selectPayment,
                selectPrice: selectPrice,
                selectProvince: selectProvince
            })
        }
        if (!res.data.markdown.contentHTML) {
            this.setState({
                contentHTML: '',
                hasOldData: false
            })
        }
        if (!res.data.markdown.contentMarkdown) {
            this.setState({
                contentMarkdown: '',
                hasOldData: false
            })
        }
        if (!res.data.markdown.description) {
            this.setState({
                description: '',
                hasOldData: false
            })
        }
        if (!res.data.doctor_info.addressClinic) {
            this.setState({
                addressClinic: '',
                hasOldData: false
            })
        }
        if (!res.data.doctor_info.nameClinic) {
            this.setState({
                nameClinic: '',
                hasOldData: false
            })
        }
        if (!res.data.doctor_info.note) {
            this.setState({
                note: '',
                hasOldData: false
            })
        }
        if (!res.data.doctor_info.paymentId) {
            this.setState({
                paymentId: '',
                hasOldData: false
            })
        }
        if (!res.data.doctor_info.priceId) {
            this.setState({
                priceId: '',
                hasOldData: false
            })
        }
        if (!res.data.doctor_info.provinceId) {
            this.setState({
                provinceId: '',
                hasOldData: false
            })
        }
        if (res.data.markdown.description && res.data.markdown.contentMarkdown && res.data.markdown.contentHTML
            && res.data.doctor_info.addressClinic && res.data.doctor_info.nameClinic && res.data.doctor_info.note
            && res.data.doctor_info.paymentId && res.data.doctor_info.priceId && res.data.doctor_info.provinceId) {
            this.setState({
                hasOldData: true
            })
        }
    };
    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name
        let copyState = { ...this.state }
        copyState[stateName] = selectedOption
        this.setState({
            ...copyState
        })
        console.log('check new shit', selectedOption, stateName)
    }
    handleDesc = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState,
        })
    }
    render() {
        let { hasOldData } = this.state
        console.log('check state', this.state)
        return (
            < div className='manage-doctor-container' >
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.title2" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctor}
                            placeholder={<FormattedMessage id="admin.manage-doctor.title2" />}
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.title3" /></label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleDesc(event, 'description')}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.shit1" /></label>
                        <Select
                            value={this.state.selectPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.shit1" />}
                            name='selectPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.shit2" /></label>
                        <Select
                            value={this.state.selectPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.shit2" />}
                            name='selectPayment'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.shit3" /></label>
                        <Select
                            value={this.state.selectProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.shit3" />}
                            name='selectProvince'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.shit4" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleDesc(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.shit5" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleDesc(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.shit6" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleDesc(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}>
                    {hasOldData === true ? <span><FormattedMessage id="admin.manage-doctor.save" /></span> : <span><FormattedMessage id="admin.manage-doctor.create" /></span>}
                </button>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listDoctor: state.admin.allDoctor,
        data: state.admin.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctors(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(manageDoctor);

