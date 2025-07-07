package tingeso.backend.controllers;

import tingeso.backend.entities.ClientEntity;
import tingeso.backend.services.ClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clients")
@CrossOrigin("*")
public class ClientController {
    final
    ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<ClientEntity>> listClients() {
        List<ClientEntity> clients = clientService.getClients();
        return ResponseEntity.ok(clients);
    }

    @PostMapping("/register")
    public ResponseEntity<ClientEntity> registerClient(@RequestBody ClientEntity client) {
        try {
            ClientEntity savedClient = clientService.saveClient(client);
            return ResponseEntity.ok(savedClient);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<String> loginClient(@RequestBody ClientEntity client) {
        String name = client.getName();
        String email = client.getEmail();
        return clientService.login(name, email);
    }





}
