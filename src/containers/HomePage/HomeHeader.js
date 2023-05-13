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
                                <i className="far fa-question-circle">   Hỗ trợ</i>
                            </div>
                            <div className='language-vi'>VN</div>
                            <div className='language-en'>EN</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm trai cu bự' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="far fa-hospital"></i></div>
                                <div className='text-child'>Khám chuyên khoa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-mobile"></i></div>
                                <div className='text-child'>Khám từ xa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-procedures"></i></div>
                                <div className='text-child'>Khám tổng quát</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-notes-medical"></i></div>
                                <div className='text-child'>Xét nghiệm y học </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-smile"></i></div>
                                <div className='text-child'>Sức khỏe tinh thần </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i class="fas fa-cut"></i></div>
                                <div className='text-child'>Khám trym</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >

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
