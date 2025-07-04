package Tingeso.Backend.services;

import Tingeso.Backend.entities.ReservationDetailEntity;
import Tingeso.Backend.repositories.ReservationDetailRepository;
import org.springframework.stereotype.Service;

@Service
public class ReservationDetailService {
    final
    ReservationDetailRepository reservationDetailRepository;

    public ReservationDetailService(ReservationDetailRepository reservationDetailRepository) {
        this.reservationDetailRepository = reservationDetailRepository;
    }

    public void changeAppliedDiscount(ReservationDetailEntity reservationDetail, double newAppliedDiscount) {
        if (newAppliedDiscount < 0 || newAppliedDiscount > 100) {
            throw new IllegalArgumentException("Invalid discount: " + newAppliedDiscount);
        }
        reservationDetail.setAppliedDiscount(newAppliedDiscount);
        reservationDetailRepository.save(reservationDetail);
    }

}
