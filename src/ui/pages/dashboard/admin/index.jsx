import './index.scss';

import Button from '../../../components/Button'

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserThunk, clearError } from '../../../state/userState';

const AdminDashboard = () => {

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);

    const choices = {
        DELETE: 'DELETE'
    };

    const getErrorMessage = (error) => {
        if (!error) return "";

        switch (error.status) {
            case 400:
                return "Please fill in all required fields.";
            case 401:
                return "Unauthorized request.";
            case 403:
                return "You are not allowed to perform this action.";
            case 404:
                return "Service not found.";
            case 422:
                return "Invalid input. Please check your details.";
            case 500:
                return "Server error occurred. Please try again later.";
            default:
                return error.message || "Action failed.";
        }
    };

    const [action, setAction] = useState('');
    const [email, setEmail] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const [formError, setFormError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleConfirmClick = async () => {
        dispatch(clearError());
        setFormError('');

        if (!confirmation || !email) {
            setFormError("Please fill in all fields.");
            return;
        }

        if (!(email === confirmation)) {
            setFormError("Email and Confirmation Mismatch.");
            return;
        }

        let resultAction;

        if (action === choices.DELETE) {
            console.log(email);
            resultAction = await dispatch(deleteUserThunk({
                email: email
            }));
        }

        if (deleteUserThunk.fulfilled.match(resultAction)) {
            setIsSuccess(true);
            setFormError("Action Complete!");
        } else {
            console.log(resultAction.payload);
        };
    }

    return (
        <div className="container adminDashboard">
            <div className="text-zone">
                <h1>Admin Dashboard</h1>
                <div>
                    <select className="action-select"
                        name="action-select"
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                    >
                        <option value="" disabled>I want to...</option>
                        <option value={choices.DELETE}>Delete A User</option>
                    </select> <br />


                    {action === choices.DELETE && (
                        <>
                            <input
                                name="email_input"
                                type="email"
                                placeholder="Enter User's Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            /> <br />
                            <input
                                name="confirm_input"
                                type="email"
                                placeholder="Confirm email"
                                value={confirmation}
                                onChange={(e) => setConfirmation(e.target.value)}
                            /> <br />
                        </>
                    )}

                    {(formError || error) && (
                        <p className={isSuccess ? "success" : "error"}>
                            {formError || getErrorMessage(error)}
                        </p>
                    )}

                    {action != "" && (
                        <Button
                            label={loading ? "Running..." : "Confirm"}
                            className="confirm-btn"
                            onClick={handleConfirmClick}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
