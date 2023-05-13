import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
class HomeHeader extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='header-logo'>
                                <i className="fas fa-bars"></i>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'><div><b>Chuyên Khoa</b></div>
                                <div className='subtitle'>
                                    Tìm bác sĩ theo chuyên khoa
                                </div>
                            </div>
                            <div className='child-content'><div><b>Cơ sở y tế</b></div>
                                <div className='subtitle'>
                                    Chọn bệnh viện phòng khám
                                </div>
                            </div>
                            <div className='child-content'><div><b>Bác sĩ</b></div>
                                <div className='subtitle'>
                                    Chọn bác sĩ giỏi
                                </div>
                            </div>
                            <div className='child-content'><div><b>Gói khám</b></div>
                                <div className='subtitle'>
                                    Khám sức khỏe tổng quát
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="far fa-question-circle">Hỗ trợ</i>
                            </div>
                            <div className='flag'>VN</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='title1'>NỀN TẢNG Y TẾ</div>
                    <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                    <div className='search'></div>
                    <div className='options'></div>
                </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
