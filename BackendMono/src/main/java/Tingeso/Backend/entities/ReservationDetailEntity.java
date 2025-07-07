package tingeso.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "reservation_detail")
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


    public void setReservationDetailId(Long reservationDetailId) {
        this.reservationDetailId = reservationDetailId;
    }

    public void setReservation(ReservationEntity reservation) {
        this.reservation = reservation;
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

    public void setFinalAmount(double finalAmount) {
        this.finalAmount = finalAmount;
    }

    public Long getReservationDetailId() {
        return reservationDetailId;
    }

    public ReservationEntity getReservation() {
        return reservation;
    }

    public String getClientName() {
        return clientName;
    }

    public double getFinalAmount() {
        return finalAmount;
    }
}
