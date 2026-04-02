import './index.scss';

const AdminDashboard = () => {
    return (
        // wrap page in a div with classname container for animations to work
        // was trying to figure out why they werent working and it was because of this
        // idk why...
        <div className="container admindashboard">
            <h1>Admin Dashboard</h1>
        </div>
    );
};

export default AdminDashboard;
