import { useState } from 'react';
import StaffCard from '../../../components/StaffCard';
import './index.scss';

// TODO: replace with API call to GET /api/staff when backend is ready
const mockStaff = [
    { id: 1, name: 'Dr. Alice Murphy', department: 'Computer Science', roles: ['CS4135 Software Architecture', 'CS4001 Programming'] },
    { id: 2, name: 'Prof. Brian Kelly', department: 'Mathematics', roles: ['MA4001 Calculus', 'MA4002 Statistics'] },
    { id: 3, name: 'Dr. Sarah Connolly', department: 'Student Support', roles: ['Academic Advisor', 'Wellbeing'] },
    { id: 4, name: 'Dr. James O\'Connor', department: 'Computer Science', roles: ['CS3421 Databases', 'CS4135 Software Architecture'] },
    { id: 5, name: 'Ms. Emma Walsh', department: 'Student Affairs', roles: ['Counselling', 'Student Support'] },
    { id: 6, name: 'Dr. Patrick Ryan', department: 'Physics', roles: ['PH4001 Mechanics', 'PH4002 Thermodynamics'] },
];

const StudentDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStaff = mockStaff.filter(staff => {
        const term = searchTerm.toLowerCase();
        return (
            staff.name.toLowerCase().includes(term) ||
            staff.department.toLowerCase().includes(term) ||
            staff.roles.some(role => role.toLowerCase().includes(term))
        );
    });

    const handleStaffClick = (staff) => {
        // TODO: open staff availability view (US-ST02)
        console.log('Selected staff:', staff);
    };

    return (
        <div className="student-dashboard">
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
        </div>
    );
};

export default StudentDashboard;
