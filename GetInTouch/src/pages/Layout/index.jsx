import { Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar';
import './index.scss';

const Layout = () => {
    return (
        <div className="App">
            <NavBar />
            <div className="page">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;