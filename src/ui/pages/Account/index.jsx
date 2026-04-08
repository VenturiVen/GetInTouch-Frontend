import './index.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../../service/user/userSlice";
import { fetchUser } from '../../../service/user/userService';

import Button from '../../components/Button';

const Account = () => {
    const { token, currentUser } = useSelector((state) => state.user);

    const [profile, setProfile] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roleName = currentUser?.role?.replace('ROLE_', '');

    useEffect(() => {
        const loadUser = async () => {
            if (token && roleName) {
                console.log("role: ", roleName);
                const data = await fetchUser(roleName, token);
                setProfile(data);
            }
        };

        loadUser();
    }, [token, roleName]);

    return (
        <div className="container account-page">
            <div className="text-zone">
                <h1>Account</h1>

                <dl className="user-details">
                    <div>
                        <dt>Name:</dt>
                        <dd>{profile?.name || "Loading..."}</dd>
                    </div>
                    <div>
                        <dt>Email:</dt>
                        <dd>{currentUser?.sub || "Null"}</dd>
                    </div>
                    <div>
                        <dt>Role:</dt>
                        <dd>{currentUser?.role || "Null"}</dd>
                    </div>
                </dl>

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