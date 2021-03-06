import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { submitPasswordReset } from '../actions/userActions';
import { addError, clearErrors } from '../actions/errorActions';
import { convertQueryString } from '../utils/convertQueryString';
import { withRouter } from 'react-router-dom';

class PasswordReset extends React.Component {
    state = {
        password: '',
        password_confirmation: '',
    }

    handleOnChange = event => {
        const field = event.target.name
        let state = this.state
    
        state[field] = event.target.value
        this.setState(state)
    }
    
    handleOnSubmit = event => {
        event.preventDefault();

        if (this.state.password !== '' && this.state.password_confirmation !== '') {
            const email_and_token = convertQueryString(window.location.search)
            const user_data_to_update = Object.assign(this.state, email_and_token)
            
            this.props.submitPasswordReset(user_data_to_update , () => this.props.history.push('/'))
        } else {
            this.props.clearErrors()
            this.props.addError("All fields are required.")
        }
    }

    handleErrors = () => {
        if (this.props.errors.length > 0) { 
            setTimeout(this.props.clearErrors, 10000)
            return (
            this.props.errors.map(error => <li key={cuid()}>{error}</li>)
            )
        }
    }

    componentWillUnmount() {
        if (this.props.errors.length > 0) {
          this.props.clearErrors()
        }
    }

    render() {
        const { password, password_confirmation } = this.state;

        return (
            <Container>
                <Row className="justify-content-md-center frontPageRow">
                    <Col md={{ span: 8 }}>
                        <Form onSubmit={this.handleOnSubmit} className="password-reset">
                            <h1>Reset Your Password:</h1>
                            <ul>{this.handleErrors()}</ul>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={this.handleOnChange} />
                            </Form.Group>

                            <Form.Group controlId="formPasswordConfirmation">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password_confirmation" value={password_confirmation} onChange={this.handleOnChange} />
                            </Form.Group>

                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.user,
        errors: state.errors,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    submitPasswordReset,
    addError,
    clearErrors,
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordReset));