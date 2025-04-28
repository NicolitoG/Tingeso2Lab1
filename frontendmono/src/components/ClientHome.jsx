import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClienteHome = () => {

    const navigate = useNavigate();

    const goToRegister = () => {
        navigate('/ClientRegister');
    }

    const goToLogin = () => {
        navigate('/ClientLogin');
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Bienvenido a la sección cliente</h1>
            <div style={{ marginTop: '20px' }}>
                <button 
                    style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}
                    onClick={goToRegister}
                >
                    Registro
                </button>
                <button 
                    style={{ padding: '10px 20px', fontSize: '16px' }}
                    onClick={goToLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default ClienteHome;