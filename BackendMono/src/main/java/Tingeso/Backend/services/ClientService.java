package tingeso.backend.services;

import tingeso.backend.entities.ClientEntity;
import tingeso.backend.repositories.ClientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ClientService {
    final
    ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<ClientEntity> getClients(){
        return clientRepository.findAll();
    }

    public ClientEntity saveClient(ClientEntity client) {
        if (clientRepository.findByName(client.getName()) != null) {
            throw new IllegalArgumentException("Client not found");
        }
        if (client.getBirthDate() != null && client.getBirthDate().after(java.sql.Date.valueOf(LocalDate.now()))) {
            throw new IllegalArgumentException("La fecha de nacimiento no puede ser mayor a la fecha actual");
        }
        return clientRepository.save(client);
    }

    public ResponseEntity<String> login (String name, String email) {
        return clientRepository.findByNameAndEmail(name, email) != null
                ? ResponseEntity.ok("Login successful")
                : ResponseEntity.badRequest().body("Invalid credentials");
    }

}
