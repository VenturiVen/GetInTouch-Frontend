import './SlotCard.scss';

const SlotCard = ({ slot, onDelete }) => {
    return (
        <div className="slot-card">
            <div className="slot-card__info">
                <p className="slot-card__date">{slot.date?.split('-').reverse().join('/')}</p>
                <p className="slot-card__time">{slot.startTime} – {slot.endTime}</p>
            </div>
            <button
                className="slot-card__delete-btn"
                onClick={() => onDelete(slot.id)}
            >
                Delete
            </button>
        </div>
    );
};

export default SlotCard;
