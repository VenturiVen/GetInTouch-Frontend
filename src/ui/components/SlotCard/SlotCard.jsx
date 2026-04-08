import './SlotCard.scss';

const SlotCard = ({ slot, onDelete, onEdit }) => {
    return (
        <div className="slot-card">
            <div className="slot-card__info">
                <p className="slot-card__date">{slot.date?.split('-').reverse().join('/')}</p>
                <p className="slot-card__time">{slot.startTime} – {slot.endTime}</p>
            </div>
            <div className="slot-card__actions">
                <button
                    className="slot-card__edit-btn"
                    onClick={() => onEdit(slot)}
                >
                    Edit
                </button>
                <button
                    className="slot-card__delete-btn"
                    onClick={() => onDelete(slot)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default SlotCard;
