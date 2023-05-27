
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'



class About extends Component {

    render() {

        return (
            <div className='section-Sp about'>
                <div className='section-about-header'>
                    <h1>Truyền thông nói gì về Dr.Johnny Sins</h1>
                    <div className='section-about-content'>
                        <div className='about-left'>
                            <iframe
                                width="55%" height="400px"
                                src="https://www.youtube.com/embed/J59y_WWDWwo"
                                title="Câu Chuyện Cảm Động Về Huyền Thoại Johnny Sins"
                                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                            gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                        <div className='about-left'></div>
                    </div>
                </div>
            </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
