import { useNavigate } from "react-router-dom";

const FrequentQuestions = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>
                <button onClick={goToHome}>
                    Volver a la página principal
                </button>
            </div>
            <div style={{
                backgroundColor: "rgb(25, 76, 87)",
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                width: '80%'
            }}>
                <h1 style={{ textAlign: 'center', color: "white" }}>Acerca de nosotros</h1>
                <p>
                    Somos un kartódromo dedicado a brindar la mejor
                    experiencia de carreras para personas de todas las edades.
                    Ahora con nuestra nueva aplicación web hecha por nuestro increíble
                    equipo de ingenieros, reservar es más facil que nunca.
                </p>
                <h1 style={{ color: "white", marginTop: 32 }}>Preguntas Frecuentes</h1>
                <div style={{ marginTop: 16 }}>
                    <p><strong>1. ¿Cuáles son los horarios de atención?</strong><br />
                        Nuestro kartódromo está abierto de lunes a viernes, de 14:00 a 22:00 horas
                        y Sabados, Domingos y feriados, de 10:00 a 22:00 horas.</p>

                    <p><strong>2. ¿Es necesario reservar con anticipación?</strong><br />
                        Recomendamos reservar con anticipación para asegurar tu lugar, especialmente los fines de semana.</p>

                    <p><strong>3. ¿Cuáles son las tarifas que ofrecen?</strong><br />
                        Las tarifas que se ofrecen son:<br />
                        Número de vueltas o tiempo máximo permitido:<br />
                        10 vueltas o máx 10 min con un precio de: $15.000 y esta reserva dura 30 min<br />
                        15 vueltas o máx 15 min con un precio de: $20.000 y esta reserva dura 35 min<br />
                        20 vueltas o máx 20 min con un precio de: $25.000 y esta reserva dura 40 min.</p>

                    <p><strong>4. ¿Como se hace una reserva desde la página?</strong><br />
                        Para hacer una reserva desde la página, debes iniciar sesión como cliente (previamente registrado), luego ir a la sección de reservas,
                        seleccionar la fecha y hora deseada, elegir el tipo de reserva y confirmar tu reserva.</p>
                </div>
            </div>
        </div>
    );
};

export default FrequentQuestions;