package Tingeso.Backend.controllers;

import Tingeso.Backend.entities.TariffEntity;
import Tingeso.Backend.services.TariffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tariffs")
@CrossOrigin("*")
public class TariffController {
    @Autowired
    TariffService tariffService;
}
