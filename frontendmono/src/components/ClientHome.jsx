import { useNavigate } from 'react-router-dom';

const ClienteHome = () => {

    const navigate = useNavigate();

    const goToRegister = () => {
        navigate('/ClientRegister');
    }

    const goToLogin = () => {
        navigate('/ClientLogin');
    }

    const goToHome = () => {
        navigate('/');
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button onClick={goToHome} style={{ marginBottom: 20, marginLeft: 10 }}>
                Volver a la página principal
            </button>
            <h1>Bienvenido a la sección cliente</h1>
            <div style={{ marginTop: '20px' }}>
                <button 
                    style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' ,}}
                    onClick={goToRegister}
                >
                    Registro
                </button>
                <button 
                    style={{ padding: '10px 20px', fontSize: '16px' }}
                    onClick={goToLogin}
                >
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
};

export default ClienteHome;