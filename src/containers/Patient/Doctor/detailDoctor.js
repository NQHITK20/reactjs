import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import Home from '../../../routes/Home';
import HomeHeader from '../../HomePage/HomeHeader';
import './detailDoctor.scss'
import { getInfoDoctor } from '../../../services/userService';
import { languages } from '../../../utils';

class detailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {}
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getInfoDoctor(id)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }

        }

    }

    componentDidUpdate() {

    }
    render() {
        console.log('check state', this.state)
        let { detailDoctor } = this.state
        let { lang } = this.props
        let nameVi = '', nameEn = ''
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }

        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'  >
                        <div className='content-left' style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}   >
                        </div>
                        <div className='content-right'>
                            <div className='up'>{lang === languages.VI ? nameVi : nameEn}</div>
                            <div className='down'>
                                {detailDoctor && detailDoctor.markdown && detailDoctor.markdown.description &&
                                    <span>
                                        {detailDoctor.markdown.description}
                                    </span>}
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='detail-info-doctor'>
                        {detailDoctor && detailDoctor.markdown && detailDoctor.markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{
                                __html: detailDoctor.markdown.contentHTML
                            }}>
                            </div>}
                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        systemMenuPath: state.app.systemMenuPath,
        lang: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(detailDoctor);
