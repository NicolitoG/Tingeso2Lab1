package Tingeso.Backend.repositories;

import Tingeso.Backend.entities.TariffEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TariffRepository extends JpaRepository<TariffEntity, Long> {
    TariffEntity findByBookingType(int bookingType);
}
