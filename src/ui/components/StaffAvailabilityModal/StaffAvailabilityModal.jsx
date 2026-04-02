import './StaffAvailabilityModal.scss';

// TODO: replace with API call to GET /api/staff/:id/slots when backend is ready
const mockSlots = [
    { id: 1, date: 'Monday, 7 Apr 2026', startTime: '09:00', endTime: '09:30' },
    { id: 2, date: 'Monday, 7 Apr 2026', startTime: '10:00', endTime: '10:30' },
    { id: 3, date: 'Tuesday, 8 Apr 2026', startTime: '14:00', endTime: '14:30' },
    { id: 4, date: 'Tuesday, 8 Apr 2026', startTime: '15:00', endTime: '15:30' },
    { id: 5, date: 'Wednesday, 9 Apr 2026', startTime: '11:00', endTime: '11:30' },
    { id: 6, date: 'Thursday, 10 Apr 2026', startTime: '13:00', endTime: '13:30' },
];

const StaffAvailabilityModal = ({ staff, onClose, onBook }) => {
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
                    {mockSlots.map(slot => (
                        <div key={slot.id} className="availability-modal__slot">
                            <div className="availability-modal__slot-info">
                                <span className="availability-modal__slot-date">{slot.date}</span>
                                <span className="availability-modal__slot-time">
                                    {slot.startTime} – {slot.endTime}
                                </span>
                            </div>
                            {/* TODO: open booking modal (US-ST03) */}
                            <button
                                className="availability-modal__book-btn"
                                onClick={() => onBook(staff, slot)}
                            >
                                Book
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StaffAvailabilityModal;
