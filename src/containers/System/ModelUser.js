
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleff();
    }

    handleOnchangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let check = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                check = false
                alert('missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return check
    }
    handleAddNewUser = () => {
        let check = this.checkValidateInput();
        if (check === true) {
            //call api create
            this.props.createNewUser(this.state)
        }
    }


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen} togle={() => { this.toggle() }} className={'ModalContainer'}
                size="lg"
            >

                <ModalHeader togle={() => { this.toggle() }}>
                    Create new user
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' onChange={(event) => { this.handleOnchangeInput(event, "email") }} value={this.state.email} />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' onChange={(event) => { this.handleOnchangeInput(event, "password") }} value={this.state.password} />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text' onChange={(event) => { this.handleOnchangeInput(event, "firstName") }} value={this.state.firstName} />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type='text' onChange={(event) => { this.handleOnchangeInput(event, "lastName") }} value={this.state.lastName} />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' onChange={(event) => { this.handleOnchangeInput(event, "address") }} value={this.state.address} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' className='px-3' onClick={() => { this.handleAddNewUser() }}> Confirm</Button>{' '}
                    <Button color='secondary' className='px-3' onClick={() => { this.toggle() }}> Close</Button>
                </ModalFooter>
            </Modal>

        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



