package Tingeso.Backend.controllers;

import Tingeso.Backend.entities.ReservationDetailEntity;
import Tingeso.Backend.services.ReservationDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservation-details")
@CrossOrigin("*")
public class ReservationDetailController {
    @Autowired
    ReservationDetailService reservationDetailService;
}
