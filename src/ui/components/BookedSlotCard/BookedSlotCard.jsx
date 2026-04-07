import './BookedSlotCard.scss';

const isExpired = (date, endTime) => {
    const slotEnd = new Date(`${date} ${endTime}`);
    return slotEnd < new Date();
};

const BookedSlotCard = ({ booking, onDelete }) => {
    const initials = booking.studentName
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('');

    const expired = isExpired(booking.date, booking.endTime);

    return (
        <div className={`booked-slot-card ${expired ? 'booked-slot-card--expired' : ''}`}>
            <div className="booked-slot-card__time-block">
                <p className="booked-slot-card__date">{booking.date}</p>
                <p className="booked-slot-card__time">{booking.startTime} – {booking.endTime}</p>
                {expired && (
                    <span className="booked-slot-card__badge">Expired</span>
                )}
            </div>

            <div className="booked-slot-card__divider" />

            <div className="booked-slot-card__student">
                <div className="booked-slot-card__avatar">{initials}</div>
                <div className="booked-slot-card__student-info">
                    <p className="booked-slot-card__student-name">{booking.studentName}</p>
                    <p className="booked-slot-card__student-meta">{booking.course} · Year {booking.year}</p>
                    <p className="booked-slot-card__note">"{booking.note}"</p>
                </div>
            </div>

            {expired && (
                <button
                    className="booked-slot-card__delete-btn"
                    onClick={() => onDelete(booking.id)}
                >
                    Remove
                </button>
            )}
        </div>
    );
};

export default BookedSlotCard;
