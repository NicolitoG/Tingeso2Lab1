package Tingeso.Backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "reservation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long reservationId;

    @Column(unique = true, nullable = false)
    private String reservationCode; // Unique reservation code

    private LocalDate reservationDate; // Date of the reservation
    private LocalTime reservationStartTime; // Start time of the reserved block
    private LocalTime reservationEndTime; // Estimated end time (calculated from the tariff duration)

    @ManyToOne
    @JoinColumn(name = "tariffId", nullable = false)
    private TariffEntity ReservationTariff; // Relation to TariffEntity for base price and duration

    private int numberOfPeople; // Total number of people in the reservation

    private String contactClient; // Contact name or reference of the client

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReservationDetailEntity> listOfReservationDetails; // List of reservation details (each participant and their assignment)
}
