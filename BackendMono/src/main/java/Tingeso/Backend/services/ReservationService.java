package Tingeso.Backend.services;

import Tingeso.Backend.entities.ClientEntity;
import Tingeso.Backend.entities.ReservationDetailEntity;
import Tingeso.Backend.entities.ReservationEntity;
import Tingeso.Backend.entities.TariffEntity;
import Tingeso.Backend.repositories.ClientRepository;
import Tingeso.Backend.repositories.ReservationRepository;
import Tingeso.Backend.repositories.TariffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;


import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class ReservationService {
    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    TariffRepository tariffRepository;

    @Autowired
    ClientRepository clientRepository;

    public String generateReservationCode() {
        return UUID.randomUUID().toString().substring(0, 8); // Tomamos solo los primeros 8 caracteres
    }


    public ReservationEntity createReservation(LocalDate Date, LocalTime startTime, int bookingType, int NumberOfPeople, String contactClient) {
        TariffEntity tariff = tariffRepository.findByBookingType(bookingType);

        ReservationEntity reservation = new ReservationEntity();
        reservation.setReservationCode(generateReservationCode()); // asignar codigo
        reservation.setReservationDate(Date); //asignar fecha
        reservation.setReservationStartTime(startTime); //asignar hora
        reservation.setReservationEndTime(startTime.plusMinutes(tariff.getReservationDuration())); //asignar hora fin
        reservation.setReservationTariff(tariff); //asignar tarifa
        reservation.setNumberOfPeople(NumberOfPeople); //asignar numero de personas
        reservation.setContactClient(clientRepository.findByName(contactClient)); //asignar cliente
        reservation.setListOfReservationDetails(new ArrayList<>()); //asignar lista de detalles de reserva

        // Guardar la reserva en la base de datos
        return reservationRepository.save(reservation);
    }

    public List<ReservationEntity> getReservationsByClientId(Long clientId) {
        ClientEntity client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));
        return reservationRepository.findByContactClient(client);
    }

    public double getDiscountByNumberOfPeople(int numberOfPeople) {
        if (numberOfPeople >= 3 && numberOfPeople <= 5) {
            return 10.0; // 10% de descuento
        } else if (numberOfPeople >= 6 && numberOfPeople <= 10) {
            return 20.0; // 20% de descuento
        } else if (numberOfPeople >= 11 && numberOfPeople <= 15) {
            return 30.0; // 30% de descuento
        }
        return 0.0; // Sin descuento
    }

    public double getDiscountByFrequentClient(int numberOfReservations) {
        if (numberOfReservations >= 2 && numberOfReservations <= 4) {
            return 10.0; // regular 10% de descuento
        } else if (numberOfReservations >= 5 && numberOfReservations <= 6) {
            return 20.0; //  frecuente 20% de descuento
        } else if (numberOfReservations >= 7) {
            return 30.0; // Muy frecuente 30% de descuento
        }
        return 0.0; // No frecuente Sin descuento
    }

    public ReservationDetailEntity generarBoleta(Long reservaId) {
        // 1. Cargar reserva con detalles
        ReservationEntity reservation = reservationRepository.findById(reservaId)
                .orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada"));

        // 2. Calcular totales
        double tarifaBase = reservation.getReservationTariff().getBasePrice();
        double descuentoPorGente = reservation.getNumberOfPeople() > 0 ? getDiscountByNumberOfPeople(reservation.getNumberOfPeople()) : 0;
        double montoConDescuento = tarifaBase - (tarifaBase * descuentoPorGente / 100);
        double iva = montoConDescuento * 0.19; // 19% de IVA
        double montoFinalConIVA = montoConDescuento + iva;

        // 3. Construir y retornar el detalle de la reserva
        ReservationDetailEntity detail = new ReservationDetailEntity();
        detail.setReservation(reservation);
        detail.setClientName(reservation.getContactClient().getName());
        detail.setBasicTariffApplied(tarifaBase);
        detail.setAppliedDiscount(descuentoPorGente);
        detail.setFinalAmount(montoFinalConIVA);

        return detail;
    }

    public List<ReservationEntity> getReservationsByClientName(String clientName) {
        ClientEntity client = clientRepository.findByName(clientName);
        Long id = client.getClientId();
        List<ReservationEntity> reservations = getReservationsByClientId(id);
        if (reservations.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron reservas para el cliente: " + clientName);
        }
        return reservations;
    }

    public List<ReservationEntity> getAllPendingReservations() {
        return reservationRepository.findAllPendingReservations();
    }

    public List<ReservationEntity> getAllReservations() {
        return reservationRepository.findAll();
    }

    public ReservationEntity approveReservation(String reservationCode){
        ReservationEntity reservation = reservationRepository.findByReservationCode(reservationCode);
        if (reservation == null) {
            throw new IllegalArgumentException("Reserva no encontrada");
        }
        reservation.setStatus(1); // Cambiar el estado a APROBADA
        return reservationRepository.save(reservation);
    }

    public ReservationEntity rejectReservation(String reservationCode){
        ReservationEntity reservation = reservationRepository.findByReservationCode(reservationCode);
        if (reservation == null) {
            throw new IllegalArgumentException("Reserva no encontrada");
        }
        reservation.setStatus(2); // Cambiar el estado a RECHAZADA
        return reservationRepository.save(reservation);
    }

    public List<ReservationEntity> getAllApprovedReservations() {
        List<ReservationEntity> approvedReservations = reservationRepository.findByStatus(1);
        if (approvedReservations.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron reservas aprobadas");
        }
        return approvedReservations;
    }
}
