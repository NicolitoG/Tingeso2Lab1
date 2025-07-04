package Tingeso.Backend.controllers;

import Tingeso.Backend.services.KartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/karts")
@CrossOrigin("*")
public class KartController {
    final
    KartService kartService;

    public KartController(KartService kartService) {
        this.kartService = kartService;
    }
}
