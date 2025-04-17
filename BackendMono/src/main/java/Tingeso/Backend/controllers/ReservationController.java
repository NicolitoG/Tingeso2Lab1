package Tingeso.Backend.controllers;

import Tingeso.Backend.entities.ReservationEntity;
import Tingeso.Backend.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations")
@CrossOrigin("*")
public class ReservationController {
    @Autowired
    ReservationService reservationService;
}
