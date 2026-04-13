import './BookedSlotCard.scss';

const BookedSlotCard = ({ booking, onDelete, onClick }) => {
    const initials = booking.studentName
        ? booking.studentName.split(' ').map(n => n[0]).slice(0, 2).join('')
        : '?';

    const expired = new Date(booking.rawEndTime) <= new Date();

    return (
        <div className={`booked-slot-card ${expired ? 'booked-slot-card--expired' : ''}`} onClick={() => onClick(booking)} style={{ cursor: 'pointer' }}>
            <div className="booked-slot-card__time-block">
                <p className="booked-slot-card__date">{booking.date}</p>
                <p className="booked-slot-card__time">{booking.startTime} – {booking.endTime}</p>
                {expired && <span className="booked-slot-card__badge">Expired</span>}
            </div>

            <div className="booked-slot-card__divider" />

            <div className="booked-slot-card__student">
                <div className="booked-slot-card__avatar">{initials}</div>
                <div className="booked-slot-card__student-info">
                    <p className="booked-slot-card__student-name">{booking.studentName ?? 'Student'}</p>
                    {booking.course && (
                        <p className="booked-slot-card__student-meta">{booking.course} · Year {booking.year}</p>
                    )}
                    {booking.note && (
                        <p className="booked-slot-card__note">"{booking.note}"</p>
                    )}
                </div>
            </div>

            <button
                className="booked-slot-card__delete-btn"
                onClick={e => { e.stopPropagation(); onDelete(booking); }}
            >
                Cancel
            </button>
        </div>
    );
};

export default BookedSlotCard;
