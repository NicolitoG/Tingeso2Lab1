import React, { useEffect, useState } from 'react';
import ClientService from "../services/ClientService.js";
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, TableHead, TableBody, TableCell, TableRow, Button, TableContainer, Paper, Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ClientReservations = () => {

    const location = useLocation();
    const { name } = location.state || { name: "Cliente" }; // Valor predeterminado si no se pasa el nombre

    const [reservas, setReservas] = useState([]); // Estado para las reservas
    const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores
    const [isLoading, setIsLoading] = useState(false); // Estado para manejar el estado de carga
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [itemsPerPage] = useState(5); // Cantidad de reservas por página

    const states = {
        0: "Pendiente",
        1: "Aprobada",
        2: "Rechazada",
        3: "Cancelada",
    }

    const NombreTarifa = {
        0: "10 vueltas o 10 minutos",
        1: "15 vueltas o 15 minutos",
        2: "20 vueltas o 20 minutos",
    }

    // Llamar a la API para obtener las reservas
    useEffect(() => {
        const fetchReservations = async () => {
            setIsLoading(true);
            try {
                const response = await ClientService.getReservations(name);
                console.log("Reservas del cliente:", response.data);
                setReservas(response.data); // Actualizar el estado con las reservas
                setErrorMessage("");
            } catch (error) {
                console.error("Error al obtener las reservas:", error);
                setErrorMessage("Error al cargar las reservas. Por favor, intente nuevamente.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchReservations();
    }, [name]);

    // Cambiar la página actual
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Calcular las reservas a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReservations = reservas.slice(indexOfFirstItem, indexOfLastItem);



    return (
        <div>
            <h1>Reservas del cliente</h1>

            {reservas.length > 0 && (
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Hora</TableCell>
                                <TableCell>Tarifa</TableCell>
                                <TableCell>Cantidad de personas</TableCell>
                                <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservas.map((reserva) => (
                                <TableRow key={reserva.reservationCode}>
                                    <TableCell>{reserva.reservationCode}</TableCell>
                                    <TableCell>{reserva.reservationDate}</TableCell>
                                    <TableCell>{reserva.reservationStartTime}</TableCell>
                                    <TableCell>{NombreTarifa[reserva.reservationTariff.bookingType]}</TableCell>
                                    <TableCell>{reserva.numberOfPeople}</TableCell>
                                    <TableCell>{states[reserva.status]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>    
                </TableContainer>
            )}
            {reservas.length === 0 && (
                <p>No hay reservas para mostrar.</p>
            )}
        </div>
        
    );
};

export default ClientReservations;