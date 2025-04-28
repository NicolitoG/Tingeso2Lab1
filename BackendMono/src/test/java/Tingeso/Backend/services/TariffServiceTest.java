package Tingeso.Backend.services;

import Tingeso.Backend.entities.TariffEntity;
import Tingeso.Backend.repositories.TariffRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TariffServiceTest {

    @Mock
    private TariffRepository tariffRepository;

    @InjectMocks
    private TariffService tariffService;

    private TariffEntity tariff;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        tariff = new TariffEntity();
        tariff.setTariffId(1L);
        tariff.setBookingType(1);
        tariff.setReservationDuration(60);
        tariff.setBasePrice(100.0);
    }

    @Test
    void testSaveTariff() {
        // Configurar el mock para devolver la tarifa al guardarla
        when(tariffRepository.save(tariff)).thenReturn(tariff);

        // Llamar al método del servicio
        TariffEntity result = tariffService.saveTariff(tariff);

        // Verificar los resultados
        assertNotNull(result);
        assertEquals(1L, result.getTariffId());
        assertEquals(100.0, result.getBasePrice());
        verify(tariffRepository, times(1)).save(tariff);
    }
}
