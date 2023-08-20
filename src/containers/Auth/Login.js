import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

import adminService from '../../services/adminService';
import { handlerLoginApi } from '../../services/userService';
import { Label } from 'reactstrap';
import e from 'cors';
import { userLoginLotkhe } from '../../store/actions/userActions'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isEye: false,
            errMessage: ''
        }
    }
    handleOnchangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handlerLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode == 0) {
                this.props.userLoginLotkhe(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            // this.setState({
            //     errMessage: e.message
            // })
        }
    }
    handlerEyes = () => {
        this.setState({
            isEye: !this.state.isEye
        })
    }
    handKeydown = (event) => {
        console.log('check event', event)
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin()
        }
    }
    render() {
        //jsx
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input type='text' className='form-control'
                                value={this.state.username}
                                onChange={(event) => this.handleOnchangeUsername(event)}
                                placeholder='Enter your username'
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isEye ? 'text' : 'password'}
                                    className='form-control'
                                    onChange={(event) => { this.handleOnchangePassword(event) }}
                                    placeholder='Enter your password'
                                    onKeyDown={(event) => this.handKeydown(event)}
                                />
                                <span onClick={() => { this.handlerEyes() }}>


                                    <i className={this.state.isEye ? 'far fa-eye' : 'far fa-eye-slash'}></i>

                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>or Login with</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginLotkhe: (userInfo) => dispatch(actions.userLoginLotkhe(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
