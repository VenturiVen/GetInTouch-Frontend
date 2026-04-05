import { useState } from 'react';
import './CreateSlotModal.scss';

const CreateSlotModal = ({ onClose, onCreate }) => {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const isValid = date !== '' && startTime !== '' && endTime !== '' && endTime > startTime;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleCreate = () => {
        // TODO: call POST /api/slots with { date, startTime, endTime } when backend is ready
        onCreate({ date, startTime, endTime });
        onClose();
    };

    return (
        <div className="create-slot-modal__overlay" onClick={handleOverlayClick}>
            <div className="create-slot-modal">
                <div className="create-slot-modal__header">
                    <h2 className="create-slot-modal__title">Create Availability Slot</h2>
                    <button className="create-slot-modal__close" onClick={onClose}>✕</button>
                </div>

                <div className="create-slot-modal__fields">
                    <div className="create-slot-modal__field">
                        <label className="create-slot-modal__label" htmlFor="slot-date">Date</label>
                        <input
                            id="slot-date"
                            type="date"
                            className="create-slot-modal__input"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className="create-slot-modal__row">
                        <div className="create-slot-modal__field">
                            <label className="create-slot-modal__label" htmlFor="slot-start">Start Time</label>
                            <input
                                id="slot-start"
                                type="time"
                                className="create-slot-modal__input"
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                            />
                        </div>

                        <div className="create-slot-modal__field">
                            <label className="create-slot-modal__label" htmlFor="slot-end">End Time</label>
                            <input
                                id="slot-end"
                                type="time"
                                className="create-slot-modal__input"
                                value={endTime}
                                onChange={e => setEndTime(e.target.value)}
                            />
                        </div>
                    </div>

                    {endTime && startTime && endTime <= startTime && (
                        <p className="create-slot-modal__error">End time must be after start time.</p>
                    )}
                </div>

                <div className="create-slot-modal__actions">
                    <button className="create-slot-modal__cancel-btn" onClick={onClose}>Cancel</button>
                    <button
                        className="create-slot-modal__create-btn"
                        onClick={handleCreate}
                        disabled={!isValid}
                    >
                        Create Slot
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateSlotModal;
