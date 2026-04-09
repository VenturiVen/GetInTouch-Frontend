import { useState, useEffect } from 'react';
import StaffCard from '../../../components/StaffCard/StaffCard';
import StaffAvailabilityModal from '../../../components/StaffAvailabilityModal/StaffAvailabilityModal';
import BookingModal from '../../../components/BookingModal/BookingModal';
import API from '../../../../infra/api/axios';
import { GET_ALL_STAFF } from '../../../../repo/constants/apiEndpoints';
import './StudentDashboard.scss';

const BOOKINGS_KEY = 'student_bookings';

const loadBookings = () => {
    try {
        const stored = localStorage.getItem(BOOKINGS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveBookings = (bookings) => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState('directory');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [bookingData, setBookingData] = useState(null);
    const [bookings, setBookings] = useState(() =>
        [...loadBookings()].sort((a, b) => new Date(a.date) - new Date(b.date))
    );
    const [staff, setStaff] = useState([]);
    const [staffLoading, setStaffLoading] = useState(true);

    useEffect(() => {
        API.get(GET_ALL_STAFF)
            .then(r => setStaff(r.data))
            .catch(() => setStaff([]))
            .finally(() => setStaffLoading(false));
    }, []);

    const filteredStaff = staff.filter(staff => {
        const term = searchTerm.toLowerCase();
        return (
            staff.name.toLowerCase().includes(term) ||
            staff.department.toLowerCase().includes(term) ||
            staff.title?.toLowerCase().includes(term) ||
            staff.officeLocation?.toLowerCase().includes(term)
        );
    });

    const handleStaffClick = (staff) => {
        setSelectedStaff(staff);
    };

    const handleBook = (staff, slot) => {
        setBookingData({ staff, slot });
    };

    const handleConfirm = ({ staff, slot, note }) => {
        const newBooking = {
            id: slot.id,
            staffName: staff.name,
            department: staff.department,
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
            note,
        };
        const updated = [...bookings, newBooking].sort((a, b) => new Date(a.date) - new Date(b.date));
        setBookings(updated);
        saveBookings(updated);
        setBookingData(null);
        setSelectedStaff(null);
    };

    const handleCancelBooking = (bookingId) => {
        // TODO: call PATCH /api/timeslots/free/:id when backend Meeting API is ready
        const updated = bookings.filter(b => b.id !== bookingId);
        setBookings(updated);
        saveBookings(updated);
    };

    return (
        <>
            <div className="container student-dashboard">
                <div className="student-dashboard__tabs">
                    <button
                        className={`student-dashboard__tab ${activeTab === 'directory' ? 'student-dashboard__tab--active' : ''}`}
                        onClick={() => setActiveTab('directory')}
                    >
                        Staff Directory
                    </button>
                    <button
                        className={`student-dashboard__tab ${activeTab === 'bookings' ? 'student-dashboard__tab--active' : ''}`}
                        onClick={() => setActiveTab('bookings')}
                    >
                        My Bookings
                        {bookings.length > 0 && (
                            <span className="student-dashboard__tab-badge">{bookings.length}</span>
                        )}
                    </button>
                </div>

                {activeTab === 'directory' && (
                    <>
                        <div className="student-dashboard__header">
                            <h1 className="student-dashboard__title">Staff Directory</h1>
                            <input
                                className="student-dashboard__search"
                                type="text"
                                placeholder="Search by name, department or title..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {staffLoading && (
                            <p className="student-dashboard__empty">Loading staff...</p>
                        )}

                        {!staffLoading && filteredStaff.length > 0 ? (
                            <div className="student-dashboard__grid">
                                {filteredStaff.map(s => (
                                    <StaffCard key={s.id} staff={s} onClick={handleStaffClick} />
                                ))}
                            </div>
                        ) : (
                            !staffLoading && <p className="student-dashboard__empty">No staff members found.</p>
                        )}
                    </>
                )}

                {activeTab === 'bookings' && (
                    <>
                        <div className="student-dashboard__header">
                            <h1 className="student-dashboard__title">My Bookings</h1>
                        </div>

                        {bookings.length > 0 ? (
                            <div className="student-dashboard__bookings">
                                {bookings.map(booking => (
                                    <div key={booking.id} className="booking-card">
                                        <div className="booking-card__info">
                                            <p className="booking-card__staff">{booking.staffName}</p>
                                            <p className="booking-card__department">{booking.department}</p>
                                            <p className="booking-card__time">
                                                {booking.date} &nbsp;·&nbsp; {booking.startTime} – {booking.endTime}
                                            </p>
                                            <p className="booking-card__note">"{booking.note}"</p>
                                        </div>
                                        <button
                                            className="booking-card__cancel-btn"
                                            onClick={() => handleCancelBooking(booking.id)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="student-dashboard__empty">No upcoming appointments.</p>
                        )}
                    </>
                )}
            </div>

            <StaffAvailabilityModal
                staff={selectedStaff}
                onClose={() => setSelectedStaff(null)}
                onBook={handleBook}
            />

            <BookingModal
                staff={bookingData?.staff}
                slot={bookingData?.slot}
                onClose={() => setBookingData(null)}
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default StudentDashboard;
