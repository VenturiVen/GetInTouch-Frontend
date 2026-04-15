import './index.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUserThunk, clearError } from "../../../ui/state/userState";
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

    useEffect(() => {
        const loadUser = async () => {
            dispatch(clearError());
            setFormError('');
            if (token) {
                const resultAction = await dispatch(getUserThunk());
                if (getUserThunk.fulfilled.match(resultAction)) {
                    setProfile(resultAction.payload);
                } else {
                    navigate('/');
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