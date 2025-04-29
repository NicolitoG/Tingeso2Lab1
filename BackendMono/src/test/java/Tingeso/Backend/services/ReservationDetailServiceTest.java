package Tingeso.Backend.services;

import Tingeso.Backend.entities.ReservationDetailEntity;
import Tingeso.Backend.repositories.ReservationDetailRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

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
    void testChangeAppliedDiscount_ValidDiscount() {
        // Configurar un descuento válido
        double newDiscount = 20.0;

        reservationDetailService.changeAppliedDiscount(reservationDetail, newDiscount);

        assertEquals(newDiscount, reservationDetail.getAppliedDiscount());
        verify(reservationDetailRepository, times(1)).save(reservationDetail);
    }

    @Test
    void testChangeAppliedDiscount_InvalidDiscountNegative() {
        // Configurar un descuento inválido (negativo)
        double newDiscount = -5.0;

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            reservationDetailService.changeAppliedDiscount(reservationDetail, newDiscount);
        });

        assertEquals("Invalid discount: -5.0", exception.getMessage());
        verify(reservationDetailRepository, never()).save(reservationDetail);
    }

    @Test
    void testChangeAppliedDiscount_InvalidDiscountExceeds100() {
        // Configurar un descuento inválido (mayor a 100)
        double newDiscount = 150.0;

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            reservationDetailService.changeAppliedDiscount(reservationDetail, newDiscount);
        });

        assertEquals("Invalid discount: 150.0", exception.getMessage());
        verify(reservationDetailRepository, never()).save(reservationDetail);
    }
}

