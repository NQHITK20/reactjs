import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DefaultClass.scss'
import { FormattedMessage } from 'react-intl';
class DefaultClass extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async componentDidMount() {

    }

    componentDidUpdate() {

    }
    render() {

        return (
            <div>shit</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.languages


    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
