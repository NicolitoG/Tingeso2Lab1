package tingeso.backend.controllers;

import tingeso.backend.entities.ReservationEntity;
import tingeso.backend.services.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso.backend.DTOs.ReservationDTO;
import java.util.logging.Logger;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations")
@CrossOrigin("*")
public class ReservationController {
    final
    ReservationService reservationService;

    Logger logger = Logger.getLogger(getClass().getName());



    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/create")
    public ResponseEntity<ReservationEntity> createReservation(@RequestBody ReservationDTO reservationDTO) {
        try {
            ReservationEntity newReservation = reservationService.createReservation(
                    reservationDTO.getDate(),
                    reservationDTO.getTime(),
                    reservationDTO.getReservationType(),
                    reservationDTO.getPeopleCount(),
                    reservationDTO.getUserName()
            );
            logger.info("Reserva creada exitosamente ");


            return ResponseEntity.ok(newReservation);

        } catch (Exception e) {
            logger.info("Error al crear la reserva: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/client/name/{clientName}")
    public ResponseEntity<List<ReservationEntity>> getReservationsByClientName(@PathVariable String clientName) {
        List<ReservationEntity> reservations = reservationService.getReservationsByClientName(clientName);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping ("/allReservations")
    public ResponseEntity<List<ReservationEntity>> getAllReservations() {
        List<ReservationEntity> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping ("/allPendingReservations")
    public ResponseEntity<List<ReservationEntity>> getAllPendingReservations() {
        List<ReservationEntity> reservations = reservationService.getAllPendingReservations();
        return ResponseEntity.ok(reservations);
    }

    @PutMapping("/approve/{reservationCode}")
    public ResponseEntity<ReservationEntity> approveReservation(@PathVariable String reservationCode) {
        try {
            ReservationEntity approvedReservation = reservationService.approveReservation(reservationCode);
            return ResponseEntity.ok(approvedReservation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/reject/{reservationCode}")
    public ResponseEntity<ReservationEntity> rejectReservation(@PathVariable String reservationCode) {
        try {
            ReservationEntity rejectedReservation = reservationService.rejectReservation(reservationCode);
            return ResponseEntity.ok(rejectedReservation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping ("/allApprovedReservations")
    public ResponseEntity<List<ReservationEntity>> getAllApprovedReservations() {
        List<ReservationEntity> reservations = reservationService.getAllApprovedReservations();
        return ResponseEntity.ok(reservations);
    }

    @DeleteMapping("/delete/{reservationCode}")
    public ResponseEntity<String> deleteReservation(@PathVariable String reservationCode) {
        try {
            reservationService.deleteReservation(reservationCode);
            return ResponseEntity.ok("Reserva eliminada exitosamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al eliminar la reserva: " + e.getMessage());
        }
    }
}

