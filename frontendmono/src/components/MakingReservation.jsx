import React, { useState } from 'react';
import ClientService from "../services/ClientService.js";
import { useNavigate, useLocation } from 'react-router-dom';

const MakingReservation = () => {
    const location = useLocation();
    const { name } = location.state || { name: "Cliente" }; // Valor predeterminado si no se pasa el nombre

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        date: '',
        time: '',
        reservationType: '',
        peopleCount: '',
    });

    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Prevent selecting a past date
        if (name === "date") {
            const today = new Date().toISOString().split("T")[0];
            if (value < today) {
            setFeedbackMessage("No puede seleccionar una fecha pasada.");
            } else {
            setFeedbackMessage("");
            }
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar datos
        if (!formData.date || !formData.time || !formData.reservationType || !formData.peopleCount) {
            setFeedbackMessage("Error: Por favor, complete todos los campos.");
            return;
        }

            // Validar hora entre 14:00 y 21:59
        const [hour, minute] = formData.time.split(":").map(Number);
        if (hour < 14 || hour > 21 || (hour === 21 && minute > 59)) {
            setFeedbackMessage("Error: La hora debe estar entre 14:00 y 21:59.");
            return;
        }


        const number = formData.peopleCount;
        if (number < 1) {
            setFeedbackMessage("Error: El número de personas debe ser mayor a 0");
            return;
        }

        if (number > 15) {
            setFeedbackMessage("Error: El número de personas no puede ser mayor a 15.");
            return;
        }

        // Crear objeto para enviar al backend
        const reservationData = {
            date: formData.date,
            time: formData.time,
            reservationType: formData.reservationType,
            peopleCount: formData.peopleCount,
            userName: name,
        };
        console.log("Datos de reserva:", reservationData);

        // Llamar al servicio para crear la reserva
        ClientService.createReservation(reservationData)
            .then((response) => {
                console.log("Reserva creada:", response.data);
                setFeedbackMessage("Reserva creada exitosamente, redirigiendo...");
                setTimeout(() => {
                    navigate('/ClientLogged', { state: { name } });
                }, 2000);
            })
            .catch((error) => {
                console.error("Error al crear la reserva:", error);
                setFeedbackMessage("Error al crear la reserva. Por favor, intente nuevamente.");
            });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>
                <button onClick={() => navigate('/ClientLogged', { state: { name } })}>
                    Volver a la página principal
                </button>
            </div>
            <div style={{ backgroundColor:"rgb(25, 76, 87)", color: 'white', padding: '20px', borderRadius: '10px', width: '80%' }}>
                <h1 style={{ textAlign: 'center' }}>Hacer una Reserva</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <label htmlFor="date" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fecha:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            style={{ textAlign: 'center', backgroundColor: 'white', color: 'black' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <label htmlFor="time" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Hora:</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            style={{ textAlign: 'center', backgroundColor: 'white', color: 'black'  }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <label htmlFor="reservationType" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tipo de Reserva:</label>
                        <select
                            id="reservationType"
                            name="reservationType"
                            value={formData.reservationType}
                            onChange={handleChange}
                            style={{ textAlign: 'center', backgroundColor: 'white', color: 'black'  }}
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="0">10 vueltas/10 min</option>
                            <option value="1">15 vueltas/15 min</option>
                            <option value="2">20 vueltas/20 min</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <label htmlFor="peopleCount" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nro Personas:</label>
                        <input
                            type="number"
                            id="peopleCount"
                            name="peopleCount"
                            value={formData.peopleCount}
                            onChange={handleChange}
                            style={{ textAlign: 'center', backgroundColor: 'white', color: 'black'  }}
                        />
                    </div>
                    <button type="submit">Reservar</button>
                </form>
                {feedbackMessage && <p style={{
                    color: feedbackMessage.startsWith("Error") ? "red" : "green",
                    border: "3px solid",
                    borderColor: "#4a1050",
                    backgroundColor: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    textAlign: "center"
                }}>
                    {feedbackMessage}
                </p>}
            </div>
        </div>
    );
};

export default MakingReservation;