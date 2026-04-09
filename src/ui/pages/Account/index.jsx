import './index.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../../service/user/userSlice";
import { getUserThunk, clearError } from '../../../service/user/userSlice'
import { roles } from '../../../repo/constants/role'

import Button from '../../components/Button';

const Account = () => {
    const { token, currentUser } = useSelector((state) => state.user);

    const [profile, setProfile] = useState(null);

    const { error } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formError, setFormError] = useState('');
    const roleName = currentUser?.role?.replace('ROLE_', '');

    const getErrorMessage = (error) => {
        if (!error) return "";

        if (!error.status) {
            return "Unable to connect to server.";
        }

        switch (error.status) {
            case 401:
                return "Session expired. Please log in again.";
            case 403:
                return "You don't have permission to access this.";
            case 404:
                return "User not found.";
            case 500:
                return "Server error occurred.";
            default:
                return error.message || "Failed to load user account data.";
        }
    };

    useEffect(() => {
        const loadUser = async () => {
            console.log("token: ", token);
            dispatch(clearError());
            setFormError('');
            console.log("running loaduser");
            if (token) {
                const resultAction = await dispatch(getUserThunk());
                console.log("token OK!");
                if (getUserThunk.fulfilled.match(resultAction)) {
                    console.log("thunk: ", resultAction.payload);
                    setProfile(resultAction.payload);
                } else {
                    console.log(resultAction.payload);
                }
            }
        };
        loadUser();
    }, [token, dispatch]);

    return (
        <div className="container account-page">
            <div className="text-zone">
                <h1>Account</h1>

                <dl className="user-details">
                    <div>
                        <dt>Name:</dt>
                        <dd>{profile?.name ?? "Null"}</dd>
                    </div>
                    <div>
                        <dt>Email:</dt>
                        <dd>{currentUser?.sub ?? "Null"}</dd>
                    </div>
                    <div>
                        <dt>Role:</dt>
                        <dd>{roleName ?? "Null"}</dd>
                    </div>
                    {roleName === roles.STUDENT ? (
                        <>
                            <div>
                                <dt>Student ID:</dt>
                                <dd>{profile?.studentId ?? "Null"}</dd>
                            </div>
                            <div>
                                <dt>Course:</dt>
                                <dd>{profile?.course ?? "Null"}</dd>
                            </div>
                            <div>
                                <dt>Year:</dt>
                                <dd>{profile?.year ?? "Null"}</dd>
                            </div>
                            <div>
                                <dt>Department:</dt>
                                <dd>{profile?.department ?? "Null"}</dd>
                            </div>
                        </>
                    ) : roleName === roles.STAFF ? (
                        <>
                            <div>
                                <dt>Office:</dt>
                                <dd>{profile?.officeLocation ?? "Null"}</dd>
                            </div>
                            <div>
                                <dt>Title:</dt>
                                <dd>{profile?.title ?? "Null"}</dd>
                            </div>
                            <div>
                                <dt>Department:</dt>
                                <dd>{profile?.department ?? "Null"}</dd>
                            </div>
                        </>
                    ) : roleName === roles.ADMIN ? (
                        <>

                        </>
                    ) : (
                        <>
                            <p>Role not found or not known.</p>
                        </>
                    )}
                </dl>

                <p className="error">
                    {formError || getErrorMessage(error) || ""}
                </p>

                <Button
                    label="Logout"
                    className="logout-btn"
                    onClick={() => {
                        dispatch(logout());
                        navigate('/');
                    }}
                />
            </div>
        </div>
    );
};

export default Account;