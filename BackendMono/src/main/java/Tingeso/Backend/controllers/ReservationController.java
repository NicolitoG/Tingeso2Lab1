package Tingeso.Backend.controllers;

import Tingeso.Backend.entities.ReservationEntity;
import Tingeso.Backend.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Tingeso.Backend.DTOs.ReservationDTO;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.time.LocalDate;
import java.time.LocalTime;

@RestController
@RequestMapping("/api/v1/reservations")
@CrossOrigin("*")
public class ReservationController {
    @Autowired
    ReservationService reservationService;

    @PostMapping("/create")
    public ResponseEntity<ReservationEntity> createReservation(@RequestBody ReservationDTO reservationDTO) {
        System.out.println("Date recibido: " + reservationDTO.getDate());
        System.out.println("StartTime recibido: " + reservationDTO.getTime());
        System.out.println("BookingType recibido: " + reservationDTO.getReservationType());
        System.out.println("NumberOfPeople recibido: " + reservationDTO.getPeopleCount());
        System.out.println("ContactClient recibido: " + reservationDTO.getUserName());
        try {
            ReservationEntity newReservation = reservationService.createReservation(
                    reservationDTO.getDate(),
                    reservationDTO.getTime(),
                    reservationDTO.getReservationType(),
                    reservationDTO.getPeopleCount(),
                    reservationDTO.getUserName()
            );
            System.out.println("Reserva creada: " + newReservation);
            return ResponseEntity.ok(newReservation);

        } catch (Exception e) {
            System.out.println("Error al crear la reserva: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/client/name/{clientName}")
    public ResponseEntity<List<ReservationEntity>> getReservationsByClientName(@PathVariable String clientName) {
        List<ReservationEntity> reservations = reservationService.getReservationsByClientName(clientName);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping ("/allPendingReservations")
    public ResponseEntity<List<ReservationEntity>> getAllPendingReservations() {
        List<ReservationEntity> reservations = reservationService.getAllPendingReservations();
        return ResponseEntity.ok(reservations);
    }

    @PutMapping("/approve/{reservationCode}")
    public ResponseEntity<ReservationEntity> approveReservation(@PathVariable String reservationCode) {
        System.out.println("apruebo");
        System.out.println("Reservation code recibido: " + reservationCode);
        try {
            ReservationEntity approvedReservation = reservationService.approveReservation(reservationCode);
            return ResponseEntity.ok(approvedReservation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/reject/{reservationCode}")
    public ResponseEntity<ReservationEntity> rejectReservation(@PathVariable String reservationCode) {
        System.out.println("rechazo");
        System.out.println("Reservation code recibido: " + reservationCode);
        try {
            ReservationEntity rejectedReservation = reservationService.rejectReservation(reservationCode);
            return ResponseEntity.ok(rejectedReservation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}

