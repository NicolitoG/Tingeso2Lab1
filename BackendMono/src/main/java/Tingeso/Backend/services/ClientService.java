package Tingeso.Backend.services;

import Tingeso.Backend.entities.ClientEntity;
import Tingeso.Backend.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ClientService {
    @Autowired
    ClientRepository clientRepository;

    public ArrayList<ClientEntity> getClients(){
        return (ArrayList<ClientEntity>) clientRepository.findAll();
    }

    public ClientEntity saveClient(ClientEntity client) {
        if (clientRepository.findByName(client.getName()) != null) {
            throw new RuntimeException("There is already an user with that name");
        }
        return clientRepository.save(client);
    }

    public ResponseEntity<String> login (String name, String email) {
        return clientRepository.findByNameAndEmail(name, email) != null
                ? ResponseEntity.ok("Login successful")
                : ResponseEntity.badRequest().body("Invalid credentials");
    }

    public String calculateCategory(ClientEntity client) {
        int visits = client.getMonthlyVisits();

        if (visits >= 7) {
            return "veryFrequent";
        } else if (visits >= 5) {
            return "frequent";
        } else if (visits >= 2) {
            return "regular";
        } else if (visits >= 0) {
            return "notFrequent";
        }

        return "nonValid"; // for cases where visits are negative
    }

    public void IncrementVisits(ClientEntity client) {
        int visits = client.getMonthlyVisits();
        client.setMonthlyVisits(visits + 1);
        clientRepository.save(client);
    }
}
