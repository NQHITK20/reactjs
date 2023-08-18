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


const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!


class manageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctor: [],
            hasOldData: false,
            action: ''
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor()
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
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.listDoctor)
            this.setState({
                listDoctor: dataSelect
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
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })

    }
    handleChange = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await getInfoDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.markdown) {
            let markdown = res.data.markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
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
        if (res.data.markdown.description && res.data.markdown.contentMarkdown && res.data.markdown.contentHTML) {
            this.setState({
                hasOldData: true
            })
        }
        console.log('check opt', res)
    };
    handleDesc = (event) => {
        this.setState({
            description: event.target.value,
        })
    }
    render() {
        console.log('check state', this.state)
        let { hasOldData } = this.state
        return (
            < div className='manage-doctor-container' >
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin bác sĩ
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctor}
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label>Thông tin giới thiệu</label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleDesc(event)}
                            value={this.state.description}
                        ></textarea>
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
                    {hasOldData === true ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}
                </button>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listDoctor: state.admin.allDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctors(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(manageDoctor);

