import { useState } from 'react';
import SlotCard from '../../../components/SlotCard/SlotCard';
import BookedSlotCard from '../../../components/BookedSlotCard/BookedSlotCard';
import CreateSlotModal from '../../../components/CreateSlotModal/CreateSlotModal';
import './StaffDashboard.scss';

// TODO: replace with API call to GET /api/slots when backend is ready
const mockSlots = [
    { id: 1, date: 'Monday, 7 Apr 2026', startTime: '09:00', endTime: '09:30' },
    { id: 2, date: 'Monday, 7 Apr 2026', startTime: '10:00', endTime: '10:30' },
    { id: 3, date: 'Tuesday, 8 Apr 2026', startTime: '14:00', endTime: '14:30' },
    { id: 4, date: 'Wednesday, 9 Apr 2026', startTime: '11:00', endTime: '11:30' },
];

// TODO: replace with API call to GET /api/slots?status=booked when backend is ready
const mockBookedSlots = [
    { id: 10, date: 'Monday, 7 Apr 2026', startTime: '11:00', endTime: '11:30', studentName: 'John Byrne', course: 'Computer Science', year: 4, note: 'I would like to discuss my CS4135 project.' },
    { id: 11, date: 'Tuesday, 8 Apr 2026', startTime: '10:00', endTime: '10:30', studentName: 'Sarah Lynch', course: 'Computer Science', year: 3, note: 'Need help understanding the last lecture on microservices.' },
    { id: 12, date: 'Wednesday, 9 Apr 2026', startTime: '14:00', endTime: '14:30', studentName: 'Cian Murphy', course: 'Computer Science', year: 4, note: 'Final year project feedback session.' },
];

let nextId = mockSlots.length + 1;

const StaffDashboard = () => {
    const [activeTab, setActiveTab] = useState('available');
    const [slots, setSlots] = useState(mockSlots);
    const [bookedSlots] = useState(mockBookedSlots);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCreate = ({ date, startTime, endTime }) => {
        // TODO: call POST /api/slots when backend is ready
        const newSlot = { id: nextId++, date, startTime, endTime };
        setSlots(prev => [...prev, newSlot]);
    };

    const handleDelete = (slotId) => {
        // TODO: call DELETE /api/slots/:id when backend is ready
        setSlots(prev => prev.filter(s => s.id !== slotId));
    };

    return (
        <>
            <div className="staff-dashboard">
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
                        onClick={() => setActiveTab('booked')}
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
                                    <SlotCard key={slot.id} slot={slot} onDelete={handleDelete} />
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
                                    <BookedSlotCard key={booking.id} booking={booking} />
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
        </>
    );
};

export default StaffDashboard;
