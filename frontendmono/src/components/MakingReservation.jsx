import React, { useState } from 'react';
import ClientService from "../services/ClientService.js";
import { useNavigate, useLocation } from 'react-router-dom';

const MakingReservation = () => {
    const location = useLocation();
    const { name } = location.state || { name: "Cliente" }; // Valor predeterminado si no se pasa el nombre
    console.log("Nombre recibido en ClientLogged:", name);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        date: '',
        time: '',
        reservationType: '',
        peopleCount: '',
    });

    console.log("Nombre de usuario recibido:", name);
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
            setFeedbackMessage("Por favor, complete todos los campos.");
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
                setFeedbackMessage("Reserva creada exitosamente.");
            })
            .catch((error) => {
                console.error("Error al crear la reserva:", error);
                setFeedbackMessage("Error al crear la reserva. Por favor, intente nuevamente.");
            });
    };

    return (
        <div>
            <div>
                <p style={{ textAlign: 'left' }}>
                    <button onClick={() => navigate('/ClientLogged', { state: { name } })}>
                        Volver a la página principal
                    </button>
                </p>
            </div>
            <h1>Hacer una Reserva</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Fecha:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time">Hora:</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="reservationType">Tipo de Reserva:</label>
                    <select
                        id="reservationType"
                        name="reservationType"
                        value={formData.reservationType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="0">10 vueltas/10 min</option>
                        <option value="1">15 vueltas/15 min</option>
                        <option value="2">20 vueltas/20 min</option>
                        <option value="-1">Sin reserva</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="peopleCount">Nro Personas:</label>
                    <input
                        type="number"
                        id="peopleCount"
                        name="peopleCount"
                        value={formData.peopleCount}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
                <button type="submit">Reservar</button>
            </form>
            {feedbackMessage && <p>{feedbackMessage}</p>}
        </div>
    );
};

export default MakingReservation;