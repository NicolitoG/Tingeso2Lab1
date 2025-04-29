package Tingeso.Backend.services;

import Tingeso.Backend.entities.KartEntity;
import Tingeso.Backend.repositories.KartRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class KartServiceTest {

    @Mock
    private KartRepository kartRepository;

    @InjectMocks
    private KartService kartService;

    private KartEntity kart;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        kart = new KartEntity();
        kart.setKartId(1L);
        kart.setState(0); // Estado inicial
    }

    @Test
    void testChangeKartStatus_ValidState() {
        kartService.changeKartStatus(kart, 1);

        assertEquals(1, kart.getState());
        verify(kartRepository, times(1)).save(kart);
    }

    @Test
    void testChangeKartStatus_InvalidState() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            kartService.changeKartStatus(kart, -1);
        });

        assertEquals("Invalid state: -1", exception.getMessage());
        verify(kartRepository, never()).save(kart);
    }

    @Test
    void testChangeKartStatus_AnotherValidState() {
        kartService.changeKartStatus(kart, 2);

        assertEquals(2, kart.getState());
        verify(kartRepository, times(1)).save(kart);
    }

    @Test
    void testChangeKartStatus_AnotherInvalidState() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            kartService.changeKartStatus(kart, 3);
        });

        assertEquals("Invalid state: 3", exception.getMessage());
        verify(kartRepository, never()).save(kart);
    }
}
