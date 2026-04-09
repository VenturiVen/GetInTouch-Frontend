import { useState } from 'react';
import API from '../../../infra/api/axios';
import { BOOK_TIMESLOT } from '../../../repo/constants/apiEndpoints';
import './BookingModal.scss';

const BookingModal = ({ staff, slot, onClose, onConfirm }) => {
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!staff || !slot) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleConfirm = () => {
        setLoading(true);
        setError(null);
        API.patch(BOOK_TIMESLOT(slot.id))
            .then(() => {
                onConfirm({ staff, slot, note });
            })
            .catch(err => {
                console.error('Failed to book slot:', err);
                setError('Failed to book slot. Please try again.');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="booking-modal__overlay" onClick={handleOverlayClick}>
            <div className="booking-modal">
                <div className="booking-modal__header">
                    <h2 className="booking-modal__title">Confirm Booking</h2>
                    <button className="booking-modal__close" onClick={onClose}>✕</button>
                </div>

                <div className="booking-modal__details">
                    <p className="booking-modal__staff">{staff.name}</p>
                    <p className="booking-modal__slot">{slot.date} &nbsp;·&nbsp; {slot.startTime} – {slot.endTime}</p>
                </div>

                <div className="booking-modal__note-section">
                    <label className="booking-modal__label" htmlFor="booking-note">
                        Leave a note for {staff.name.split(' ')[0]} {staff.name.split(' ')[2]}
                    </label>
                    <textarea
                        id="booking-note"
                        className="booking-modal__textarea"
                        placeholder="Briefly describe the purpose of your meeting..."
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        rows={4}
                    />
                </div>

                {error && <p className="booking-modal__error">{error}</p>}

                <div className="booking-modal__actions">
                    <button className="booking-modal__cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="booking-modal__confirm-btn"
                        onClick={handleConfirm}
                        disabled={note.trim() === '' || loading}
                    >
                        {loading ? 'Booking...' : 'Confirm Booking'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
