import React, {Component} from 'react';
import { handleLogin, handleSignUp} from '../../services/auth'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleUpdate = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    _handleSignUp = (event) => {
        event.preventDefault();

        handleSignUp(this.state).then(() => {
            this.props.changeLoginState(true);
        }).catch(() => {
            this.props.changeLoginState(false);
        });
    }

    _handleSubmit = (event) => {
        event.preventDefault();

        handleLogin(this.state).then(() => {
            this.props.changeLoginState(true);
        }).catch(() => {
            this.props.changeLoginState(false);
        });
    }

    render() {
        return (
            <>
                <div className="login">
                    <div className="clay-site-container container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="sheet">
                                    <div className="sheet-header">
                                        <h2 className="sheet-title">Login</h2>
                                    </div>
                                    <form method="post" onSubmit={event => {
                                        this._handleSubmit(event);
                                    }}>
                                        <div className="form-group">
                                            <label htmlFor="basicInputTypeEmail">Email</label>
                                            <input className="form-control" autoComplete="email" type="email" name="email" onChange={this.handleUpdate} id="basicInputTypeEmail" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="basicInputTypePassword">Password</label>
                                            <input className="form-control" autoComplete="current-password" id="basicInputTypePassword" onChange={this.handleUpdate} placeholder="Enter password" name="password" type="password" />
                                        </div>
                                        <div className="form-group">
                                            <div className="btn-group">
                                                <div className="btn-group-item">
                                                    <button className="btn btn-primary" type="submit">Submit</button>
                                                </div>
                                                <div className="btn-group-item">
                                                    <a className="btn btn-secondary" onClick={(event) => {
                                                        this._handleSignUp(event);
                                                    }} href="#no">Sign Up</a>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login;