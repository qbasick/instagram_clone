import {Route, useHistory} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import "../styles/login.css";
import * as ROUTES from "../constants/routes";
import DatabaseContext from "../context/database";

export default function Login() {
    const history = useHistory();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {signIn} = useContext(DatabaseContext);
    //const isValid = login || password;
    //Send post request to server
    //Implement after backend is done
    const handleLogin = (e) => {
        e.preventDefault();
        signIn(login, password);
        history.push(ROUTES.DASHBOARD);
    };

    const redirectToRegister = () => {
        //document.location.href = '/sign-up';
        history.push(ROUTES.SIGN_UP);
    }

    useEffect(() => {
            document.title = 'Login - Instagram';
        },
        []);
    return (
        <div className="login-container">
            <div className="image-container">
                <img src="/images/iphone-with-profile.jpg" alt="iphone-image"/>
            </div>
            <div className="form-container">
                <div className="form-image-container">
                <img src="/images/logo.png"/>
                </div>
                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        onChange={e => {
                            setLogin(e.target.value);
                        }}
                        type="text"
                        placeholder="Login"
                        className="login-field"
                    />
                    <input
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        placeholder="Password"
                        className="password-field"
                    />
                    <button type="submit">
                        Login
                    </button>
                </form>
                <button onClick={redirectToRegister} style={{backgroundColor: 'green'}}>
                    Register
                </button>
            </div>
        </div>
    )
}
