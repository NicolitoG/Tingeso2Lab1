package Tingeso.Backend.services;

import Tingeso.Backend.entities.ClientEntity;
import Tingeso.Backend.entities.ReservationDetailEntity;
import Tingeso.Backend.entities.ReservationEntity;
import Tingeso.Backend.entities.TariffEntity;
import Tingeso.Backend.repositories.ClientRepository;
import Tingeso.Backend.repositories.ReservationRepository;
import Tingeso.Backend.repositories.TariffRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private TariffRepository tariffRepository;

    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private ReservationService reservationService;

    private ClientEntity client;
    private TariffEntity tariff;
    private ReservationEntity reservation;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        client = new ClientEntity();
        client.setClientId(1L);
        client.setName("Juan Perez");

        tariff = new TariffEntity();
        tariff.setBookingType(1);
        tariff.setReservationDuration(60);
        tariff.setBasePrice(100.0);

        reservation = new ReservationEntity();
        reservation.setReservationCode("ABC123");
        reservation.setContactClient(client);
        reservation.setReservationTariff(tariff);
        reservation.setNumberOfPeople(4);
    }

    @Test
    void testCreateReservation() {
        when(tariffRepository.findByBookingType(1)).thenReturn(tariff);
        when(clientRepository.findByName("Juan Perez")).thenReturn(client);
        when(reservationRepository.save(any(ReservationEntity.class))).thenReturn(reservation);

        ReservationEntity result = reservationService.createReservation(LocalDate.now(), LocalTime.now(), 1, 4, "Juan Perez");

        assertNotNull(result);
        assertEquals("ABC123", result.getReservationCode());
        verify(reservationRepository, times(1)).save(any(ReservationEntity.class));
    }

    @Test
    void testGetReservationsByClientId() {
        List<ReservationEntity> reservations = new ArrayList<>();
        reservations.add(reservation);

        when(clientRepository.findById(1L)).thenReturn(Optional.of(client));
        when(reservationRepository.findByContactClient(client)).thenReturn(reservations);

        List<ReservationEntity> result = reservationService.getReservationsByClientId(1L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("ABC123", result.get(0).getReservationCode());
    }

    @Test
    void testGetAllPendingReservations() {
        // Crear una lista de reservas pendientes simuladas
        List<ReservationEntity> pendingReservations = new ArrayList<>();
        pendingReservations.add(reservation);

        // Configurar el mock para devolver la lista de reservas pendientes
        when(reservationRepository.findAllPendingReservations()).thenReturn(pendingReservations);

        // Llamar al método a probar
        List<ReservationEntity> result = reservationService.getAllPendingReservations();

        // Verificar los resultados
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("ABC123", result.get(0).getReservationCode());
        verify(reservationRepository, times(1)).findAllPendingReservations();
    }

    @Test
    void testGetDiscountByNumberOfPeople() {
        assertEquals(10.0, reservationService.getDiscountByNumberOfPeople(4));
        assertEquals(20.0, reservationService.getDiscountByNumberOfPeople(6));
        assertEquals(30.0, reservationService.getDiscountByNumberOfPeople(12));
        assertEquals(0.0, reservationService.getDiscountByNumberOfPeople(18));
        assertEquals(0.0, reservationService.getDiscountByNumberOfPeople(2));
    }

    @Test
    void testGetDiscountByFrequentClient() {
        assertEquals(10.0, reservationService.getDiscountByFrequentClient(3));
        assertEquals(20.0, reservationService.getDiscountByFrequentClient(5));
        assertEquals(30.0, reservationService.getDiscountByFrequentClient(7));
        assertEquals(0.0, reservationService.getDiscountByFrequentClient(1));
    }

    @Test
    void testGenerarBoletaConDescuentoPorGente() {
        // Caso 1: Número de personas mayor a 0 (se aplica descuento)
        reservation.setNumberOfPeople(4); // Aplica un 10% de descuento
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));

        ReservationDetailEntity detail = reservationService.generarBoleta(1L);

        assertEquals(10.0, detail.getAppliedDiscount()); // Verificar descuento aplicado
        assertEquals(100.0, detail.getBasicTariffApplied()); // Verificar tarifa base
        assertEquals(90.0, detail.getBasicTariffApplied() - (detail.getBasicTariffApplied() * detail.getAppliedDiscount() / 100)); // Verificar monto con descuento

        // Caso 2: Número de personas igual a 0 (no se aplica descuento)
        reservation.setNumberOfPeople(0); // No aplica descuento
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));

        detail = reservationService.generarBoleta(1L);

        assertEquals(0.0, detail.getAppliedDiscount()); // Verificar que no hay descuento
        assertEquals(100.0, detail.getBasicTariffApplied()); // Verificar tarifa base
        assertEquals(100.0, detail.getBasicTariffApplied()); // Verificar monto sin descuento
    }

    @Test
    void testGetReservationsByClientName() {
        List<ReservationEntity> reservations = new ArrayList<>();
        reservations.add(reservation);

        // Configurar el mock para devolver el cliente y las reservas
        when(clientRepository.findByName("Juan Perez")).thenReturn(client);
        when(clientRepository.findById(1L)).thenReturn(Optional.of(client));
        when(reservationRepository.findByContactClient(client)).thenReturn(reservations);

        List<ReservationEntity> result = reservationService.getReservationsByClientName("Juan Perez");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("ABC123", result.get(0).getReservationCode());
    }

    @Test
    void testGetReservationsByClientNameReservationsEmpty(){
        // Configurar el mock para devolver el cliente y una lista vacía de reservas
        when(clientRepository.findByName("Juan Perez")).thenReturn(client);
        when(clientRepository.findById(1L)).thenReturn(Optional.of(client));
        when(reservationRepository.findByContactClient(client)).thenReturn(new ArrayList<>());

        // Llamar al método y verificar la excepción
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            reservationService.getReservationsByClientName("Juan Perez");
        });

        assertEquals("No se encontraron reservas para el cliente: Juan Perez", exception.getMessage());
    }

    @Test
    void testApproveReservation() {
        when(reservationRepository.findByReservationCode("ABC123")).thenReturn(reservation);
        when(reservationRepository.save(reservation)).thenReturn(reservation);

        ReservationEntity result = reservationService.approveReservation("ABC123");

        assertEquals(1, result.getStatus());
        verify(reservationRepository, times(1)).save(reservation);
    }

    @Test
    void testApproveReservationNull(){
        when(reservationRepository.findByReservationCode("ABC123")).thenReturn(null);

        // Llamar al método y verificar la excepción
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            reservationService.approveReservation("ABC123");
        });

        assertEquals("Reserva no encontrada", exception.getMessage());
    }

    @Test
    void testRejectReservation() {
        when(reservationRepository.findByReservationCode("ABC123")).thenReturn(reservation);
        when(reservationRepository.save(reservation)).thenReturn(reservation);

        ReservationEntity result = reservationService.rejectReservation("ABC123");

        assertEquals(2, result.getStatus());
        verify(reservationRepository, times(1)).save(reservation);
    }

    @Test
    void testRejectReservationNull(){
        when(reservationRepository.findByReservationCode("ABC123")).thenReturn(null);

        // Llamar al método y verificar la excepción
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            reservationService.rejectReservation("ABC123");
        });

        assertEquals("Reserva no encontrada", exception.getMessage());
    }
}
