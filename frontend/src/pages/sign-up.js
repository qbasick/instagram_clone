import {Route, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import "../styles/login.css";
import * as ROUTES from "../constants/routes";
import {register} from "../services/auth-service";

export default function Signup() {
    const history = useHistory();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    //const isValid = login || password;
    //Send post request to server
    //Implement after backend is done
    const handleLogin = (e) => {
        e.preventDefault();
        register(login, password)
            .then(() => history.push(ROUTES.LOGIN));
    };


    useEffect(() => {
            document.title = 'Sign-up - Instagram';
        },
        []);
    return (
        <div className="login-container">
            <div className="image-container">
                <img src="/images/iphone-with-profile.jpg" alt="iphone-image"/>
            </div>
            <div className="form-container">
                <img src="/images/logo.png"/>
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
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    )
}
