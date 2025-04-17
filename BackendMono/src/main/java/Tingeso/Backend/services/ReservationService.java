package Tingeso.Backend.services;

import Tingeso.Backend.entities.ReservationEntity;
import Tingeso.Backend.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ReservationService {
    @Autowired
    ReservationRepository reservationRepository;

}
