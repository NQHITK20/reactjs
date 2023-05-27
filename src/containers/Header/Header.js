import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { languages } from "../../utils/constant"

class Header extends Component {
    switchVE = (language) => {
        this.props.switchVEAppRedux(language)
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className='languages'>
                    <span className='welcum'><FormattedMessage id="home-header.welcum" /> {userInfo && userInfo.firstName ? userInfo.firstName : ''}</span>
                    <span className={language === languages.VI ? 'language-vi active' : 'language-vi'}
                        onClick={() => this.switchVE(languages.VI)}>VN</span>
                    <span className={language === languages.EN ? 'language-en active' : 'language-en'}
                        onClick={() => this.switchVE(languages.EN)}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        switchVEAppRedux: (language) => dispatch(actions.switchVEApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
