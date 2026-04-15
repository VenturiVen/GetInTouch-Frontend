import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SlotCard from '../../../components/SlotCard/SlotCard';
import BookedSlotCard from '../../../components/BookedSlotCard/BookedSlotCard';
import CreateSlotModal from '../../../components/CreateSlotModal/CreateSlotModal';
import EditSlotModal from '../../../components/EditSlotModal/EditSlotModal';
import API from '../../../../infra/api/axios';
import { GET_ALL_STAFF, GET_STAFF_TIMESLOTS, CREATE_AVAILABILITY, DELETE_AVAILABILITY, FREE_TIMESLOT, GET_CONVERSATIONS, SEND_MESSAGE } from '../../../../infra/constants/apiEndpoints';
import { useUser } from '../../../../service/auth/useUser';
import './StaffDashboard.scss';


const transformSlots = (apiSlots) => apiSlots.map(s => ({
    id: s.id,
    availabilityId: s.availabilityId,
    rawStartTime: s.startTime,
    rawEndTime: s.endTime,
    date: new Date(s.startTime).toLocaleDateString('en-IE', {
        weekday: 'long', day: 'numeric', month: 'short', year: 'numeric',
    }),
    startTime: new Date(s.startTime).toLocaleTimeString('en-IE', {
        hour: '2-digit', minute: '2-digit', hour12: false,
    }),
    endTime: new Date(s.endTime).toLocaleTimeString('en-IE', {
        hour: '2-digit', minute: '2-digit', hour12: false,
    }),
    studentId: s.studentId,
    studentName: s.studentName,
    studentEmail: s.studentEmail,
    note: s.note,
}));

const StaffDashboard = () => {
    const { currentUser } = useUser();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('available');
    const [staffId, setStaffId] = useState(null);
    const [staffName, setStaffName] = useState('');
    const [slots, setSlots] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingSlot, setEditingSlot] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Step 1: find the logged-in staff member's ID by matching email from JWT
    useEffect(() => {
        if (!currentUser?.sub) return;
        API.get(GET_ALL_STAFF)
            .then(r => {
                const me = r.data.find(s => s.email === currentUser.sub);
                if (me) { setStaffId(me.id); setStaffName(me.name); }
            })
            .catch(err => console.error('Failed to fetch staff list:', err));
    }, [currentUser]);

    const refreshSlots = (id) => {
        const resolvedId = id ?? staffId;
        if (!resolvedId) return;
        API.get(GET_STAFF_TIMESLOTS(resolvedId))
            .then(r => {
                const now = new Date();
                setSlots(transformSlots(r.data.filter(s => !s.booked && new Date(s.endTime) > now)));
                const sorted = [...r.data.filter(s => s.booked)].sort((a, b) => a.startTime < b.startTime ? -1 : 1);
                setBookedSlots(transformSlots(sorted));
            })
            .catch(err => console.error('Failed to fetch timeslots:', err));
    };

    // Step 2: once we have the staffId, load timeslots
    useEffect(() => {
        if (!staffId) return;
        refreshSlots(staffId);
    }, [staffId]);


    const handleCreate = ({ date, startTime, endTime }) => {
        if (!staffId) return;
        const day = new Date(`${date}T00:00:00`)
            .toLocaleDateString('en-US', { weekday: 'long' })
            .toUpperCase();

        API.post(`${CREATE_AVAILABILITY}?date=${date}`, [{
            staffId,
            day,
            startTime,
            endTime,
            endDate: date,
            timeSlotLength: 'PT30M',
        }])
            .then(() => refreshSlots())
            .catch(err => console.error('Failed to create availability:', err));
    };

    const handleDelete = (slot) => {
        API.delete(DELETE_AVAILABILITY(slot.availabilityId))
            .then(() => setSlots(prev => prev.filter(s => s.availabilityId !== slot.availabilityId)))
            .catch(err => console.error('Failed to delete availability:', err));
    };

    const handleEdit = (slotId, { date, startTime, endTime }) => {
        // TODO: call PUT /api/Availability/:availabilityId when wired to backend
        setSlots(prev => prev.map(s => s.id === slotId ? { ...s, date, startTime, endTime } : s));
    };

    const handleMessage = () => {
        navigate('/messages');
    };

    const handleDeleteBooked = (slot) => {
        API.patch(FREE_TIMESLOT(slot.id))
            .then(() => {
                setBookedSlots(prev => prev.filter(s => s.id !== slot.id));
                if (slot.studentEmail) {
                    API.get(GET_CONVERSATIONS)
                        .then(r => {
                            const list = Array.isArray(r.data) ? r.data
                                : Array.isArray(r.data?.content) ? r.data.content
                                : Array.isArray(r.data?.conversations) ? r.data.conversations
                                : [];
                            const conv = list.find(c => c.studentEmail === slot.studentEmail);
                            if (conv) {
                                API.post(SEND_MESSAGE(conv.id), {
                                    content: `Your booking on ${slot.date} from ${slot.startTime} to ${slot.endTime} has been cancelled by ${staffName || currentUser?.sub}.`,
                                }).catch(() => {});
                            }
                        })
                        .catch(() => {});
                }
            })
            .catch(err => console.error('Failed to remove booked slot:', err));
    };

    return (
        <>
            <div className="container staff-dashboard">
                <div className="staff-dashboard__tabs">
                    <button
                        className={`staff-dashboard__tab ${activeTab === 'available' ? 'staff-dashboard__tab--active' : ''}`}
                        onClick={() => setActiveTab('available')}
                    >
                        Available Slots
                        {slots.length > 0 && (
                            <span className="staff-dashboard__tab-badge">{slots.length}</span>
                        )}
                    </button>
                    <button
                        className={`staff-dashboard__tab ${activeTab === 'booked' ? 'staff-dashboard__tab--active' : ''}`}
                        onClick={() => { setActiveTab('booked'); refreshSlots(); }}
                    >
                        Booked Slots
                        {bookedSlots.length > 0 && (
                            <span className="staff-dashboard__tab-badge">{bookedSlots.length}</span>
                        )}
                    </button>
                </div>

                {activeTab === 'available' && (
                    <>
                        <div className="staff-dashboard__header">
                            <h1 className="staff-dashboard__title">Available Slots</h1>
                            <button
                                className="staff-dashboard__create-btn"
                                onClick={() => setShowCreateModal(true)}
                            >
                                + Create Slot
                            </button>
                        </div>

                        {slots.length > 0 ? (
                            <div className="staff-dashboard__grid">
                                {slots.map(slot => (
                                    <SlotCard key={slot.id} slot={slot} onDelete={handleDelete} onEdit={setEditingSlot} />
                                ))}
                            </div>
                        ) : (
                            <p className="staff-dashboard__empty">No available slots. Create one to get started.</p>
                        )}
                    </>
                )}

                {activeTab === 'booked' && (
                    <>
                        <div className="staff-dashboard__header">
                            <h1 className="staff-dashboard__title">Booked Slots</h1>
                        </div>

                        {bookedSlots.length > 0 ? (
                            <div className="staff-dashboard__list">
                                {bookedSlots.map(booking => (
                                    <BookedSlotCard key={booking.id} booking={booking} onDelete={handleDeleteBooked} onClick={setSelectedBooking} onMessage={handleMessage} />
                                ))}
                            </div>
                        ) : (
                            <p className="staff-dashboard__empty">No booked slots yet.</p>
                        )}
                    </>
                )}
            </div>

            {showCreateModal && (
                <CreateSlotModal
                    onClose={() => setShowCreateModal(false)}
                    onCreate={handleCreate}
                />
            )}

            {editingSlot && (
                <EditSlotModal
                    slot={editingSlot}
                    onClose={() => setEditingSlot(null)}
                    onEdit={handleEdit}
                />
            )}

            {selectedBooking && (
                <div className="booking-detail-overlay" onClick={() => setSelectedBooking(null)}>
                    <div className="booking-detail-modal" onClick={e => e.stopPropagation()}>
                        <div className="booking-detail-modal__header">
                            <h2>Booking Details</h2>
                            <button onClick={() => setSelectedBooking(null)}>✕</button>
                        </div>
                        <div className="booking-detail-modal__body">
                            <p><span>Name</span>{selectedBooking.studentName ?? '—'}</p>
                            <p><span>Student ID</span>{selectedBooking.studentId ?? '—'}</p>
                            <p><span>Email</span>{selectedBooking.studentEmail ?? '—'}</p>
                            <p><span>Date</span>{selectedBooking.date}</p>
                            <p><span>Time</span>{selectedBooking.startTime} – {selectedBooking.endTime}</p>
                            {selectedBooking.note && (
                                <div className="booking-detail-modal__note">
                                    <span>Note</span>
                                    <p>"{selectedBooking.note}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StaffDashboard;
