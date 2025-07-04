package Tingeso.Backend.repositories;

import Tingeso.Backend.entities.ReservationDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationDetailRepository extends JpaRepository<ReservationDetailEntity, Long> {
}
