import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ClientLogged = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || { name: "Cliente" }; // Valor predeterminado si no se pasa el nombre
  console.log("Nombre recibido en ClientLogged:", name);

  const goToReservarHora = () => {
    navigate('/ClientLogged/MakingReservations' , { state: { name } });
    console.log("Nombre recibido en ClientLogged:", name);
  };

  const goToReservations = () => {
    navigate('/ClientLogged/Reservations', { state: { name } });
    console.log("Nombre recibido en ClientLogged:", name);
  }

  const goToInicioSesion = () => {
    navigate('/ClientLogin');
  };

  console.log("Nombre enviado a ReservarHora:", { state: { name } });


  return (
    <div>
      <p style={{ textAlign: 'left' }}>
        <button onClick={goToInicioSesion}>Cerrar sesión</button>
      </p>
      <h1>Cliente {name}, logueado correctamente</h1>

      <p>
        <button onClick={goToReservations}>Ver mis reservas</button>
        <button onClick={goToReservarHora}>Reservar hora</button>
      </p>
    </div>
  );
};

export default ClientLogged;