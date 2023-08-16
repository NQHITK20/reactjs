import React, { Component } from 'react';
import { connect } from "react-redux";
import Home from '../../../routes/Home';
import HomeHeader from '../../HomePage/HomeHeader';

class detailDoctor extends Component {

    render() {
        console.log(this.props.match.params.id)
        return (
            <div>
                <HomeHeader isShowBanner={false} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        systemMenuPath: state.app.systemMenuPath

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(detailDoctor);
