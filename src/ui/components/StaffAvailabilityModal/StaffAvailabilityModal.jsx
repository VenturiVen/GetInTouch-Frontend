import { useState, useEffect } from 'react';
import API from '../../../infra/api/axios';
import { GET_STAFF_TIMESLOTS } from '../../../infra/constants/apiEndpoints';
import './StaffAvailabilityModal.scss';

const formatDate = (dt) =>
    new Date(dt).toLocaleDateString('en-IE', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });

const formatTime = (dt) =>
    new Date(dt).toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit', hour12: false });

const StaffAvailabilityModal = ({ staff, onClose, onBook }) => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!staff) return;
        setLoading(true);
        API.get(GET_STAFF_TIMESLOTS(staff.id))
            .then(r => {
                const now = new Date();
                setSlots(r.data.filter(s => !s.booked && new Date(s.endTime) > now));
            })
            .catch(() => setSlots([]))
            .finally(() => setLoading(false));
    }, [staff]);

    if (!staff) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="availability-modal__overlay" onClick={handleOverlayClick}>
            <div className="availability-modal">
                <div className="availability-modal__header">
                    <div>
                        <h2 className="availability-modal__name">{staff.name}</h2>
                        <p className="availability-modal__department">{staff.department}</p>
                    </div>
                    <button className="availability-modal__close" onClick={onClose}>✕</button>
                </div>

                <h3 className="availability-modal__subtitle">Available Slots</h3>

                <div className="availability-modal__slots">
                    {loading && <p className="availability-modal__empty">Loading slots...</p>}

                    {!loading && slots.length === 0 && (
                        <p className="availability-modal__empty">No available slots.</p>
                    )}

                    {!loading && slots.map(slot => {
                        const date = formatDate(slot.startTime);
                        const startTime = formatTime(slot.startTime);
                        const endTime = formatTime(slot.endTime);

                        return (
                            <div key={slot.id} className="availability-modal__slot">
                                <div className="availability-modal__slot-info">
                                    <span className="availability-modal__slot-date">{date}</span>
                                    <span className="availability-modal__slot-time">
                                        {startTime} – {endTime}
                                    </span>
                                </div>
                                <button
                                    className="availability-modal__book-btn"
                                    onClick={() => onBook(staff, { id: slot.id, date, startTime, endTime })}
                                >
                                    Book
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StaffAvailabilityModal;
