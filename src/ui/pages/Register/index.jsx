import './index.scss';

import Button from '../../components/Button'

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.user);

    const [formError, setFormError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegisterClick = () => {
        // dispatch(clearError());
        setFormError('');

        if (!name || !email || !password) {
            setFormError("Please fill in all fields.");
            return;
        }

        return;
        // dispatch(login({ email, password }));
    };

    return (
        <div className="container register-page">
            <div className="text-zone">
                <h1>Register</h1>
                <div>
                    <input
                        name="name_input"
                        type="text"
                        placeholder="Enterd name"
                        value={email}
                        onChange={(e) => setName(e.target.value)}
                    /> <br />
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
                        label={loading ? "Registering..." : "Register"}
                        className="register-btn"
                        onClick={handleRegisterClick}
                    />
                    <p className="error">{formError || error || ""}</p>
                </div>
            </div>
        </div>
    );
}

export default Register;