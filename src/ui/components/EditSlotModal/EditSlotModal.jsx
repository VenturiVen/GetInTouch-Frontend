import { useState } from 'react';
import './EditSlotModal.scss';

const EditSlotModal = ({ slot, onClose, onEdit }) => {
    const [date, setDate] = useState(slot.date);
    const [startTime, setStartTime] = useState(slot.startTime);
    const [endTime, setEndTime] = useState(slot.endTime);

    const isValid = date !== '' && startTime !== '' && endTime !== '' && endTime > startTime;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleSave = () => {
        // TODO: call PUT /api/slots/:id with { date, startTime, endTime } when backend is ready
        onEdit(slot.id, { date, startTime, endTime });
        onClose();
    };

    return (
        <div className="edit-slot-modal__overlay" onClick={handleOverlayClick}>
            <div className="edit-slot-modal">
                <div className="edit-slot-modal__header">
                    <h2 className="edit-slot-modal__title">Edit Slot</h2>
                    <button className="edit-slot-modal__close" onClick={onClose}>✕</button>
                </div>

                <div className="edit-slot-modal__fields">
                    <div className="edit-slot-modal__field">
                        <label className="edit-slot-modal__label" htmlFor="edit-slot-date">Date</label>
                        <input
                            id="edit-slot-date"
                            type="date"
                            className="edit-slot-modal__input"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className="edit-slot-modal__row">
                        <div className="edit-slot-modal__field">
                            <label className="edit-slot-modal__label" htmlFor="edit-slot-start">Start Time</label>
                            <input
                                id="edit-slot-start"
                                type="time"
                                className="edit-slot-modal__input"
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                            />
                        </div>

                        <div className="edit-slot-modal__field">
                            <label className="edit-slot-modal__label" htmlFor="edit-slot-end">End Time</label>
                            <input
                                id="edit-slot-end"
                                type="time"
                                className="edit-slot-modal__input"
                                value={endTime}
                                onChange={e => setEndTime(e.target.value)}
                            />
                        </div>
                    </div>

                    {endTime && startTime && endTime <= startTime && (
                        <p className="edit-slot-modal__error">End time must be after start time.</p>
                    )}
                </div>

                <div className="edit-slot-modal__actions">
                    <button className="edit-slot-modal__cancel-btn" onClick={onClose}>Cancel</button>
                    <button
                        className="edit-slot-modal__save-btn"
                        onClick={handleSave}
                        disabled={!isValid}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditSlotModal;
