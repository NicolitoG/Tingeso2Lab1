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
    private Long id;

    @Column(unique = true, nullable = false)
    private String codigoReserva; // Unique reservation code

    private LocalDate fechaReserva; // Date of the reservation
    private LocalTime horaInicioReserva; // Start time of the reserved block
    private LocalTime horaFinReserva; // Estimated end time (calculated from the tariff duration)

    @ManyToOne
    @JoinColumn(name = "tarifa_id", nullable = false)
    private TariffEntity tarifaReserva; // Relation to TariffEntity for base price and duration

    private int numeroVueltasOMinutos; // Numeric value based on the selected tariff
    private int cantidadPersonas; // Total number of people in the reservation

    private String clienteContacto; // Contact name or reference of the client

    @OneToMany(mappedBy = "reserva", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReservationDetailEntity> listaDetalleReserva; // List of reservation details (each participant and their assignment)
}
