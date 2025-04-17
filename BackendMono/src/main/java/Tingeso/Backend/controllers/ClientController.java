package Tingeso.Backend.controllers;

import Tingeso.Backend.entities.ClientEntity;
import Tingeso.Backend.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clients")
@CrossOrigin("*")
public class ClientController {
    @Autowired
    ClientService clientService;
}
