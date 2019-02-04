import WeDeploy from 'wedeploy/build/browser/api-min';
import { Nothing } from 'nothing-mock';

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
    isBrowser() && window.localStorage.getItem("gatsbyUser")
        ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
        : {};

const setUser = user => window.localStorage.setItem("gatsbyUser", JSON.stringify(user));

const auth = isBrowser() ? WeDeploy.auth(process.env.WEDEPLOY_AUTH_SERVICE_URL).auth(process.env.WEDEPLOY_MASTER_TOKEN) : Nothing;

export const handleLogin = ({ email, password }) => {
    if (!isLoggedIn()) {
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(email, password)
            .then(({ data_: { createdAt, email, id, token } }) => {
                setUser({
                    createdAt: createdAt,
                    email: email,
                    id: id,
                    token: token,
                });
                resolve();
            })
            .catch((e) => {
                reject(alert(e.error_description));
            });
        })
    }
}

export const handleSignUp = ({email, password}) => {
    if (!isLoggedIn()) {
        return new Promise((resolve, reject) => {
            auth.createUser({
                email: email,
                password: password
            })
            .then((user) => {
                resolve();
            })
            .catch((err) => {
                reject(alert(err));
            });
        });
    }
}

export const isLoggedIn = () => {
    return !!auth.currentUser;
}

export const logout = () => {
    setUser({});
    auth
        .signOut()
        .then(function () {
            alert('User is signed out!');
        })
        .catch(function (err) {
            alert(err);
        });
}