import { useEffect, useState } from 'react';
import ClientService from "../services/ClientService.js";
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper, Pagination, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';




const AdminSection = () => {

    const navigate = useNavigate();

    const goToRack = () => {
        navigate('/Admin/Rack');
    };

    const goToRevenueReport = () => {
        navigate('/Admin/RevenueReport');
    };

    const goToHome = () => {
        navigate('/');
    }

    const [reservas, setReservas] = useState([]); // Estado para las reservas
    const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores
    const [isLoading, setIsLoading] = useState(false); // Estado para manejar el estado de carga
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [itemsPerPage] = useState(5); // Cantidad de reservas por página
    const [anchorEl, setAnchorEl] = useState(null); // Estado para el menú desplegable
    const [selectedReservation, setSelectedReservation] = useState(null); // Reserva seleccionada para acciones

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

    // Llamar a la API para obtener todas las reservas
    useEffect(() => {
        const fetchAllReservations = async () => {
            setIsLoading(true);
            try {
                const response = await ClientService.getAllPendingReservations();
                console.log("Todas las reservas:", response.data);
                setReservas(response.data); // Actualizar el estado con todas las reservas
                setErrorMessage("");
            } catch (error) {
                console.error("Error al obtener todas las reservas:", error);
                setErrorMessage("Error al cargar las reservas. Por favor, intente nuevamente.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllReservations();
    }, []);

    // Cambiar la página actual
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Calcular las reservas a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReservations = reservas.slice(indexOfFirstItem, indexOfLastItem);

    // Manejar la apertura del menú
    const handleMenuOpen = (event, reserva) => {
        setAnchorEl(event.currentTarget);
        setSelectedReservation(reserva);
    };

    // Manejar el cierre del menú
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedReservation(null);
    };

    // Aprobar reserva
    const handleApprove = async () => {
        if (selectedReservation) {
            try {
                await ClientService.approveReservation(selectedReservation.reservationCode);
                setReservas((prev) =>
                    prev.map((reserva) =>
                        reserva.reservationCode === selectedReservation.reservationCode
                            ? { ...reserva, status: 1 } // Cambiar estado a "Aprobada"
                            : reserva
                    )
                );
                handleMenuClose();
            } catch (error) {
                console.error("Error al aprobar la reserva:", error);
                setErrorMessage("No se pudo aprobar la reserva.");
            }
        }
    };

    // Rechazar reserva
    const handleReject = async () => {
        if (selectedReservation) {
            try {
                await ClientService.rejectReservation(selectedReservation.reservationCode);
                setReservas((prev) =>
                    prev.map((reserva) =>
                        reserva.reservationCode === selectedReservation.reservationCode
                            ? { ...reserva, status: 2 } // Cambiar estado a "Rechazada"
                            : reserva
                    )
                );
                handleMenuClose();
            } catch (error) {
                console.error("Error al rechazar la reserva:", error);
                setErrorMessage("No se pudo rechazar la reserva.");
            }
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={goToHome} style={{ marginBottom: 20, marginLeft: 10 }}>
                    Volver a la página principal
                </button>
                <button onClick={goToRack} style={{ marginBottom: 20 }}>
                    Vista rack semanal
                </button>
                <button onClick={goToRevenueReport} style={{ marginBottom: 20, marginLeft: 10 }}>
                    Reporte de ingresos
                </button>

            </div>




        
            <h1>Sección de Admin</h1>
            <p>Aquí puedes aprobar o rechazar reservas pendientes</p>

            {isLoading && <p>Cargando reservas...</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            {!isLoading && reservas.length > 0 ? (
                <>
                    <TableContainer component={Paper} style={{ marginTop: 20 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Hora inicio</TableCell>
                                    <TableCell>Hora fin</TableCell>
                                    <TableCell>Tarifa</TableCell>
                                    <TableCell>Cantidad de personas</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentReservations.map((reserva) => (
                                    <TableRow key={reserva.reservationCode}>
                                        <TableCell>{reserva.reservationCode}</TableCell>
                                        <TableCell>{reserva.contactClient.name}</TableCell>
                                        <TableCell>{reserva.reservationDate}</TableCell>
                                        <TableCell>{reserva.reservationStartTime}</TableCell>
                                        <TableCell>{reserva.reservationEndTime}</TableCell>
                                        <TableCell>{NombreTarifa[reserva.reservationTariff.bookingType]}</TableCell>
                                        <TableCell>{reserva.numberOfPeople}</TableCell>
                                        <TableCell>{states[reserva.status]}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                onClick={(event) => handleMenuOpen(event, reserva)}
                                            >
                                                Opciones
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={Math.ceil(reservas.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
                    />
                </>
            ) : (
                !isLoading && <p>No hay reservas para mostrar.</p>
            )}

            {/* Menú desplegable para acciones */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleApprove}>Aprobar</MenuItem>
                <MenuItem onClick={handleReject}>Rechazar</MenuItem>
            </Menu>
        </div>
    );
};

export default AdminSection;