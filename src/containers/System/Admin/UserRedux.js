import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from '../../../utils/constant';
import * as actions from "../../../store/actions"
import "./UserRedux.scss"
import Lightbox from 'react-image-lightbox';
import '../../../../node_modules/react-image-lightbox/style.css';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        // return new Promise(async (resolve, reject) => {
        //     try {
        //         let res = await getAllcode2('gender');
        //         if (res && res.errCode === 0) {
        //             this.setState({
        //                 genderArr: res.data
        //             })
        //         } else {

        //         }
        //         resolve(res)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // })

        this.props.getGenderStart();
        this.props.getPotitionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })

        }
        if (prevProps.positionsRedux !== this.props.positionsRedux) {
            this.setState({
                positionArr: this.props.positionsRedux
            })

        }
    }
    handleOnchangeImage = (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl
            })
        }
    }
    openPreviewImg = () => {
        this.setState({
            isOpen: true
        })
    }
    render() {
        let genderss = this.state.genderArr
        let roleArr = this.state.roleArr
        let positionArr = this.state.positionArr
        let checklang = this.props.lang
        let isLoadingGender = this.props.isLoadingGender
        return (
            <div className='user-redux-container'>
                <div className='title'>CRUD react-redux with Eric</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><h4><FormattedMessage id='manage-user.add' /></h4></div>
                            <diV className='col-12'>{isLoadingGender === true ? 'Loading gender' : ''}</diV>
                            <div className='col-3'>
                                <lable>Email</lable>
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.password' /></lable>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.firstname' /></lable>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.lastname' /></lable>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.phonenumber' /></lable>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <lable><FormattedMessage id='manage-user.address' /></lable>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender' /></label>
                                <select className="form-control">
                                    {genderss && genderss.length > 0 &&
                                        genderss.map((item, index) => {
                                            return (
                                                <option key={index}>{checklang === languages.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className="form-control">
                                    {positionArr && positionArr.length > 0 &&
                                        positionArr.map((item, index) => {
                                            return (
                                                <option key={index}>{checklang === languages.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>RoleId</label>
                                <select className="form-control">
                                    {roleArr && roleArr.length > 0 &&
                                        roleArr.map((item, index) => {
                                            return (
                                                <option key={index}>{checklang === languages.VI ? item.valueVi : item.valueEn}</option>
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
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id='manage-user.confirm' /></button>
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
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionsRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPotitionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // switchVEAppRedux: (language) => dispatch(actions.switchVEApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
