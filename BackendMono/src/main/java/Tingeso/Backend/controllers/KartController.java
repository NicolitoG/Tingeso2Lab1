package Tingeso.Backend.controllers;

import Tingeso.Backend.entities.KartEntity;
import Tingeso.Backend.services.KartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/karts")
@CrossOrigin("*")
public class KartController {
    @Autowired
    KartService kartService;
}
