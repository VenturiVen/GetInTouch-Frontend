import './BookedSlotCard.scss';

const BookedSlotCard = ({ booking }) => {
    const initials = booking.studentName
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('');

    return (
        <div className="booked-slot-card">
            <div className="booked-slot-card__time-block">
                <p className="booked-slot-card__date">{booking.date}</p>
                <p className="booked-slot-card__time">{booking.startTime} – {booking.endTime}</p>
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
        </div>
    );
};

export default BookedSlotCard;
