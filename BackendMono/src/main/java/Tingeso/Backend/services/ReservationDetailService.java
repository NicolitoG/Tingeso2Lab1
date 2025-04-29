package Tingeso.Backend.services;

import Tingeso.Backend.entities.ReservationDetailEntity;
import Tingeso.Backend.repositories.ReservationDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ReservationDetailService {
    @Autowired
    ReservationDetailRepository reservationDetailRepository;

    public void changeAppliedDiscount(ReservationDetailEntity reservationDetail, double newAppliedDiscount) {
        if (newAppliedDiscount < 0 || newAppliedDiscount > 100) {
            throw new IllegalArgumentException("Invalid discount: " + newAppliedDiscount);
        }
        reservationDetail.setAppliedDiscount(newAppliedDiscount);
        reservationDetailRepository.save(reservationDetail);
    }

}
