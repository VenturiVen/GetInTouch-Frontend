import './index.scss';

import Button from '../../components/Button'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginUserThunk, clearError } from '../../../service/user/userSlice'

const Login = () => {
    const dispatch = useDispatch();

    const [isSuccess, setIsSuccess] = useState(false);
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [formError, setFormError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getErrorMessage = (error) => {
        if (!error) return "";

        switch (error.status) {
            case 401:
                return "User does not exist or password is incorrect.";
            case 403:
                return "Access denied.";
            case 404:
                return "User not found.";
            case 500:
                return "Server error occurred.";
            default:
                return error.message || "Login failed.";
        }
    };

    const handleLoginClick = async () => {
        dispatch(clearError());
        setFormError('');

        if (!email || !password) {
            setFormError("Please fill in all fields.");
            return;
        }

        const resultAction = await dispatch(loginUserThunk({ email, password }));

        if (loginUserThunk.fulfilled.match(resultAction)) {
            setFormError("Login Success!")
            setIsSuccess(true);
            navigate('/')
        } else {
            console.log(resultAction.payload);
            setIsSuccess(false);
        }
    };

    return (
        <div className="container login-page">
            <div className="text-zone">
                <h1>Login</h1>
                <div>
                    <input
                        name="email_input"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> <br />
                    <input
                        name="password_input"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /> <br />
                    <Button
                        label={loading ? "Logging in..." : "Login"}
                        className="login-btn"
                        onClick={handleLoginClick}
                    />
                    <p className={isSuccess ? "success" : "error"}>
                        {formError || getErrorMessage(error) || ""}
                    </p>
                    <p className="Register-Text" >Don't have an account?</p>
                    <Button
                        label="Register"
                        className="login-btn"
                        onClick={() => navigate('/register')}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;