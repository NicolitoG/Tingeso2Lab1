import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { es } from 'date-fns/locale';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ClientService from "../services/ClientService";
import { useNavigate } from 'react-router-dom';

const locales = {
  'es': es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const AdminRack = () => {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

      const goToAdminSection = () => {
        navigate('/Admin');
    };

  useEffect(() => {
    // Trae TODAS las reservas
    ClientService.getAllReservations().then(response => {
      const mappedEvents = response.data.map(reserva => ({
        title: reserva.contactClient?.name ?? "Sin nombre",
        start: new Date(`${reserva.reservationDate}T${reserva.reservationStartTime}`),
        end: new Date(`${reserva.reservationDate}T${reserva.reservationEndTime}`),
        resource: reserva,
      }));
      setEvents(mappedEvents);
    });
  }, []);

  return (


    <div style={{ height: '80vh', padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button variant="contained" onClick={goToAdminSection} style={{ marginBottom: 20 }}>
                    Vista Reservas
                </button>
            </div>
      <h2>Rack Semanal de Ocupación de la Pista</h2>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={['week']}
        step={30}
        timeslots={2}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '70vh' }}
        culture="es"
        messages={{
          week: 'Semana',
          day: 'Día',
          today: 'Hoy',
          previous: 'Anterior',
          next: 'Siguiente',
        }}
      />
    </div>
  );
};

export default AdminRack;