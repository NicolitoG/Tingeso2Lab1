package Tingeso.Backend.entities;

import lombok.*;

import jakarta.persistence.*;

@Entity
@Table(name = "tariff")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor


public class TariffEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long tariffId;

    // 0 = "10 leaps/10 min", 1 = "15 vueltas/15 min", 2 = "20 vueltas/20 min", -1 = "No booking"
    private int bookingType;

    private double basePrice;  // Base price of the tariff

    // type 0 = 30 min, type 1 = 35 min, type 2 = 40 min
    private int reservationDuration; // in minutes

    public Long getTariffId() {
        return tariffId;
    }

    public double getBasePrice() {
        return basePrice;
    }

    public int getReservationDuration() {
        return reservationDuration;
    }

    public int getBookingType() {
        return bookingType;
    }

    public void setBookingType(int bookingType) {
        this.bookingType = bookingType;
    }

    public void setBasePrice(double basePrice) {
        this.basePrice = basePrice;
    }

    public void setReservationDuration(int reservationDuration) {
        this.reservationDuration = reservationDuration;
    }

    public void setTariffId(Long tariffId) {
        this.tariffId = tariffId;
    }
}
