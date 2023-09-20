import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss'
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import _ from 'lodash';
import Select from 'react-select';
import { toast } from 'react-toastify';
import moment from 'moment';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: ''
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
    async componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                dataModal: this.props.dataModal
            })
        }
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    handleOnchangeEmail = (event) => {

    }


    render() {
        let { isOpenModal, closeFuckingModal, dataModal, sendRemedy } = this.props
        console.log('check state2', this.state)
        return (
            <Modal isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered >
                <div className='modal-header'>
                    <h5 className='modal-title'>gửi hóa đơn đ* thành công</h5>
                    <button type='button' className='close' aria-label='Close' onClick={closeFuckingModal}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <span>Email bệnh nhân</span>
                            <input className='form-control' type='email' value={dataModal.email}
                                onChange={(event) => this.handleOnchangeEmail(event)}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <span>Chọn file hóa đơn</span>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleOnchangeImage(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={() => this.handleSendRemedy()}>Fuck st</Button>
                    <Button color='secondary' onClick={closeFuckingModal}>Cancel</Button>
                </ModalFooter>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
