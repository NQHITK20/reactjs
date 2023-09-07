import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, CRUD_ACTIONS } from '../../../utils/constant';
import { CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions"
import "./UserRedux.scss"
import Lightbox from 'react-image-lightbox';
import '../../../../node_modules/react-image-lightbox/style.css';
import { createNewUSer } from '../../../store/actions';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            editUserId: ''
        }
    }

    async componentDidMount() {

        this.props.getGenderStart();
        this.props.getPotitionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;

            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })

        }
        if (prevProps.positionsRedux !== this.props.positionsRedux) {
            let arrPosition = this.props.positionsRedux;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrRole = this.props.roleRedux;
            let arrPosition = this.props.positionsRedux;
            let arrGenders = this.props.genderRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing input this litle  ' + arrCheck[i]);
                break;
            }
        }
        return isValid
    }
    openPreviewImg = () => {
        this.setState({
            isOpen: true
        })
    }


    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;

        //fire redux action

        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUSer({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                image: this.state.image,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUserRedux({
                id: this.state.editUserId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                image: this.state.image,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

    }


    onChaneInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        // email: '',
        //     password: '',
        //     firstName: '',
        //     lastName: '',
        //     phoneNumber: '',
        //     address: '',
        //     gender: '',
        //     position: '',
        //     role: '',
        //     avatar: ''
    }

    handleEditUserFromParent = (user) => {

        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString()
        }
        this.setState({
            email: user.email,
            password: 'HARDCORE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.position,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            editUserId: user.id
        })
    }
    render() {
        let genderss = this.state.genderArr
        let roleArr = this.state.roleArr
        let positionArr = this.state.positionArr
        let checklang = this.props.lang
        let isLoadingGender = this.props.isLoadingGender

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title'>CRUD react-redux with Eric</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><h4>{this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id='manage-user.editadd' /> : <FormattedMessage id='manage-user.add' />}</h4></div>
                            <diV className='col-12'>{isLoadingGender === true ? 'Loading gender' : ''}</diV>
                            <div className='col-3'>
                                <lable>Email</lable>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onChaneInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.password' /></lable>
                                <input className='form-control' type={this.state.action === CRUD_ACTIONS.EDIT ? 'password' : 'text'}
                                    value={password}
                                    onChange={(event) => { this.onChaneInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.firstname' /></lable>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => { this.onChaneInput(event, 'firstName') }}
                                />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.lastname' /></lable>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => { this.onChaneInput(event, 'lastName') }}
                                />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.phonenumber' /></lable>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChaneInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className='col-9'>
                                <lable><FormattedMessage id='manage-user.address' /></lable>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onChaneInput(event, 'address') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender' /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChaneInput(event, 'gender') }}
                                    value={gender}
                                >
                                    {genderss && genderss.length > 0 &&
                                        genderss.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{checklang === languages.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChaneInput(event, 'position') }}
                                    value={position}
                                >
                                    {positionArr && positionArr.length > 0 &&
                                        positionArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{checklang === languages.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>RoleId</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChaneInput(event, 'role') }}
                                    value={role}
                                >
                                    {roleArr && roleArr.length > 0 &&
                                        roleArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{checklang === languages.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.avatar' /></label>
                                <div className='preview-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                        onClick={() => this.openPreviewImg()}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fa fa-upload"></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                    ></div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id='manage-user.edit' /> : <FormattedMessage id='manage-user.confirm' />}
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionsRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPotitionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUSer: (data) => dispatch(actions.createNewUSer(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data))



        // processLogout: () => dispatch(actions.processLogout()),
        // switchVEAppRedux: (language) => dispatch(actions.switchVEApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
