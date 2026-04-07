import { Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar';
import './index.scss';

const Layout = () => {
    return (
        <div className='layout-container'>
            <div className='nav-container'>
                <NavBar />
            </div>

            <div key={location.pathname} className="page">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;