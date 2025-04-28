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

    //getters y setters

    public Long getReservationDetailId() {
        return reservationDetailId;
    }

    public void setReservationDetailId(Long reservationDetailId) {
        this.reservationDetailId = reservationDetailId;
    }

    public ReservationEntity getReservation() {
        return reservation;
    }

    public void setReservation(ReservationEntity reservation) {
        this.reservation = reservation;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public double getBasicTariffApplied() {
        return basicTariffApplied;
    }

    public void setBasicTariffApplied(double basicTariffApplied) {
        this.basicTariffApplied = basicTariffApplied;
    }

    public double getAppliedDiscount() {
        return appliedDiscount;
    }

    public void setAppliedDiscount(double appliedDiscount) {
        this.appliedDiscount = appliedDiscount;
    }

    public double getFinalAmount() {
        return finalAmount;
    }

    public void setFinalAmount(double finalAmount) {
        this.finalAmount = finalAmount;
    }

    public KartEntity getAssignedKart() {
        return assignedKart;
    }

    public void setAssignedKart(KartEntity assignedKart) {
        this.assignedKart = assignedKart;
    }
}
