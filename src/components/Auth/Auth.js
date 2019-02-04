import React, { Component } from 'react';
import { isLoggedIn } from '../../services/auth';
import Login from '../Login';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
        }
    }

    changeLoginState(isLogged) {
        this.setState(() => ({
            login: isLogged
        }));
    }

    componentDidMount() {
        this.setState({
            login: !!isLoggedIn()
        })
    }

    render() {
        if (this.props.needsAuth && !this.state.login) {
            return (
                <Login changeLoginState={this.changeLoginState.bind(this)} />
            );
        }

        return this.props.children;
    }
}

export default Auth;