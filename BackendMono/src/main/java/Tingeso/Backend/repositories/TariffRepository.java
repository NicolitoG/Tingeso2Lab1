package tingeso.backend.repositories;

import tingeso.backend.entities.TariffEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TariffRepository extends JpaRepository<TariffEntity, Long> {
    TariffEntity findByBookingType(int bookingType);
}
