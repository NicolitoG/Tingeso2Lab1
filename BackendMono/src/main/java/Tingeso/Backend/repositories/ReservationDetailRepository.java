package tingeso.backend.repositories;

import org.springframework.stereotype.Repository;
import tingeso.backend.entities.ReservationDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ReservationDetailRepository extends JpaRepository<ReservationDetailEntity, Long> {
}
