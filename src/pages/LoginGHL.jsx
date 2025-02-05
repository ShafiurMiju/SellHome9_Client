import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const LoginGHL = () => {
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get('email');
        const password = queryParams.get('password');

        const login = async () => {
            try {
                const response = await axios.post(`/ghl/${email}/${password}`);
                console.log('Login successful:', response.data);
            } catch (error) {
                console.error('Error logging in:', error);
            }
        };

        if (email && password) {
            login();
        }
    }, [location]);

    return (
        <div className="login-container">
            <h2>Login</h2>
            <p>Logging in...</p>
        </div>
    );
};

export default LoginGHL;
