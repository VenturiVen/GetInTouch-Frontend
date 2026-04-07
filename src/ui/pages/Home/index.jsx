import './index.scss';

import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button'

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="container home-page">
            <div className="text-zone">
                <h1>Welcome to Get In Touch!</h1>
                <h2><span className='brandName'>Get In Touch</span> is the ultimate hub made by students, for students</h2>
                <h2>Bridging the gap between staff and students at the <span className='brandName'>University of Limerick</span></h2>

                <Button
                    label="Sign Up Now!"
                    className="register-btn"
                    onClick={() => navigate('/login')}
                />
            </div>
        </div>
    );
};

export default Home;