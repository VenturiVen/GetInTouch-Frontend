import { useState, useEffect } from 'react';
import { useUser } from '../../../../service/user/useUser';
import StaffCard from '../../../components/StaffCard/StaffCard';
import StaffAvailabilityModal from '../../../components/StaffAvailabilityModal/StaffAvailabilityModal';
import BookingModal from '../../../components/BookingModal/BookingModal';
import API from '../../../../infra/api/axios';
import { GET_ALL_STAFF, GET_STAFF_TIMESLOTS, SEND_NOTIFICATION } from '../../../../repo/constants/apiEndpoints';
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
    const { currentUser } = useUser();
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

    // When the bookings tab opens, cross-reference localStorage against the
    // backend and drop any slots the staff has since cancelled.
    useEffect(() => {
        if (activeTab !== 'bookings') return;
        const current = loadBookings();
        if (current.length === 0) return;

        const staffIds = [...new Set(current.map(b => b.staffId).filter(Boolean))];
        Promise.all(
            staffIds.map(id =>
                API.get(GET_STAFF_TIMESLOTS(id))
                    .then(r => ({ id, bookedIds: new Set(r.data.filter(s => s.booked).map(s => s.id)) }))
                    .catch(() => ({ id, bookedIds: null }))
            )
        ).then(results => {
            const lookup = Object.fromEntries(results.map(r => [r.id, r.bookedIds]));
            const valid = current.filter(b => {
                const bookedIds = lookup[b.staffId];
                return bookedIds === null || bookedIds.has(b.id);
            });
            if (valid.length !== current.length) {
                const sorted = valid.sort((a, b) => new Date(a.date) - new Date(b.date));
                setBookings(sorted);
                saveBookings(sorted);
            }
        });
    }, [activeTab]);

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
            staffId: staff.id,
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

        // Create the conversation so staff can message the student straight away.
        // The note (or a default message) becomes the first message in the thread.
        API.post(SEND_NOTIFICATION, {
            staffId: staff.id,
            content: note
                ? `Booking confirmed for ${slot.date} ${slot.startTime}–${slot.endTime}. Note: "${note}"`
                : `Booking confirmed for ${slot.date} ${slot.startTime}–${slot.endTime}.`,
        }).catch(err => console.error('SEND_NOTIFICATION failed:', err?.response?.status, err?.response?.data));

        setBookingData(null);
        setSelectedStaff(null);
    };

    const handleCancelBooking = (bookingId) => {
        const booking = bookings.find(b => b.id === bookingId);
        const updated = bookings.filter(b => b.id !== bookingId);
        setBookings(updated);
        saveBookings(updated);

        if (booking?.staffId) {
            API.post(SEND_NOTIFICATION, {
                staffId: booking.staffId,
                content: `Your booking on ${booking.date} from ${booking.startTime} to ${booking.endTime} has been cancelled by ${currentUser?.sub ?? 'the student'}.`,
            }).catch(() => {});
        }
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
