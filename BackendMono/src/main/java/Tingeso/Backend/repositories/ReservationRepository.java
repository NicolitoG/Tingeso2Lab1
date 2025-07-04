package Tingeso.Backend.repositories;

import Tingeso.Backend.entities.ClientEntity;
import Tingeso.Backend.entities.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {
    List<ReservationEntity> findByContactClient(ClientEntity contactClient);
    List<ReservationEntity> findByStatus(int status);
    ReservationEntity findByReservationCode(String reservationCode);

    @Query(nativeQuery = true, value = "SELECT * FROM reservation WHERE status = 0")
    List<ReservationEntity> findAllPendingReservations();

    List<ReservationEntity> findByReservationDateAndReservationStartTimeBetween(LocalDate date, LocalTime startTime, LocalTime endTime);
}
