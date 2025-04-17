package Tingeso.Backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "reservation_detail")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long reservationDetailId;

    @ManyToOne
    @JoinColumn(name = "reservation_id", nullable = false)
    private ReservationEntity reservation; // Relation to ReservationEntity

    private String clientName;

    private double basicTariffApplied;
    private double appliedDiscount;
    private double finalAmount;

    @ManyToOne
    @JoinColumn(name = "kart_id")
    private KartEntity assignedKart;
}
