import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl'
import { languages } from '../../utils';
import { switchVEApp } from '../../store/actions';
import { withRouter } from 'react-router';

class HomeHeader extends Component {

    switchVE = (language) => {
        this.props.switchVEAppRedux(language)
    }
    returnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    render() {
        let language = this.props.lang;

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='header-logo' onClick={() => this.returnHome()}>
                                <i className="fas fa-bars"></i>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'><div><b><FormattedMessage id="home-header.shit1" /></b></div>
                                <div className='subtitle'>
                                    <FormattedMessage id="home-header.shit2" />
                                </div>
                            </div>
                            <div className='child-content'><div><b><FormattedMessage id="home-header.shit3" /></b></div>
                                <div className='subtitle'>
                                    <FormattedMessage id="home-header.shit4" />
                                </div>
                            </div>
                            <div className='child-content'><div><b><FormattedMessage id="home-header.shit5" /></b></div>
                                <div className='subtitle'>
                                    <FormattedMessage id="home-header.shit6" />
                                </div>
                            </div>
                            <div className='child-content'><div><b><FormattedMessage id="home-header.shit7" /></b></div>
                                <div className='subtitle'>
                                    <FormattedMessage id="home-header.shit8" />
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="far fa-question-circle">   <FormattedMessage id="home-header.shit9" /></i>
                            </div>
                            <div className={language === languages.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.switchVE(languages.VI)}>VN</span></div>
                            <div className={language === languages.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.switchVE(languages.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id="banner.t1" /></div>
                            <div className='title2'><FormattedMessage id="banner.t2" /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm bò lạc' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="far fa-hospital"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.t3" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-mobile"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.t4" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-procedures"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.t5" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-notes-medical"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.t6" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-smile"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.t7" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-cut"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.t8" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment >

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        switchVEAppRedux: (language) => dispatch(switchVEApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader))
