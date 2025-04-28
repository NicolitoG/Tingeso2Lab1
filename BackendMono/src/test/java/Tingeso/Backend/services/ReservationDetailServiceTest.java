package Tingeso.Backend.services;

import Tingeso.Backend.entities.ReservationDetailEntity;
import Tingeso.Backend.repositories.ReservationDetailRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReservationDetailServiceTest {

    @Mock
    private ReservationDetailRepository reservationDetailRepository;

    @InjectMocks
    private ReservationDetailService reservationDetailService;

    private ReservationDetailEntity reservationDetail;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        reservationDetail = new ReservationDetailEntity();
        reservationDetail.setReservationDetailId(1L);
        reservationDetail.setClientName("Juan Perez");
        reservationDetail.setBasicTariffApplied(100.0);
        reservationDetail.setAppliedDiscount(10.0);
        reservationDetail.setFinalAmount(90.0);
    }

    @Test
    void testFindReservationDetailById() {
        when(reservationDetailRepository.findById(1L)).thenReturn(Optional.of(reservationDetail));

        Optional<ReservationDetailEntity> result = reservationDetailService.reservationDetailRepository.findById(1L);

        assertTrue(result.isPresent());
        assertEquals("Juan Perez", result.get().getClientName());
        verify(reservationDetailRepository, times(1)).findById(1L);
    }

    @Test
    void testSaveReservationDetail() {
        when(reservationDetailRepository.save(reservationDetail)).thenReturn(reservationDetail);

        ReservationDetailEntity result = reservationDetailService.reservationDetailRepository.save(reservationDetail);

        assertNotNull(result);
        assertEquals(90.0, result.getFinalAmount());
        verify(reservationDetailRepository, times(1)).save(reservationDetail);
    }
}
