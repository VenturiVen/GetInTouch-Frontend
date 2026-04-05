import { useState } from 'react';
import StaffCard from '../../../components/StaffCard/StaffCard';
import StaffAvailabilityModal from '../../../components/StaffAvailabilityModal/StaffAvailabilityModal';
import BookingModal from '../../../components/BookingModal/BookingModal';
import './StudentDashboard.scss';

// TODO: replace with API call to GET /api/staff when backend is ready
const mockStaff = [
    { id: 1, name: 'Dr. Alice Murphy', department: 'Computer Science', roles: ['CS4135 Software Architecture', 'CS4001 Programming'] },
    { id: 2, name: 'Prof. Brian Kelly', department: 'Mathematics', roles: ['MA4001 Calculus', 'MA4002 Statistics'] },
    { id: 3, name: 'Dr. Sarah Connolly', department: 'Student Support', roles: ['Academic Advisor', 'Wellbeing'] },
    { id: 4, name: 'Dr. James O\'Connor', department: 'Computer Science', roles: ['CS3421 Databases', 'CS4135 Software Architecture'] },
    { id: 5, name: 'Ms. Emma Walsh', department: 'Student Affairs', roles: ['Counselling', 'Student Support'] },
    { id: 6, name: 'Dr. Patrick Ryan', department: 'Physics', roles: ['PH4001 Mechanics', 'PH4002 Thermodynamics'] },
];

// TODO: replace with API call to GET /api/bookings when backend is ready
// Mock bookings: sorted by closest date first
const mockBookings = [
    { id: 1, staffName: 'Dr. Alice Murphy', department: 'Computer Science', date: 'Monday, 10 Apr 2026', startTime: '09:00', endTime: '09:30', note: 'I would like to discuss my CS4135 project architecture.' },
    { id: 2, staffName: 'Dr. Sarah Connolly', department: 'Student Support', date: 'Tuesday, 8 Apr 2026', startTime: '14:00', endTime: '14:30', note: 'Looking for academic advice regarding my course load.' },
    { id: 3, staffName: 'Prof. Brian Kelly', department: 'Mathematics', date: 'Wednesday, 9 Apr 2026', startTime: '11:00', endTime: '11:30', note: 'Need help understanding the last statistics lecture.' },
];

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState('directory');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [bookingData, setBookingData] = useState(null);
    const [bookings, setBookings] = useState(
        [...mockBookings].sort((a, b) => new Date(a.date) - new Date(b.date))
    );

    const filteredStaff = mockStaff.filter(staff => {
        const term = searchTerm.toLowerCase();
        return (
            staff.name.toLowerCase().includes(term) ||
            staff.department.toLowerCase().includes(term) ||
            staff.roles.some(role => role.toLowerCase().includes(term))
        );
    });

    const handleStaffClick = (staff) => {
        setSelectedStaff(staff);
    };

    const handleBook = (staff, slot) => {
        setBookingData({ staff, slot });
    };

    const handleConfirm = (booking) => {
        // TODO: call POST /api/bookings when backend is ready
        console.log('Booking confirmed:', booking);
        setBookingData(null);
        setSelectedStaff(null);
    };

    const handleCancelBooking = (bookingId) => {
        // TODO: call DELETE /api/bookings/:id when backend is ready
        setBookings(prev =>
            prev.filter(b => b.id !== bookingId).sort((a, b) => new Date(a.date) - new Date(b.date))
        );
    };

    return (
        <>
            <div className="student-dashboard">
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
                                placeholder="Search by name, department or module..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {filteredStaff.length > 0 ? (
                            <div className="student-dashboard__grid">
                                {filteredStaff.map(staff => (
                                    <StaffCard key={staff.id} staff={staff} onClick={handleStaffClick} />
                                ))}
                            </div>
                        ) : (
                            <p className="student-dashboard__empty">No staff members found.</p>
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
