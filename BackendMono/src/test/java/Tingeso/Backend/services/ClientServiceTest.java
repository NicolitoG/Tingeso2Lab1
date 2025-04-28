package Tingeso.Backend.services;

import Tingeso.Backend.entities.ClientEntity;
import Tingeso.Backend.repositories.ClientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ClientServiceTest {

    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private ClientService clientService;

    private ClientEntity client;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        client = new ClientEntity();
        client.setClientId(1L);
        client.setName("Juan Perez");
        client.setMonthlyVisits(3);
    }

    @Test
    void testGetClients() {
        ArrayList<ClientEntity> clients = new ArrayList<>();
        clients.add(client);
        when(clientRepository.findAll()).thenReturn(clients);

        ArrayList<ClientEntity> result = clientService.getClients();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Juan Perez", result.get(0).getName());
        verify(clientRepository, times(1)).findAll();
    }

    @Test
    void testSaveClient_SuccessfulSave() {
        when(clientRepository.findByName("Juan Perez")).thenReturn(null);
        when(clientRepository.save(client)).thenReturn(client);

        ClientEntity savedClient = clientService.saveClient(client);

        assertNotNull(savedClient);
        assertEquals("Juan Perez", savedClient.getName());
        verify(clientRepository, times(1)).save(client);
    }

    @Test
    void testSaveClient_ClientAlreadyExists() {
        when(clientRepository.findByName("Juan Perez")).thenReturn(client);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> clientService.saveClient(client));
        assertEquals("There is already an user with that name", exception.getMessage());
    }

    @Test
    void testLogin_Success() {
        when(clientRepository.findByNameAndEmail("Juan Perez", "juan@example.com")).thenReturn(client);

        var response = clientService.login("Juan Perez", "juan@example.com");

        assertEquals("Login successful", response.getBody());
        verify(clientRepository, times(1)).findByNameAndEmail("Juan Perez", "juan@example.com");
    }

    @Test
    void testLogin_Failure() {
        when(clientRepository.findByNameAndEmail("Juan Perez", "wrong@example.com")).thenReturn(null);

        var response = clientService.login("Juan Perez", "wrong@example.com");

        assertEquals("Invalid credentials", response.getBody());
        verify(clientRepository, times(1)).findByNameAndEmail("Juan Perez", "wrong@example.com");
    }

    @Test
    void testCalculateCategory() {
        // Caso: veryFrequent
        client.setMonthlyVisits(7);
        assertEquals("veryFrequent", clientService.calculateCategory(client));

        // Caso: frequent
        client.setMonthlyVisits(5);
        assertEquals("frequent", clientService.calculateCategory(client));

        // Caso: regular
        client.setMonthlyVisits(2);
        assertEquals("regular", clientService.calculateCategory(client));

        // Caso: notFrequent
        client.setMonthlyVisits(0);
        assertEquals("notFrequent", clientService.calculateCategory(client));

        // Caso: nonValid (visitas negativas)
        client.setMonthlyVisits(-1);
        assertEquals("nonValid", clientService.calculateCategory(client));
    }

    @Test
    void testIncrementVisits() {
        clientService.IncrementVisits(client);
        assertEquals(4, client.getMonthlyVisits());
        verify(clientRepository, times(1)).save(client);
    }
}
