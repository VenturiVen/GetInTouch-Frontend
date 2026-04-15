import './StaffCard.scss';

const StaffCard = ({ staff, onClick }) => {
    const initials = staff.name
        .split(' ')
        .map(n => n[0])
        .slice(1, 3)
        .join('');

    return (
        <div className="staff-card" onClick={() => onClick(staff)}>
            <div className="staff-card__avatar">{initials}</div>
            <div className="staff-card__info">
                <h3 className="staff-card__name">{staff.name}</h3>
                <p className="staff-card__department">{staff.department}</p>
                <div className="staff-card__roles">
                    {staff.title && (
                        <span className="staff-card__role-tag">{staff.title}</span>
                    )}
                    {staff.officeLocation && (
                        <span className="staff-card__role-tag">{staff.officeLocation}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaffCard;
