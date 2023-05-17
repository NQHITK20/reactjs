
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'



class Footer extends Component {

    render() {

        return (
            <div className='footer'>
                <p>&copy; 2023 nqhit.More info click here <a target='_blank' href='https://github.com/NQHITK20/frontend-learning-react'>Click me</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
