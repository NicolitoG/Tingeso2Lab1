package Tingeso.Backend.repositories;

import Tingeso.Backend.entities.ReservationDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationDetailRepository extends JpaRepository<ReservationDetailEntity, Long> {
}
