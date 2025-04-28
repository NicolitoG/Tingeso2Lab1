import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ClientLogged = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || { name: "Cliente" }; // Valor predeterminado si no se pasa el nombre
  console.log("Nombre recibido en ClientLogged:", name);

  const goToReservarHora = () => {
    navigate('/ClientLogged/MakingReservations' , { state: { name } });
  };

  const goToReservations = () => {
    navigate('/ClientLogged/Reservations', { state: { name } });
  }

  const goToBoleta = () => {
    navigate('/ClientLogged/Boleta', { state: { name } });
  };

  console.log("Nombre enviado a ReservarHora:", { state: { name } });


  return (
    <div>
      <h1>Cliente {name}, logueado correctamente</h1>
      <p>
        <button onClick={goToReservations}>Ver Reservas</button>
        <button onClick={goToReservarHora}>Reservar Hora</button>
        <button onClick={goToBoleta}>Ver boleta</button>
      </p>
    </div>
  );
};

export default ClientLogged;