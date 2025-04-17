package Tingeso.Backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "tariff")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class TariffEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long tariffId;

    // 0 = "10 leaps/10 min", 1 = "15 vueltas/15 min", 2 = "20 vueltas/20 min"
    private int bookingType;

    private double basePrice;  // Base price of the tariff

    // type 0 = 30 min, type 1 = 35 min, type 2 = 40 min
    private int reservationDuration; // in minutes
}
