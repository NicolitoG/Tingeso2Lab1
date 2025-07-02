import React, { useEffect, useState } from 'react';
import ClientService from "../services/ClientService.js";
import { useNavigate, useLocation } from 'react-router-dom';

const states = {
    0: "Pendiente",
    1: "Aprobada",
    2: "Rechazada",
    3: "Cancelada",
};

const NombreTarifa = {
    0: "10 vueltas o 10 minutos",
    1: "15 vueltas o 15 minutos",
    2: "20 vueltas o 20 minutos",
};

const ClientReservations = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state || { name: "Cliente" };

    const [reservas, setReservas] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        const fetchReservations = async () => {
            setIsLoading(true);
            try {
                const response = await ClientService.getReservations(name);
                setReservas(response.data);
                setErrorMessage("");
            } catch (error) {
                setErrorMessage("Error al cargar las reservas. Por favor, intente nuevamente.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchReservations();
    }, [name]);

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReservations = reservas.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.value));
    };

    const totalPages = Math.ceil(reservas.length / itemsPerPage);

    return (
        <div>
            <div>
                <p style={{ textAlign: 'left' }}>
                    <button onClick={() => navigate('/ClientLogged', { state: { name } })}>
                        Volver a la página principal
                    </button>
                </p>
            </div>
            <h1>Reservas del cliente</h1>
            {isLoading && <p>Cargando reservas...</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            {reservas.length > 0 ? (
                <>
                    <table border="1" cellPadding={8} style={{ margin: "0 auto", marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th style={{ color: "#4a1050" }}>Código</th>
                                <th style={{ color: "#4a1050" }}>Fecha</th>
                                <th style={{ color: "#4a1050" }}>Hora</th>
                                <th style={{ color: "#4a1050" }}>Tarifa</th>
                                <th style={{ color: "#4a1050" }}>Cantidad de personas</th>
                                <th style={{ color: "#4a1050" }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentReservations.map((reserva) => (
                                <tr key={reserva.reservationCode}>
                                    <td style={{ color: "#4a1050" }}>{reserva.reservationCode}</td>
                                    <td style={{ color: "#4a1050" }}>{reserva.reservationDate}</td>
                                    <td style={{ color: "#4a1050" }}>{reserva.reservationStartTime}</td>
                                    <td style={{ color: "#4a1050" }}>{NombreTarifa[reserva.reservationTariff.bookingType]}</td>
                                    <td style={{ color: "#4a1050" }}>{reserva.numberOfPeople}</td>
                                    <td style={{ color: "#4a1050" }}>{states[reserva.status]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Paginación simple */}
                    {totalPages > 1 && (
                        <div style={{ marginTop: 20 }}>
                            <span>Página: </span>
                            <select value={currentPage} onChange={handlePageChange}>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </>
            ) : (
                !isLoading && <p>No hay reservas para mostrar.</p>
            )}
        </div>
    );
};

export default ClientReservations;