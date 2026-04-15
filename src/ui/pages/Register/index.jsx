import './index.scss';

import Button from '../../components/Button'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { registerUserThunk, clearError } from '../../../ui/state/userState'

const Register = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.user);

    const getErrorMessage = (error) => {
        if (!error) return "";

        switch (error.status) {
            case 400:
                return "Please fill in all required fields.";
            case 401:
                return "Unauthorized request.";
            case 403:
                return "You are not allowed to register.";
            case 404:
                return "Service not found.";
            case 409:
                return "User already exists (email or username).";
            case 422:
                return "Invalid input. Please check your details.";
            case 500:
                return "Server error occurred. Please try again later.";
            default:
                return error.message || "Registration failed.";
        }
    };

    const [isSuccess, setIsSuccess] = useState(false);
    const [formError, setFormError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    // student
    const [studentID, setStudentID] = useState('');
    const [course, setCourse] = useState('');
    const [year, setYear] = useState('');
    const [department, setDepartment] = useState('');

    // staff
    const [title, setTitle] = useState('');
    const [officeLocation, setOfficeLocation] = useState('');

    // admin
    const [adminCode, setAdminCode] = useState('');

    const handleRegisterClick = async () => {
        dispatch(clearError());
        setFormError('');

        if (!name || !email || !password || !role) {
            setFormError("Please fill in all fields.");
            return;
        }

        let resultAction;

        if (role === "ADMIN") {
            if (!adminCode) {
                setFormError("Please fill in all fields.");
                return;
            }
            resultAction = await dispatch(registerUserThunk({
                role: role,
                credentials: {
                    name: name,
                    password: password,
                    email: email,
                    adminCode: adminCode
                }
            }));
        }
        if (role === "STAFF") {
            if (!department || !title || !officeLocation) {
                setFormError("Please fill in all fields.");
                return;
            }
            resultAction = await dispatch(registerUserThunk({
                role: role,
                credentials: {
                    name: name,
                    password: password,
                    email: email,
                    department: department,
                    title: title,
                    officeLocation: officeLocation
                }
            }));
        }
        if (role === "STUDENT") {
            if (!studentID || !course || !year || !department) {
                setFormError("Please fill in all fields.");
                return;
            }
            resultAction = await dispatch(registerUserThunk({
                role: role,
                credentials: {
                    name: name,
                    password: password,
                    email: email,
                    studentID: studentID,
                    course: course,
                    year: year,
                    department: department
                }
            }));
        }

        if (registerUserThunk.fulfilled.match(resultAction)) {
            setFormError("Login Success!")
            setIsSuccess(true);
            navigate('/login');
        } else {
            console.log(resultAction.payload);
            setIsSuccess(false);
        }
    };

    return (
        <div className="container register-page">
            <div className="text-zone">
                <h1>Register</h1>
                <div>
                    <select className="role-select"
                        name="role_input"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="" disabled>I am a...</option>
                        <option value="STUDENT">Student</option>
                        <option value="STAFF">Staff</option>
                        <option value="ADMIN">Admin</option>
                    </select> <br />

                    {role === "STUDENT" && (
                        <>
                            <input
                                type="text"
                                placeholder="Enter Student ID"
                                value={studentID}
                                onChange={(e) => setStudentID(e.target.value)}
                            /> <br />
                            <input
                                type="text"
                                placeholder="Enter Course"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            /> <br />
                            <input
                                type="number"
                                placeholder="Enter Year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            /> <br />
                            <input
                                type="text"
                                placeholder="Enter Department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            /> <br />
                        </>
                    )}

                    {role === "STAFF" && (
                        <>
                            <input
                                type="text"
                                placeholder="Enter Department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            /> <br />
                            <input
                                type="text"
                                placeholder="Enter Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            /> <br />
                            <input
                                type="text"
                                placeholder="Enter Office Location"
                                value={officeLocation}
                                onChange={(e) => setOfficeLocation(e.target.value)}
                            /> <br />
                        </>
                    )}

                    {role === "ADMIN" && (
                        <>
                            <input
                                type="text"
                                placeholder="Enter Admin Code"
                                value={adminCode}
                                onChange={(e) => setAdminCode(e.target.value)}
                            /> <br />
                        </>
                    )}

                    {role != "" && (
                        <>
                            <input
                                name="name_input"
                                type="text"
                                placeholder="Enter name"
                                value={name}
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
                        </>
                    )}
                    <p className={isSuccess ? "success" : "error"}>
                        {formError || getErrorMessage(error) || ""}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;