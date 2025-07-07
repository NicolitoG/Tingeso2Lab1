import React, { useEffect, useState } from 'react';
import { startOfWeek, addWeeks, format } from 'date-fns';
import { es } from 'date-fns/locale';
import ClientService from "../services/ClientService";
import { useNavigate } from 'react-router-dom';

const AdminRack = () => {
  const [events, setEvents] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const navigate = useNavigate();

  const goToAdminSection = () => {
    navigate('/Admin');
  };

  const getWeekDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(currentWeekStart);
      day.setDate(currentWeekStart.getDate() + i);
      return day;
    });
  };


  useEffect(() => {
    ClientService.getAllReservations()
      .then(response => {
        const mappedEvents = response.data.map(reserva => ({
          id: reserva.id,
          title: reserva.contactClient?.name ?? "Sin nombre",
          date: reserva.reservationDate,
          startTime: reserva.reservationStartTime,
          endTime: reserva.reservationEndTime,
        }));
        setEvents(mappedEvents);
      })
      .catch(error => {
        console.error("Error fetching reservations:", error);
        alert("Hubo un error al obtener las reservas. Por favor, inténtelo de nuevo más tarde.");
      });
  }, []);

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= currentWeekStart && eventDate < addWeeks(currentWeekStart, 1);
  });

  const goToPreviousWeek = () => {
    setCurrentWeekStart(prev => addWeeks(prev, -1));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(prev => addWeeks(prev, 1));
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <button onClick={goToAdminSection}>Vista Reservas</button>
        <div>
          <button onClick={goToPreviousWeek}>← Semana anterior</button>
          <button onClick={goToNextWeek} style={{ marginLeft: 10 }}>Semana siguiente →</button>
        </div>
      </div>

      <h2>Rack semanal de reservas</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10 }}>
        {getWeekDays().map((day, index) => (
          <div key={index} style={{ border: '2px solid #4a1050', padding: 10 }}>
            <h4>{format(day, 'EEEE dd/MM', { locale: es })}</h4>
            {filteredEvents
              .filter(ev => ev.date === format(day, 'yyyy-MM-dd'))
              .map(ev => (
                <div key={ev.id} style={{ margin: '5px 0', padding: 5, backgroundColor: '#267d85', borderRadius: 4 }}>
                  <strong>{ev.title}</strong><br />
                  {ev.startTime} - {ev.endTime}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRack;
