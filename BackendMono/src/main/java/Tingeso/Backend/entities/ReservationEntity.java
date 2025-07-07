package tingeso.backend.entities;

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
    private TariffEntity reservationTariff; // Relation to TariffEntity for base price and duration

    private int numberOfPeople; // Total number of people in the reservation

    @ManyToOne
    @JoinColumn(name = "clientId", nullable = false)
    private ClientEntity contactClient; // Relación con la entidad cliente

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReservationDetailEntity> listOfReservationDetails; // List of reservation details (each participant and their assignment)

    private int status; // Status of the reservation (0 = PENDIENTE, 1 = APROBADA, 2 = RECHAZADA, 3 = CANCELADA)




    public String getReservationCode() {
        return reservationCode;
    }

    public void setReservationCode(String reservationCode) {
        this.reservationCode = reservationCode;
    }


    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }


    public void setReservationStartTime(LocalTime reservationStartTime) {
        this.reservationStartTime = reservationStartTime;
    }

    public LocalTime getReservationStartTime() {
        return reservationStartTime;
    }

    public LocalTime getReservationEndTime() {
        return reservationEndTime;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationEndTime(LocalTime reservationEndTime) {
        this.reservationEndTime = reservationEndTime;
    }

    public TariffEntity getReservationTariff() {
        return reservationTariff;
    }

    public void setReservationTariff(TariffEntity reservationTariff) {
        this.reservationTariff = reservationTariff;
    }

    public int getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(int numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public List<ReservationDetailEntity> getListOfReservationDetails() {
        return listOfReservationDetails;
    }

    public void setListOfReservationDetails(List<ReservationDetailEntity> listOfReservationDetails) {
        this.listOfReservationDetails = listOfReservationDetails;
    }


    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public ClientEntity getContactClient() {
        return contactClient;
    }

    public void setContactClient(ClientEntity contactClient) {
        this.contactClient = contactClient;
    }
}
